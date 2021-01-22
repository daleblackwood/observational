import { useState } from "react";
import { Subject } from "../Subject";

export function useSubject<T>(subject: Subject<T>): [T, (value: T) => void] {
  const [value, onValueChange] = useState<T>(subject.value);
  subject.listen({}, onValueChange, { once: true, immediate: false });
  return [value, subject.setValue.bind(subject)];
}