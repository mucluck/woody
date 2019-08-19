import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import reducer from "./reducer";
import { watchfetchTasksData, watchSignIn, watchsaveTask } from "../saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchfetchTasksData);
sagaMiddleware.run(watchSignIn);
sagaMiddleware.run(watchsaveTask);

global.store = store;

export { store };
