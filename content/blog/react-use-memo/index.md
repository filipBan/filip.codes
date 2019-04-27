---
title: useMemo, useCallback and React.memo
date: "2019-04-27T21:12:37.121Z"
description: "What actually is the difference?"
---

All 3 are purely a performance optimization that will help prevent extra re-renders. They are not mutually exclusive, they can and should be used together for the best results.

### React.memo

This is used to wrap a function component to prevent re-renders if props did not change, for example:

```jsx
import React from "react"

// ...

const Color = React.memo(({ color }) => (
  <div>
    <span>{color.hue}</span>
    <span>{color.saturation}</span>
    <span>{color.gamma}</span>
  </div>
))
```

Every time parent of `Color` component re-renders React will check if the `color` prop has changed. If the object is the same then `Color` will not be re-rendered.

It's important to note that React does not do a deep comparison here, it will only check if it's the same entity (object, array, primitive value) that would pass the `==` or `===` comparison. This is an easy gotcha if the `color` prop gets recalculated in the parent component on every render. `useMemo` can help with that.

### useMemo

This hook is used to memoize a computation and return a cached result if none of the dependencies changed. It accepts 2 arguments - a function that will return a result of the computation and an array of dependencies. If any item in that array changes useMemo will re-run the function from the first argument and cache the new result.

One use case is a filtered list of items:

```jsx
import React, { useMemo, useState } from "react"

// ...

function List({ data }) {
  const [query, setQuery] = useState("")

  // that would re-calculate every time parent re-renders
  // const filteredData = data.filter(item => item.name.includes(query))

  // useMemo will memoize the result and keep it between renders
  // if data and query dependencies don't change
  const filteredData = useMemo(
    () => data.filter(item => item.name.includes(query)),
    [data, query]
  )

  return (
    <div>
      <input value={filter} onChange={e => setQuery(e.target.value)} />
      {filteredData.map(item => (
        <span key={item.id}>{item.name}</span>
      ))}
    </div>
  )
}
```

`filteredData` will only get recalculated if either of the props passed to the array of dependencies change. If it wasn't wrapped in `useMemo` that filtering would have to happen on every render.

In the above example we can even go one step further an memoize the result of mapping over the `filteredData`:

```jsx{12,19}
import React, { useMemo, useState } from "react"

// ...

function List({ data }) {
  const [filter, setFilter] = useState("")

  const filteredData = useMemo(
    () =>
      data
        .filter(item => item.includes(filter))
        .map(item => <span key={item.id}>{item.name}</span>),
    [data, filter]
  )

  return (
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      {filteredData}
    </div>
  )
}
```

---

Another example is passing a state from `useReducer` to prevent recalculating it if an action that was passed to a reducer fell through to the default case:

```javascript
const reducer = (state, action) => {
  switch (action.type) {
    // ...
    default:
      return state
  }
}
```

This will return the same object that was passed in, so the state in below example will not be recalculated:

```jsx
import React, { useMemo } from "react"

// ...

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  // will only recalculate if a new state object is returned from useReducer
  const value = useMemo(() => state, [state])

  return <ChildComponent value={value} />
}
```

If the reducer was written slightly differently however (or if another case was a match):

```javascript{4,7}
const reducer = (state, action) => {
  switch (action.type) {
    case "EXAMPLE":
      return { ...state, count: action.count }
    // ...
    default:
      return { ...state }
  }
}
```

Then the returned state would be a brand new entity that would fail the `==` and `===` comparison, causing the whole `value` variable to be recalculated.

Important thing here is that `useMemo` will NOT prevent `ChildComponent` above from re-rendering! It will only prevent the value prop that's passed down to be recalculated on every render. Use `React.memo` for that optimization. `useMemo` can however be used as a one-off `React.memo` like so:

```jsx
import React, { useMemo, useState } from "react"
import Child from "./Child"

// ...

function App() {
  const [count, setCount] = useState(0)
  const ChildMemo = useMemo(() => <Child count={count} />, [count])

  return <ChildMemo />
}
```

### useCallback

This hook will return the same function entity if none of the dependencies changed between renders.

Often when we pass a function down to a child we do something like this:

```jsx{4}
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

Solution is to use the `useCallback` hook that will 'remember' one function and return that cached entity on every render as long as none of dependencies change:

```jsx{10}
import React, { useCallback } from "react"

// ...

function Parent() {
  const [count, setCount] = useState(0)

  // here I'm passing an empty array since I never want that function to change
  // setCount(c => c + 1) will always increment the count by 1
  const handleChange = useCallback(() => setCount(c => c + 1), [])

  return <Child handleChange={handleChange} />
}
```

`useCallback` and `useMemo` both look very similar, but should be used for two different things, as their names imply. `useCallback` should be used to get a cached function, or a handler. `useMemo` should be used to get a cached value.
