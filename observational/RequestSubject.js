/*
  https://github.com/daleblackwood/ladts
  A RequestSubject is an observable with a value received from a request.
  Each time the request is made, the value is replaced wholesale. This is
  ideal for an API with a changing value.
*/
import { Subject } from "./Subject";
export class RequestSubject extends Subject {
    constructor(requester, value = null, immediate = true) {
        super(value);
        this.requester = requester;
        this.isLoading = false;
        this.error = null;
        if (immediate) {
            this.request();
        }
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
