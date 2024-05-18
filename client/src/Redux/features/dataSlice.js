import { createSlice } from "@reduxjs/toolkit";
import {
  createOrganization,
  getOrganizations,
  updateMe,
  updatePassword,
  followOrganization,
  unfollowOrganization,
  getOneOrganization,
  switchWorkspace,
  updateOrganization,
  updateOrganizationLogo,
  joinOrganization,
  organizationStaff,
  activateStaff,
  deactivateStaff,
  getUserOrganizations,
  getNotifications
} from "./dataActions";

const initialState = {
  loading: false,
  error: null,
  workspace: null,
  currentSidebar: "1",
  currentUserOrganizationsIdAndRole: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    switchToPersonalWorkspace(state) {
      state.workspace = null;
    },
    switchSidebar(state, action) {
      console.log(action, 'action');
      state.currentSidebar = action.payload;
    },
    currentUserOrganizationsIdAndRole(state, action) {
      state.userOrganizationsIdAndRole = action.payload;
    },
  },
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
      })
      .addCase(switchWorkspace.pending, (state) => {
        state.loading = true;
      })
      .addCase(switchWorkspace.fulfilled, (state, action) => {
        state.loading = false;
        state.workspace = action.payload.data.data[0];
      })
      .addCase(switchWorkspace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateOrganizationLogo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrganizationLogo.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateOrganizationLogo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateOrganization.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrganization.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(joinOrganization.pending, (state) => {
        state.loading = true;
      })
      .addCase(joinOrganization.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(joinOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(organizationStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(organizationStaff.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(organizationStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(activateStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(activateStaff.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(activateStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deactivateStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(deactivateStaff.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deactivateStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUserOrganizations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserOrganizations.fulfilled, (state, action) => {
        state.loading = false;
        // state.userOrganizations = action.payload.data.data;
      })
      .addCase(getUserOrganizations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;
        // state.userOrganizations = action.payload.data.data;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    
  },
});

export const { switchToPersonalWorkspace, switchSidebar, currentUserOrganizationsIdAndRole } = dataSlice.actions;

export default dataSlice.reducer;
