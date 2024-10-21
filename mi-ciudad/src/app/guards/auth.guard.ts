import { CanActivateFn, Router } from '@angular/router';
import { environment } from 'src/environments/environment';  
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  console.log('Estas logueado? '+environment.loggedIn)
  if(environment.loggedIn == true){
    return true;
  }
  else{
    router.navigate(['login']);
    return false;
  }
};
