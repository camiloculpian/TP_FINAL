import { HttpInterceptorFn } from '@angular/common/http';
// import { CurrentUser } from '../dto/users';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // TO-DO:
  // Aca se podria hacer que si no esta la variable keepLoggedIn al inicio no guarde token en el loicalstorage
  // y todo se ponga en el environment, sino, al salir de la app y entrar enseguida, no se vence el token y es
  // un posible problema de seguridad

  const currentUser:any = JSON.parse(String(localStorage.getItem('user')));
  if (currentUser) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + currentUser.token),
    });
    return next(cloned);
  }
  return next(req);
};