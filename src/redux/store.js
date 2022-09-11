import {createStore,combineReducers } from 'redux'
import navReducer from './reducers/navReducers'
const mainReducer = combineReducers({navReducer})

const store = createStore(mainReducer)

export default store
