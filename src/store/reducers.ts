import { combineReducers } from "redux";
import { auth } from "./slice";
import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
export const perReducer = persistReducer(persistConfig, rootReducer);
