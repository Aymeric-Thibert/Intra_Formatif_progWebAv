import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { inject } from '@angular/core'; // 👈 Nécessaire pour injecter le service
import { UserService } from './user.service';



export const guardsGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);


  const isConnected = userService.currentUser;

    return isConnected ? true : createUrlTreeFromSnapshot(route, ["/login"]);
  
};
