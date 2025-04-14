import { Observable } from 'rxjs';

export type ParamsType = {
  [key: string]: string | number | boolean | undefined;
};

export type HttpRequestOptions = {
  loaderId?: string;
  showSuccessMessage?: boolean;
};

export interface BaseHttpActions {
  get<T>(
    url: string,
    params?: ParamsType,
    options?: HttpRequestOptions,
  ): Observable<T>;

  post<T>(
    url: string,
    data: any,
    params?: ParamsType,
    options?: HttpRequestOptions,
  ): Observable<T>;

  delete<T>(
    url: string,
    params?: ParamsType,
    options?: HttpRequestOptions,
  ): Observable<T>;

  put<T>(
    url: string,
    data: any,
    params?: ParamsType,
    options?: HttpRequestOptions,
  ): Observable<T>;
}
