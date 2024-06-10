import { HttpClient } from "@angular/common/http";
import { HelpersService } from "../services/helpers.service";

export function sayHelloProviderFactory(http: HttpClient) : HelpersService {
  return new HelpersService(http);
}
