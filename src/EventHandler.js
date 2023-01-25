import config from '../database/config.js';

async function EventHandler(event) {
  let threadIDs = config.allowed_threads;



  if (threadIDs.includes(event.threadID) && event.type == 'message') {

  }
}

export default EventHandler;
