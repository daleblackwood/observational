import { useState, useEffect } from "react";
export function subscribe(subject, onMount, onUnmount) {
    const [value, onValueChange] = useState(subject.value);
    const scope = {};
    let isMounted = false;
    let isDirty = false;
    const handleValueChange = (value) => {
        isDirty = true;
        if (isMounted === false)
            return;
        isDirty = false;
        onValueChange(value);
    };
    subject.listen(scope, handleValueChange, { immediate: false });
    useEffect(() => {
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
    return subject;
}
export default subscribe;
