import { createStore } from "redux";
import rootReducer from "./reducers";
import { getDummyData } from "../utils/DummyGenerator";


const initialState = {
    participants: getDummyData()
};

export default createStore(rootReducer, initialState);