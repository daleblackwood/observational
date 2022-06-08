/*
  https://github.com/daleblackwood/ladts
  LAD.Subject is a dispatcher with a value - an Observable
*/
import { Subject } from "./Subject";
const DEFAULT_INTERVAL = 1000;
export class FeedSubject extends Subject {
    constructor(feedUpdater, interval = DEFAULT_INTERVAL) {
        super([]);
        this.feedUpdater = feedUpdater;
        this.interval = interval;
        this.isLoading = false;
        this.error = null;
        this.continueAfterErrors = true;
        this.scheduleNext();
    }
    get lastValue() {
        return this.value.length > 0 ? this.value[this.value.length - 1] : null;
    }
    scheduleNext() {
        setTimeout(() => this.updateFeed(), this.interval || DEFAULT_INTERVAL);
    }
    updateFeed() {
        return new Promise((resolve, reject) => {
            this.value = null;
            this.error = null;
            this.isLoading = true;
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
