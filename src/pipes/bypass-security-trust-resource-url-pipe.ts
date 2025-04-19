import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

/**
 * 使用 iframe 時請於 url 後面增加此程序，防止異動重新載入
 */
@Pipe({
    name: 'bypassSecurityTrustResourceUrl',
    standalone: true,
})
export class BypassSecurityTrustResourceUrlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }
    transform(url: any) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}