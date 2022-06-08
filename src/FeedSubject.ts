/*
  https://github.com/daleblackwood/ladts
  LAD.Subject is a dispatcher with a value - an Observable
*/
import { Subject } from "./Subject";

const DEFAULT_INTERVAL = 1000;

export class FeedSubject<T> extends Subject<T[]> {

  isLoading = false;
  error: Error = null;
  continueAfterErrors = true;
  get lastValue() {
    return this.value.length > 0 ? this.value[this.value.length - 1] : null;
  }

  constructor(public feedUpdater: (lastValue: T|null) => Promise<T[]>, public interval: number = DEFAULT_INTERVAL) {
    super([]);
    this.scheduleNext();
  }

  private scheduleNext() {
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