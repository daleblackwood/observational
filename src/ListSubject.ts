import { Subject } from "./Subject";

export class ListSubject<T> extends Subject<T[]> {
	
	constructor(value?: T[]) {
		super(value || []);
	}

	addEntry(value: T) {
		const newList = this.value.slice();
		const index = newList.push(value) - 1;
		this.setValue(newList);
		return index;
	}

	removeEntry(value: T) {
		const index = this.value.indexOf(value);
		if (index < 0)
			return;
		const newList = this.value.slice();
		newList.splice(index, 1);
		this.setValue(newList);
	}

	replaceEntry(index: number, value: T) {
		const newList = this.value.slice();
		newList.splice(index, 1, value);
		this.setValue(newList);
	}

	clear() {
		this.setValue([]);
	}

	hasEntry(value: T) {
		return this.indexOfEntry(value) >= 0;
	}

	indexOfEntry(value: T) {
		return this.value.indexOf(value);
	}

}