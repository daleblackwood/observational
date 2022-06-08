/*
  https://github.com/daleblackwood/ladts
  LAD.Subject is a dispatcher with a value - an Observable
*/
import { Subject } from "./Subject";

export class RequestSubject<T> extends Subject<T> {

  isLoading = false;
  error: Error = null;

  constructor(public requester: () => Promise<T>, value: T = null) {
    super(value);
  }

  request() {
    return new Promise((resolve, reject) => {
        this.value = null;
        this.error = null;
        this.isLoading = true;
        this.requester().then(x => {
          this.setValue(x);
          resolve(x);
        })
        .catch(e => {
          this.setError(e instanceof Error ? e : new Error(e.toString()));
          reject(e);
        });
    });
  }

  setValue(newValue: T, forceUpdate?: boolean): void {
    this.isLoading = false;
    super.setValue(newValue, forceUpdate);
  }

  setError(error?: Error) {
    this.error = error;
    this.isLoading = false;
    this.setValue(null);
  }

}