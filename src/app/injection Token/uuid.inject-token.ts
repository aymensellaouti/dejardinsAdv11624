import { InjectionToken } from "@angular/core";

export const UUID_PROVIDER = new InjectionToken<() => string>('UUID_PROVIDER');
