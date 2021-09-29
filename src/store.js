// import { createStore, compose } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension'
// import {
//   sayHiOnDispatch,
//   includeMeaningOfLife,
// } from './exampleAddons/enhancers'
import { print1, print2, print3 } from './exampleAddons/middleware'

// const composeEnhancer = compose(sayHiOnDispatch, includeMeaningOfLife)
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

// const store = createStore(rootReducer, undefined, composeEnhancer)
const store = createStore(rootReducer, composedEnhancer)

export default store
