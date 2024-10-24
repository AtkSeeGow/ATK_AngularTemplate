import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { NotifyMessageComponent } from "../components/notify-message.component";

@Injectable({ 
  providedIn: 'root' 
})
export class Authorization implements CanActivate {
  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let functionKeys: number[] = [];

    return this.httpClient.post<boolean>('./Api/Authentication/CanActivate', { functionKeys: functionKeys }).pipe(
      map(result => {
        if (!result)
          this.router.navigateByUrl("Login");
        return result;
      }),
      catchError(httpErrorResponse => {
        if (httpErrorResponse.status === 401)
          this.router.navigateByUrl("Login");
        else
        NotifyMessageComponent.popupBy(httpErrorResponse);

        return of(false);
      })
    )
  }
};
