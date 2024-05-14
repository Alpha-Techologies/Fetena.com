import { createSlice } from "@reduxjs/toolkit";
import {
  createOrganization,
  getOrganizations,
  updateMe,
  updatePassword,
  followOrganization,
  unfollowOrganization,
  getOneOrganization
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
      })
      .addCase(followOrganization.pending, (state) => {
        state.loading = true;
      })
      .addCase(followOrganization.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(followOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(unfollowOrganization.pending, (state) => {
        state.loading = true;
      })
      .addCase(unfollowOrganization.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(unfollowOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getOneOrganization.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneOrganization.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getOneOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    
  },
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
