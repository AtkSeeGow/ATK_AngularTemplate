export const Environment = {
  issuer: 'http://localhost:5199',
  clientId: 'angular-template',
  redirectUri: window.location.origin + '/Callback',
  postLogoutRedirectUri: window.location.origin + '/logout-callback',
  responseType: 'code',
  scope: 'openid profile api1',
  requireHttps: false,
  showDebugInformation: true,
  strictDiscoveryDocumentValidation: false,
};