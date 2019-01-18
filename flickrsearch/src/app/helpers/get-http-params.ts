import { HttpParams } from '@angular/common/http';

export function getHttpParams(params) {
  let httpParams = new HttpParams();
  Object.keys(params).map(key => {
    if (params[key] !== null) {
      httpParams = httpParams.set(key, params[key].toString());
    }
  });
  return httpParams;
}
