import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../injectable/auth-service.injectable";

@Component({
  selector: "callback",
  template: `<p>處理登入中，請稍候...</p>`,
})
export class CallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(async (params) => {
      const code = params["code"];
      const state = params["state"];

      if (code)
        await this.authService.exchangeToken(code);

      // 轉跳回應用程式首頁或原本要前往的頁面
      const targetUrl = localStorage.getItem("redirectUrl") || "/";
      localStorage.removeItem("redirectUrl");
      this.router.navigateByUrl(targetUrl);
    });
  }
}