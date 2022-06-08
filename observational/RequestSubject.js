/*
  https://github.com/daleblackwood/ladts
  LAD.Subject is a dispatcher with a value - an Observable
*/
import { Subject } from "./Subject";
export class RequestSubject extends Subject {
    constructor(requester, value = null) {
        super(value);
        this.requester = requester;
        this.isLoading = false;
        this.error = null;
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
