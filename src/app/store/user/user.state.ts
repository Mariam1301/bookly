import { User } from '../../core/models/auth.model';

export interface AuthUser extends User {
  token: string;
}

export interface UserState {
  user: AuthUser | null;
}

export const initialState: UserState = {
  user: null,
};
