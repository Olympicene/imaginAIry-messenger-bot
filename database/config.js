// time in between commands
const apiOptions = {
  listenEvents: true,
  selfListen: false,
  forceLogin: true,
};

// threadIDs of groupchats/chats its allowed in
const allowed_threads = [
  "100085302326637",
  "2401681243197992",
  "5550431638347613",
  "5008172842621887",
];

const admins = [
  "100085302326637",
  "100066164221694",
]

const time_zone = 'America/Chicago';

const DEBUG = false;

const timeout_milliseconds = 10000; // 30 second timeout

export default {apiOptions, allowed_threads, admins, time_zone, DEBUG, timeout_milliseconds}