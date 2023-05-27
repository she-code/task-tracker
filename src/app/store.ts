// import { configureStore } from "@reduxjs/toolkit";
// import boardReducer from "../features/Boards/boardSlice";

// const store = configureStore({
//   reducer: {
//     board: boardReducer,
//   },
// });
// export default store;
// // store.ts

import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "../features/Boards/boardSlice";

export const store = configureStore({
  reducer: {
    boards: boardReducer,
    // Add more reducers for other slices if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
