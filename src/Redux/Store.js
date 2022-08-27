import { configureStore } from "@reduxjs/toolkit";
import FolderSlicer from "./Slicer";


export const Store =configureStore({
    reducer:{
        folders: FolderSlicer
    },
})