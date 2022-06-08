/*
  https://github.com/daleblackwood/ladts
  FeedSubject is an observable that retains an array of values that grows with
  each subsequent request. It requires a getter that receives the most recent
  value. This is ideal for receiving a list of updates from an API, such as a
  notification system.
*/
import { Subject } from "./Subject";
const DEFAULT_INTERVAL = 1000;
export class FeedSubject extends Subject {
    constructor(feedUpdater, interval = DEFAULT_INTERVAL, isRunning = true) {
        super([]);
        this.feedUpdater = feedUpdater;
        this.interval = interval;
        this.isRunning = isRunning;
        // whether or not a request is loading
        this.isLoading = true;
        // the last error in a request (blank from new request)
        this.error = null;
        /// if true, the feed will continue to operate even if a request fails
        this.continueAfterErrors = true;
        this.scheduleTimeout = 0;
        if (this.isRunning) {
            this.updateFeed();
        }
    }
    /// the last value stored on the feed, this should help retreive the following values
    get lastValue() { return this.value.length > 0 ? this.value[this.value.length - 1] : null; }
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
    scheduleNext() {
        this.scheduleTimeout = setTimeout(() => {
            if (this.isRunning) {
                this.updateFeed();
            }
        }, this.interval || DEFAULT_INTERVAL);
    }
    setValue(newValue, forceUpdate) {
        this.isLoading = false;
        super.setValue(newValue, forceUpdate);
    }
    setError(error) {
        this.error = error;
        this.isLoading = false;
        this.setValue(null);
    }
}
