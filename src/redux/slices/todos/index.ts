import { apiClient } from "@/shared/request";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface TotodState {
  entities: [];
  error: {};
}

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    entities: [],
    error: {},
    status: "idle",
  },
  reducers: {
    setFields: (state, { payload }) => ({ ...state, ...payload }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(todosThunk.getEntities.fulfilled, (state, { payload }) => {
        console.log("todosThunk.getEntities.fulfilled");
        state.entities = payload;
        state.status = "success";
      })
      .addCase(todosThunk.getEntities.rejected, (state, action) => {
        console.log(
          `todosThunk.getEntities.rejected: ${JSON.stringify(action)}`
        );

        if (action.payload) {
          console.log("PAYLOAD");

          state.error = action.payload;
        } else {
          console.log("ERROR");
          state.error = action.error;
        }
        state.status = "error";
      });
  },
});

const todosThunk = {
  getEntities: createAsyncThunk("api/todos", async () => {
    const response = await apiClient.get("api/todos");
    return response.data;
  }),
};

export const todosReducer = todosSlice.reducer;
export const todosActions = {
  ...todosSlice.actions,
  ...todosThunk,
};
