import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http/base-http.service';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { setUser } from '../../../store/user/user.actions';
import { AuthUser } from '../../../store/user/user.state';
import { AuthResponse, LoginData } from '../../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private entityName = 'login';

  private readonly _baseHttpService = inject(BaseHttpService);
  private readonly _store = inject(Store);

  login(loginData: LoginData) {
    return this._baseHttpService
      .post<AuthResponse, LoginData>(
        `${this.entityName}`,
        loginData,
        undefined,
        { showSuccessMessage: true }
      )
      .pipe(
        tap(({ user, token }) => {
          localStorage.setItem('user', JSON.stringify({ ...user, token }));
          this._store.dispatch(setUser({ user: { ...user, token } }));
        })
      );
  }

  isAuthenticated() {
    return !!this.getUser()?.token;
  }

  getUser(): AuthUser | null {
    const user = localStorage.getItem('user');
    user &&
      this._store.dispatch(
        setUser({ user: { ...(JSON.parse(user!) as AuthUser) } })
      );
    return user ? JSON.parse(user) : null;
  }
}
