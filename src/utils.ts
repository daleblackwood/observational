export function isMatching(a: any, b: any) {
	if (a === b) return true;
	if (typeof a !== typeof b) return false;
	if (Boolean(a) !== Boolean(b)) return false;
	if (typeof a === "object") {
		if (a instanceof Array && a.length !== b.length) return false;
		for (const key in a) {
			if (isMatching(a[key], b[key]) === false)
				return false;
		}
	}
	return a == b;
}