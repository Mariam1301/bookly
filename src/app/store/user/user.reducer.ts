/*define how state should change based on actions*/

import { createReducer, on } from '@ngrx/store';
import { initialState } from './user.state';
import { setUser } from './user.actions';

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({ ...state, user }))
);
