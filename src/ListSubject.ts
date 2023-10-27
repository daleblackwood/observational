import { Subject } from "./Subject";

export class ListSubject<T> extends Subject<T[]> {
	
	constructor(value?: T[]) {
		super(value || []);
	}

	addValue(value: T) {
		const newList = this.value.slice();
		const index = newList.push(value);
		this.setValue(newList);
		return index;
	}

	removeValue(value: T) {
		const index = this.value.indexOf(value);
		if (index < 0)
			return;
		const newList = this.value.slice();
		newList.splice(index, 1);
		this.setValue(newList);
	}

	replaceValue(index: number, value: T) {
		const newList = this.value.slice();
		newList.splice(index, 1, value);
		this.setValue(newList);
	}

	clear() {
		this.setValue([]);
	}

	hasValue(value: T) {
		return this.indexOfValue(value) >= 0;
	}

	indexOfValue(value: T) {
		return this.value.indexOf(value);
	}

}