import { createStore } from "redux";
import rootReducer from "./reducers/auth";

const store = createStore(rootReducer);

export default store;