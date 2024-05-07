import { createSlice } from "@reduxjs/toolkit";
import {
  createOrganization,
  getOrganizations,
  updateMe,
  updatePassword,
} from "./dataActions";

const initialState = {
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMe.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createOrganization.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrganization.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getOrganizations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrganizations.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getOrganizations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
