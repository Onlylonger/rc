import React, { useEffect, useState } from 'react'

function create(fn) {
  const lisCb = []

  const api = {
    getState() {
      return store
    },
    subscribe(cb) {
      lisCb.push(cb)
      const index = lisCb.length
      return () => {
        lisCb.splice(index - 1, 1)
      }
    },
    setState(partial) {
      const oldState = store
      let newState
      if (typeof partial === 'function') {
        newState = partial(oldState)
      } else newState = partial
      store = Object.assign({}, oldState, newState)
      lisCb.forEach((cb) => cb(store, oldState))
    },
    getInitialState() {
      return initState
    }
  }

  const initState = fn(api.setState, api.getState)
  let store = initState

  function useHook(selectorFn) {
    return selectorFn()
  }

  return Object.assign(useHook, api)
}

const useHookStore = create(() => ({
  count: 1
}))

export default function App() {
  const [count, setCount] = useState(useHookStore.getInitialState().count)

  useEffect(() => {
    const unSubs = useHookStore.subscribe((state, pre) => {
      setCount(state.count)
    })

    return () => {
      unSubs()
    }
  }, [])

  return (
    <div>
      <div>{count}</div>
      <button
        className="demo-btn"
        onClick={() =>
          useHookStore.setState((pre) => ({ count: pre.count + 1 }))
        }
      >
        add count
      </button>
    </div>
  )
}
