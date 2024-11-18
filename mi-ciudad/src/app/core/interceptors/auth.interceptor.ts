import { HttpInterceptorFn } from '@angular/common/http';
import { EnvironmentInjector } from '@angular/core';
import { environment } from 'src/environments/environment';
// import { CurrentUser } from '../dto/users';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // TO-DO:
  // Se podria hacer que si no esta la variable keepLoggedIn al inicio no guarde token en el loicalstorage
  // y todo se ponga en el environment, sino, al salir de la app y entrar enseguida, no se vence el token y es
  // un posible problema de seguridad
  console.log('->export const authInterceptor: HttpInterceptorFn = (req, next)');
  console.log(req.url)
  console.log(req)
  // SOLO AGREGO AUTHBEARER SI VA A MI BACKEND!!!
  if(req.url.includes(environment.apiURL)){
    const currentUser:any = JSON.parse(String(localStorage.getItem('user')));
    if (currentUser) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + currentUser.token),
      });
      console.log('<-export const authInterceptor: HttpInterceptorFn = (req, next) - INTRANET');
      return next(cloned);
    }
  }
  console.log('<-export const authInterceptor: HttpInterceptorFn = (req, next) - EXTRANET');
  return next(req);
};