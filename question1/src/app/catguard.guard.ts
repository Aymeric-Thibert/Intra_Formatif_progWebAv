import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { inject } from '@angular/core';

export const catguardGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  
  
    
    if(userService.currentUser?.prefercat ==true){
      return true;
    }
  
      return createUrlTreeFromSnapshot(route, ["/dog"]);
};
