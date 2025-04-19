import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { OAuthService } from "angular-oauth2-oidc";
import { Environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private oauthService: OAuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var isAuthenticated = this.oauthService.hasValidAccessToken();
    if (isAuthenticated) {
      return true;
    } else {
      // localStorage.setItem('redirectUrl', window.location.pathname + window.location.search);
      const authUrl = `${Environment.issuer}/connect/authorize?` +
                      `client_id=${Environment.clientId}&` +
                      `response_type=${Environment.responseType}&` +
                      `scope=${encodeURIComponent(Environment.scope)}&` +
                      `redirect_uri=${encodeURIComponent(Environment.redirectUri)}`;
      window.location.href = authUrl;
      return false;
    }
  }
}
