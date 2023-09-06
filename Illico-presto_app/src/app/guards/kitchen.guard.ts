import { CanActivateFn } from '@angular/router';

export const kitchenGuard: CanActivateFn = (route, state) => {
  return true;
};
