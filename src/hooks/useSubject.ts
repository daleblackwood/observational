import { useState, useEffect } from "react";
import { Subject } from "../Subject";

export function useSubject<T>(subject: Subject<T>, onMount?: () => void, onUnmount?: () => void): [T, (value: T) => void] {
  const [value, onValueChange] = useState<T>(subject.value);
  const scope = {};
  useEffect(() => {
    subject.listen(scope, onValueChange, { immediate: false });
    if (onMount) onMount();
    return function cleanup() {
      subject.unlisten(scope, onValueChange);
      if (onUnmount) onUnmount();
    }
  })
  return [value, subject.setValue.bind(subject)];
}