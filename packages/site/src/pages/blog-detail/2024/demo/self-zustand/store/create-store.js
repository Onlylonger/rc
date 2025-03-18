import { useSyncExternalStore } from 'react'
// import { useSyncExternalStoreWithSelector } from './use-sync-with-selector'

function exposeApi(fn) {
  const lisCb = []

  const initState = fn(setState, getState)
  let store = initState

  function setState(partial) {
    const oldState = store
    let newState
    if (typeof partial === 'function') {
      newState = partial(oldState)
    } else newState = partial
    store = Object.assign({}, oldState, newState)
    lisCb.forEach((cb) => cb(store, oldState))
  }

  function getState() {
    return store
  }

  function subscribe(cb) {
    lisCb.push(cb)
    const index = lisCb.length
    return () => {
      lisCb.splice(index - 1, 1)
    }
  }

  function getInitialState() {
    return initState
  }

  const api = {
    initState,
    subscribe,
    getState,
    getInitialState
  }

  return api
}

export function create(fn) {
  const api = exposeApi(fn)

  function useHook(selector) {
    return useSyncExternalStore(
      api.subscribe,
      typeof selector === 'function'
        ? () => selector(api.getState())
        : api.getState,
      api.getInitialState
    )
    // return useSyncExternalStoreWithSelector(
    //   api.subscribe,
    //   api.getState,
    //   api.getInitialState,
    //   selector
    // )
  }

  return Object.assign(useHook, api)
}
