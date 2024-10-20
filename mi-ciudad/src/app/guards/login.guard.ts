import { CanActivateFn, Router } from '@angular/router';
import { environment } from 'src/environments/environment'; 
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  console.log('is LoggedIn?: '+environment.loggedIn);
  if(environment.loggedIn == false){
    return true;
  }else{
    router.navigate(['home']);
    return false;
  }
    
};
