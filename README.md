# observational

observational is a lightweight observable utility or framework for Javascript projects.

Observable comes with two main types:
- Dispatcher: an event dispatcher that can publish a value
- Subject: a Dispatcher that retains a value.

Subjects are best used with Service-like classes, like this:
```
// CountService.js
import { Subject } from "observable";

class CountService {
  constructor() {
    this.subCounter = new Subject(0);
  }
  increase() {
    this.subCounter.setValue(this.subCounter.value + 1);
  }
}
export const countService = new CountService();
```

That can be used anywhere like so:
```
import { countService } from "./CountService";

// listen for changes
countService.subCounter.listen(this, x => console.log("count is " + x));

// a timeout to cause the change to happen every second
setTimeout(x => countService.increase(), 1000);
```

## Hooks

Subjects can be used with React-like hooks. Hooks from any React-like framework should work, though will need bootstrapping.

To initialise hooks:
```
import { useState, useEffect } from "react";
import { initHooks } from "observable/hooks";
initHooks({ useState, useEffect });
```

To use hooks in components, assuming we have the CountService class from the first example, try this:
```
import { useSubject } from "observable/hooks";
import { countService } from "./CountService";

function CountComponent() {
  const [value] = useSubject(countService.subCount);
  return (
    <div>{count}</div>
  );
}
