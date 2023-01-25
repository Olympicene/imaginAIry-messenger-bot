import config from '../database/config.js';

class Timeout {
  static time = config.timeout_milliseconds;
  static timeout = {};

  static inTimeout(userID) {
    //check if userID is in timeout
    return this.timeout[userID];
  }

  static userTimeout(userID) {
	  //puts user id in timeout	
    this.timeout[userID] = true;
    setTimeout(() => {
      this.timeout[userID] = false;
    }, this.time);
  }
}

export default Timeout;

