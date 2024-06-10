import { InjectionToken } from "@angular/core";
import { HelpersService } from "../services/helpers.service";

export const SAY_HELLO_INJECTION_TOKEN = new InjectionToken<HelpersService>(
  'SAY_HELLO_INJECTION_TOKEN'
);
