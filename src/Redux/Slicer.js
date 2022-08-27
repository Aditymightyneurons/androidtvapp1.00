import { createSlice } from "@reduxjs/toolkit";


const InitialState={
    folder1:[],
    folder2:[],
    folder3:[],
}


const FolderSlicer = createSlice({
    name:"folders",
    initialState:InitialState,
    reducers:{
        setFolders:(state, action)=>{
            state.folder1 = action.payload.folder1;
            state.folder2 = action.payload.folder2;
            state.folder3 = action.payload.folder3;
        }
    }
});


export const {setFolders } = FolderSlicer.actions;

export const selectIsFolder1 = (state)=> state.folders.folder1;
export const selectIsFolder2 = (state)=> state.folders.folder2;
export const selectIsFolder3 = (state)=> state.folders.folder3;


export default FolderSlicer.reducer;