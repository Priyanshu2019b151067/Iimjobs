import 'bootstrap/dist/css/bootstrap.min.css';
import React, { version } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import recruiterReducer from './state/recruiter.jsx';
import {combineReducers, configureStore} from "@reduxjs/toolkit"
import { Provider } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

// const rootReducer = combineReducers({
//     recruiter:recruiterReducer,
// })
const persistConfig = {key : 'root',storage,};
const persistedReducer = persistReducer(persistConfig,recruiterReducer);
const store = configureStore({
  reducer : persistedReducer,
  middleware : (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck : {
      ignoreActions : [FLUSH ,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
    }
  })
})

ReactDOM.createRoot(document.getElementById('root')).render(
 
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
)

