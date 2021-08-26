"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSubject = void 0;
var react_1 = require("react");
function useSubject(subject, onMount, onUnmount) {
    var _a = react_1.useState(subject.value), value = _a[0], onValueChange = _a[1];
    var scope = {};
    var isMounted = false;
    var isDirty = false;
    var handleValueChange = function (value) {
        isDirty = true;
        if (isMounted === false)
            return;
        isDirty = false;
        onValueChange(value);
    };
    subject.listen(scope, handleValueChange, { immediate: false });
    react_1.useEffect(function () {
        if (onMount)
            onMount();
        isMounted = true;
        if (isDirty) {
            handleValueChange(subject.value);
        }
        return function cleanup() {
            subject.unlisten(scope, handleValueChange);
            if (onUnmount)
                onUnmount();
        };
    }, []);
    return [value, subject.setValue.bind(subject)];
}
exports.useSubject = useSubject;
