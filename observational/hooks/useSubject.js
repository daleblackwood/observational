import { requireLib } from "./hooklib";
export function useSubject(subject, onMount, onUnmount) {
    const lib = requireLib();
    const [value, onValueChange] = lib.useState(subject.value);
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
    lib.useEffect(() => {
        subject.listen(scope, handleValueChange, { immediate: false });
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
