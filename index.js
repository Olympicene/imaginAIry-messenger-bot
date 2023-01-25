import appRoot from 'app-root-path';
import { promisify } from 'es6-promisify';
import config from './database/config.js';
import EventHandler from './src/EventHandler.js';
import FBchat from 'facebook-chat-api';
import schedule from 'node-schedule';
import fs from 'fs';
import { ChatGPTAPIBrowser } from 'chatgpt'
import dotenv from 'dotenv';
dotenv.config();

////////////////////////////////////////////////////////////// Facebook Login
// promisify FB login
const login = promisify(FBchat);
const appstate = JSON.parse(
  fs.readFileSync(appRoot + '/database/appstate.json', 'utf8')
);

// FB login
const FBapi = await login({ appState: appstate }).catch((err) => {
  console.error(err);
});

// settings
FBapi.setOptions(config.apiOptions);

// listener
FBapi.listenMqtt((err, event) => {
  if (err) return console.error(err);

  if (config.DEBUG) console.log(event);

  EventHandler(event);
});

////////////////////////////////////////////////////////////// Timed Reset
// reset timeout every night
//let rule = new schedule.RecurrenceRule();
//rule.tz = config.time_zone;
//rule.hour = 0;
//rule.minute = 0;

//schedule.scheduleJob(rule, async () => {
//  process.exit(1);
//});

////////////////////////////////////////////////////////////// Helper Functions
// helpful send function
function send(contents, threadID, replyID) {
  new Promise((resolve, reject) => {
    FBapi.sendMessage(
      contents,
      threadID,
      (err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(`message sent`);
      },
      replyID
    );
  });
}

export { send, FBapi, GPTapi };
