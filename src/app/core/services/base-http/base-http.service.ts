import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  BaseHttpActions,
  HttpRequestOptions,
  ParamsType,
} from './base-http.model';
import { catchError, finalize, tap } from 'rxjs';
import { LoaderService } from '../loader/loader.service';
import { TranslocoService } from '@jsverse/transloco';
import { stringify } from 'qs';
import { formatDateToISODate } from '../../utils/date-formating';

const BASE_URL = 'http://Payroll-api.devgkh.com/api/';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService implements BaseHttpActions {
  constructor(
    public httpClient: HttpClient,
    private readonly _toastService: MessageService,
    private readonly _loaderService: LoaderService,
    private readonly _translocoService: TranslocoService,
  ) {}

  get<T>(url: string, params?: any, options?: HttpRequestOptions) {
    options?.loaderId && this._loaderService.createLoader(options.loaderId);
    return this.httpClient
      .get<T>(`${BASE_URL}${url}?${this.paramsToQueryString(params)}`)
      .pipe(
        tap((x) => this.HandleResponse(x)),
        catchError((er) => {
          this.handleErrorResponse(er);
          throw er;
        }),
        finalize(
          () =>
            options?.loaderId &&
            this._loaderService.removeLoader(options.loaderId),
        ),
      );
  }

  post<TResponse, TData>(
    url: string,
    data: TData,
    params?: ParamsType,
    options?: HttpRequestOptions,
  ) {
    return this.httpClient
      .post<TResponse>(`${BASE_URL}${url}`, data, {
        params: this.createParams(params),
      })
      .pipe(
        tap((x) => this.HandleResponse(x)),
        catchError((er) => {
          this.handleErrorResponse(er);
          throw er;
        }),
        tap(() => options?.showSuccessMessage && this.handleSuccessToast()),
      );
  }

  delete<T>(url: string, params?: ParamsType, options?: HttpRequestOptions) {
    return this.httpClient
      .delete<T>(`${BASE_URL}${url}`, { params: this.createParams(params) })
      .pipe(
        tap((x) => this.HandleResponse(x)),
        catchError((er) => {
          this.handleErrorResponse(er);
          throw er;
        }),
      );
  }

  put<TResponse, TData>(
    url: string,
    data: TData,
    params?: ParamsType,
    options?: HttpRequestOptions,
  ) {
    return this.httpClient
      .put<TResponse>(`${BASE_URL}${url}`, data, {
        params: this.createParams(params),
      })
      .pipe(
        tap((x) => this.HandleResponse(x)),
        catchError((er) => {
          this.handleErrorResponse(er);
          throw er;
        }),
      );
  }

  private createParams(params?: ParamsType) {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        value && (httpParams = httpParams.append(key, value));
      });
    }
    return httpParams;
  }

  private paramsToQueryString(params: any) {
    return stringify(params, {
      encode: false,
      charset: 'iso-8859-1',
      serializeDate: (date) => formatDateToISODate(date)!,
    });
  }

  private HandleResponse(response: any) {
    if (response.Status === 500) {
      this.handleErrorToast('500 სერვერის პრობლემა');
    }
  }

  private handleErrorResponse(error: any) {
    const errorSummary = `${error?.status} ${error?.statusText}`;
    const errorText = error?.error?.message;

    this._toastService.add({
      severity: 'error',
      summary: errorSummary,
      detail: errorText,
      sticky: true,
    });

    let errors = error?.error?.errors;
    if (errors && Object.keys(errors).length) {
      for (let key of Object.keys(errors)) {
        this._toastService.add({
          severity: 'error',
          summary: key,
          detail: errors[key],
        });
      }
    }
  }

  private handleErrorToast(errorMessage: string) {
    this._toastService.add({
      severity: 'error',
      summary: 'მოხდა შეცდომა',
      detail: errorMessage,
      sticky: true,
    });
  }

  private handleSuccessToast(message?: string) {
    this._toastService.add({
      severity: 'success',
      summary: message || this._translocoService.translate('successMessage'),
    });
  }
}
