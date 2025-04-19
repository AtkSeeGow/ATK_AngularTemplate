import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs';
import { Environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authConfig: AuthConfig = {
    issuer: Environment.issuer,
    clientId: Environment.clientId,
    redirectUri: Environment.redirectUri,
    postLogoutRedirectUri: Environment.postLogoutRedirectUri,
    responseType: Environment.responseType,
    scope: Environment.scope,
    requireHttps: Environment.requireHttps,
    showDebugInformation: Environment.showDebugInformation,
    strictDiscoveryDocumentValidation: Environment.strictDiscoveryDocumentValidation
  };

  constructor(private oauthService: OAuthService, private httpClient: HttpClient) {
    this.oauthService.configure(this.authConfig);
    this.oauthService.loadDiscoveryDocumentAndLogin();
    this.oauthService.events.pipe(filter((e) => e.type === 'token_received')).subscribe((_) => this.oauthService.loadUserProfile());
  }

  logout() {
    this.oauthService.logOut();
  }

  get userProfile() {
    return this.oauthService.getIdentityClaims();
  }

  get isAuthenticated() {
    return this.oauthService.hasValidAccessToken();
  }

  async exchangeToken(code: string) {
    const body = new URLSearchParams();
    body.set("client_id", this.authConfig.clientId!);
    body.set("grant_type", "authorization_code");
    body.set("code", code);
    body.set("redirect_uri", this.authConfig.redirectUri!);

    try {
      const response: any = await this.httpClient
        .post("http://localhost:5199/connect/token", body.toString(), {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .toPromise();

      // 儲存 Token
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("id_token", response.id_token);
      this.oauthService.setStorage(localStorage);
    } catch (error) {
      console.error("交換 Token 失敗", error);
    }
  }
}