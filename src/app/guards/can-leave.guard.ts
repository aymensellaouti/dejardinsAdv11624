import { CanDeactivateFn } from '@angular/router';
import { CanLeave } from './can-leave.interface';

export const canLeaveGuard: CanDeactivateFn<CanLeave> = (component, currentRoute, currentState, nextState) => {
  if (!component.canLeave()) {
    return confirm('Are you sure you want to leave the form is not empty?');
  }

  return true;
};
