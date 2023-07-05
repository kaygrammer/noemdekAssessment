class CustomError extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  class NoSchedulesFoundError extends CustomError {
    constructor(message) {
      super(message || "No schedules found.");
    }
  }
  
  class NoQuotationsFoundError extends CustomError {
    constructor(message) {
      super(message || "No quotations found.");
    }
  }
  
  export { CustomError, NoSchedulesFoundError, NoQuotationsFoundError };