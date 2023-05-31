import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "../features/Boards/boardSlice";
import taskReducer from "../features/Tasks/taskSlice";
import userReducer from "../features/User/userSlice";
import statusReducer from "../features/Status/statusSlice";
export const store = configureStore({
  reducer: {
    boards: boardReducer,
    tasks: taskReducer,
    users: userReducer,
    statuses: statusReducer,
    // Add more reducers for other slices if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
