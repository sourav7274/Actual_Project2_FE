import { configureStore } from "@reduxjs/toolkit";
import leeadReducer from '../features/leadSlice'
import saleAgentReducer from '../features/saleagentSlice'
import tagSliceReducer from '../features/tagSlice'


const store = configureStore({
    reducer:{
       leads:leeadReducer,
       saleAgent:saleAgentReducer,
       tags:tagSliceReducer
    }
})

export default store