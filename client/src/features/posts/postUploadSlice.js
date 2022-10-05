import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    loading:false,
    post:[],
    error:'',
}



const postUploadSlice = createSlice({
    name:'postUpload',
    initialState,
    reducers:{
        updateTitle:(state,action)=>{
            state.title=action.payload.title
        }
    }
})