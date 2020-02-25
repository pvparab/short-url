import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

const StandardErrorText = 'We are unable to serve you right now. Try again later.';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastr: ToastrService) {}

  success(message: string, title?: string): void {
    this.toastr.success(this.convertMessageToHtml(message), title);
  }

  info(message: string, title?: string): void {
    this.toastr.info(this.convertMessageToHtml(message), title);
  }

  wrning(message: string, title?: string): void {
    this.toastr.warning(this.convertMessageToHtml(message), title);
  }

  error(message?: string, title?: string): void {
    if (!message && !title) {
      this.showStandardError();
      return;
    }
    this.toastr.error(this.convertMessageToHtml(message), title);
  }

  showStandardError(): void {
    this.toastr.error(StandardErrorText);
  }

  clear(): void {
    this.toastr.clear();
  }

  private convertMessageToHtml(message?: string): string | undefined {
    if (!message) { return undefined; }
    const result = message.replace(/(?:\r\n|\r|\n)/g, '<br>');
    return result;
  }
}
