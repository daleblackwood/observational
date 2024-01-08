import { requireLib } from "./hooklib";
export function useSubject(subject, onMount, onUnmount) {
    const lib = requireLib();
    if (!lib) {
        throw new Error("observational requires that your React-compatable library is registered once, via initHooks");
    }
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
    }, [subject.value]);
    return [value, subject.setValue.bind(subject)];
}
export function useValue(subject, onMount, onUnmount) {
    const binding = useSubject(subject, onMount, onUnmount);
    const initValue = binding[0];
    return initValue;
}
