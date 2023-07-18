import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../rootSaga";
import rootReducer from "../rootReducer";
const sagaMidleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({ thunk: false, serializableCheck: false }), // serializableCheck: false to avoid warning
    sagaMidleware,
  ],
});
sagaMidleware.run(rootSaga);
export default store;
