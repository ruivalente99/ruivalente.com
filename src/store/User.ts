/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State } from 'types/Store';
import { User } from 'types/User';

const initialState = {
};

export const user = createSlice( {
  name: 'user',
  initialState,
  reducers: {
    updateUser: ( state: User, action: PayloadAction<Partial<User>> ) => {
      if ( action.payload.groups ) state.groups = action.payload.groups;
      if ( action.payload.username ) state.username = action.payload.username;
      if ( action.payload.accessToken ) state.accessToken = action.payload.accessToken;
      if ( action.payload.email ) state.email = action.payload.email;
      if ( action.payload.tenant ) state.tenant = action.payload.tenant;
      if ( action.payload.operator ) state.operator = action.payload.operator;
      if ( action.payload.isVerified ) state.isVerified = action.payload.isVerified;
    },
    logoutUser: () => ( initialState ),
  },
} );

export const {
  updateUser,
  logoutUser,
} = user.actions;

export const selectUser = ( state: State ) => state.user;

export default user.reducer;
