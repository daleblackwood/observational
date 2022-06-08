/*
  https://github.com/daleblackwood/ladts
  FeedSubject is an observable that retains an array of values that grows with 
  each subsequent request. It requires a getter that receives the most recent 
  value. This is ideal for receiving a list of updates from an API, such as a 
  notification system.
*/
import { Subject } from "./Subject";

const DEFAULT_INTERVAL = 1000;

export class FeedSubject<T> extends Subject<T[]> {

  // whether or not a request is loading
  isLoading = true;

  // the last error in a request (blank from new request)
  error: Error = null;

  /// if true, the feed will continue to operate even if a request fails
  continueAfterErrors = true;

  /// the last value stored on the feed, this should help retreive the following values
  get lastValue() { return this.value.length > 0 ? this.value[this.value.length - 1] : null; }

  private scheduleTimeout = 0;

  constructor(public feedUpdater: (lastValue: T|null) => Promise<T[]>, public interval: number = DEFAULT_INTERVAL, public isRunning = true) {
    super([]);
    if (this.isRunning) {
      this.updateFeed();
    }
  }

  resume() {
    this.isRunning = true;
    if (!this.scheduleTimeout) {
      this.updateFeed();
    }
  }

  pause() {
    this.isRunning = false;
  }

  updateFeed() {
    clearTimeout(this.scheduleTimeout);
    this.scheduleTimeout = 0;
    return new Promise((resolve, reject) => {
      this.value = null;
      this.error = null;
      this.isLoading = true;
      // we feed that last value to the updater, so it may notify where to resume from
      this.feedUpdater(this.lastValue).then(x => {
        if (x instanceof Array && x.length > 0) {
          const newValue = this.value.concat(x);
          this.setValue(newValue);
          resolve(newValue);
          this.scheduleNext();
        }
      })
      .catch(e => {
        this.setError(e instanceof Error ? e : new Error(e.toString()));
        reject(e);
        if (this.continueAfterErrors) {
          this.scheduleNext();
        }
      });
    });
  }

  private scheduleNext() {
    this.scheduleTimeout = setTimeout(() => {
      if (this.isRunning) {
        this.updateFeed();
      }
    }, this.interval || DEFAULT_INTERVAL);
  }

  setValue(newValue: T[], forceUpdate?: boolean): void {
    this.isLoading = false;
    super.setValue(newValue, forceUpdate);
  }

  setError(error?: Error) {
    this.error = error;
    this.isLoading = false;
    this.setValue(null);
  }

}