import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { authentication } from './ducks/authenticate'
import { chess } from './ducks/chess'
import { me } from './ducks/get-me'

const ducks = combineReducers({
  authentication,
  chess,
  me,
})

const configureStore = () => createStore(ducks, composeWithDevTools(applyMiddleware(thunk)))

export { configureStore }
