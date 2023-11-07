import { requireLib } from "./hooklib";
import { Subject } from "../Subject";

export function useSubject<T>(subject: Subject<T>, onMount?: () => void, onUnmount?: () => void): [T, (value: T) => void] {
	const lib = requireLib();
	if (!lib) {
		throw new Error("observational requires that your React-compatable library is registered once, via initHooks")
	}
	const [value, onValueChange] = lib.useState(subject.value);
	const scope = {};
	let isMounted = false;
	let isDirty = false;
	const handleValueChange = (value: T) => {
		isDirty = true;
		if (isMounted === false)
			return;
		isDirty = false;
		onValueChange(value);
	};
	lib.useEffect(() => {
		subject.listen(scope, handleValueChange, { immediate: false });
		if (onMount) onMount();
		isMounted = true;
		if (isDirty) {
			handleValueChange(subject.value);
		}
		return function cleanup() {
			subject.unlisten(scope, handleValueChange);
			if (onUnmount) onUnmount();
		}
	}, [subject.value]);
	return [value, subject.setValue.bind(subject)];
}

export function useValue<T>(subject: Subject<T>, onMount?: () => void, onUnmount?: () => void) {
	return (useSubject(subject, onMount, onUnmount)[0]) as T;
}