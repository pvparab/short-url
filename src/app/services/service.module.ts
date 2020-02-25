import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './error.interceptor';
import { CommonURL } from './commonurl';
import { BroadcastSubject } from './broadcast.subject';
import { AuthGuard } from './auth.guard';
import { PostService } from './posts.service';
import { JWTInterceptor } from './jwt.inteceptor';
import { ToastService } from './toast.service';
import { UserService } from './user.service';
import { DecorationItemService } from './decoration.items';
import { EmployeeService } from './employee.service';
import { ClientsService } from './clients.service';
import { ChallanService } from './challan.service';
import { ClientItemPriceService } from './client.item.service';
import { InvoiceService } from './invoice.service';
import { GalleryService } from './gallery.service';
@NgModule({
  providers: [
    AuthGuard,
    CommonURL,
    BroadcastSubject,
    PostService,
    UserService,
    ToastService,
    EmployeeService,
    DecorationItemService,
    ClientsService,
    ChallanService,
    ClientItemPriceService,
    InvoiceService,
    GalleryService,
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class ServiceModule {

}
