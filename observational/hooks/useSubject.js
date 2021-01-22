"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSubject = void 0;
var react_1 = require("react");
function useSubject(subject) {
    var _a = react_1.useState(subject.value), value = _a[0], onValueChange = _a[1];
    subject.listen({}, onValueChange, { once: true, immediate: false });
    return [value, subject.setValue.bind(subject)];
}
exports.useSubject = useSubject;
