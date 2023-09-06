import { CanActivateFn } from '@angular/router';

export const serverGuard: CanActivateFn = (route, state) => {
  return true;
};
