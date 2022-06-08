import { useState, useEffect } from "react";
import { Subject } from "../Subject";

export function subscribe<SubjectT extends Subject<ValueT>, ValueT>(subject: SubjectT, onMount?: () => void, onUnmount?: () => void): SubjectT {
  const [value, onValueChange] = useState<ValueT>(subject.value);
  const scope = {};
  let isMounted = false;
  let isDirty = false;
  const handleValueChange = (value: ValueT) => {
    isDirty = true;
    if (isMounted === false)
      return;
    isDirty = false;
    onValueChange(value);
  };
  subject.listen(scope, handleValueChange, { immediate: false });
  useEffect(() => {
    if (onMount) onMount();
    isMounted = true;
    if (isDirty) {
      handleValueChange(subject.value);
    }
    return function cleanup() {
      subject.unlisten(scope, handleValueChange);
      if (onUnmount) onUnmount();
    }
  }, []);
  return subject;
}

export default subscribe;