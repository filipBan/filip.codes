---
title: useMemo, useCallback and React.memo
date: "2019-04-27T21:12:37.121Z"
---

Today I finally grokked the distinction between those 3, this is so that I don't forget:

### React.memo

This is used to wrap a function component to prevent re-renders if props did not change, for example:

```jsx
import React from 'react';

...

const Picker = React.memo(({ color }) => (
    <div>
        <span>{color.hue}</span>
        <span>{color.saturation}</span>
        <span>{color.gamma}</span>
    </div>
))
```

Every time parent of `Picker` component re-renders, React will check if the `color` prop has changed. If the whole object is the same (deep comparison is done here) then `Picker` will not be re-rendered.

### useMemo

This hook is used to memoize a computation and returns a cached result if none of the dependencies changed. It accepts 2 arguments - a function that will return a result of the computation and an array of dependencies.

A good example is passing a state from a `useReducer` hook, or anything that might be costly to recalculate on every render.

```jsx
import React, { useMemo } from 'react';

...

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = useMemo(() => state, [state]);

	return (
		<ChildComponent value={value} />
	)
}
```

Important thing here is that `useMemo` will NOT prevent `ChildComponent` from re-rendering! It will only prevent the value prop that's passed down from being recalculated on every render.

### useCallback

This hook will return the same function entity if none of the dependencies changed between renders.

Often when we pass a function down to a child we do something like this:

```jsx
function Parent() {
  const [count, setCount] = useState(0)

  return <Child handleChange={() => setCount(c => c + 1)} />
}
```

The problem here is that every time `Parent` component re-renders that inline function will have to be recreated. It will be a different entity, so since the props changed `Child` will get re-rendered as well (even if it's wrapped in `React.memo`). Moving that handler out of the return will not solve the issue - a new function will still be declared on every render:

```jsx{5}
function Parent() {
  const [count, setCount] = useState(0)

  // that's a new function on every render
  const handleChange = () => setCount(c => c + 1)

  return <Child handleChange={handleChange} />
}
```

Solution is to use the `useCallback` hook that will 'remember' one function and return that cached entity on every render, as long as none of dependencies change:

```jsx{10}
import React, { useCallback } from 'react';

...

function Parent() {
	const [count, setCount] = useState(0);

	// here I'm passing an empty array since I never want that function to change
	// setCount(c => c + 1) will always increment the count by 1
	const handleChange = useCallback(() => setCount(c => c + 1), []);

	return (
		<Child handleChange={handleChange} />
	)
}
```
