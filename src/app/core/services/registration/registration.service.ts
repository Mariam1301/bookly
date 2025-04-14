import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http/base-http.service';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { setUser } from '../../../store/user/user.actions';
import { AuthResponse, RegistrationData } from '../../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private entityName = 'register';

  private readonly _baseHttpService = inject(BaseHttpService);
  private readonly _store = inject(Store);

  register(registrationData: RegistrationData) {
    return this._baseHttpService
      .post<AuthResponse, RegistrationData>(
        `${this.entityName}`,
        registrationData,
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
}
