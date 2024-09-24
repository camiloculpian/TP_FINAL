import { HttpInterceptorFn } from '@angular/common/http';
// import { CurrentUser } from '../dto/users';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const currentUser:any = JSON.parse(String(localStorage.getItem('user')));
  if (currentUser) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + currentUser.token),
    });
    return next(cloned);
  }
  return next(req);
};