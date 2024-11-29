"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListSubject = void 0;
const Subject_1 = require("./Subject");
class ListSubject extends Subject_1.Subject {
    constructor(value) {
        super(value || []);
    }
    addEntry(value) {
        const newList = this.value.slice();
        const index = newList.push(value) - 1;
        this.setValue(newList);
        return index;
    }
    removeEntry(value) {
        const index = this.value.indexOf(value);
        if (index < 0)
            return;
        const newList = this.value.slice();
        newList.splice(index, 1);
        this.setValue(newList);
    }
    replaceEntry(index, value) {
        const newList = this.value.slice();
        newList.splice(index, 1, value);
        this.setValue(newList);
    }
    clear() {
        this.setValue([]);
    }
    hasEntry(value) {
        return this.indexOfEntry(value) >= 0;
    }
    indexOfEntry(value) {
        return this.value.indexOf(value);
    }
}
exports.ListSubject = ListSubject;
