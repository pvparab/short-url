import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, declarations } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceModule } from './services/service.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgxPrintModule } from 'ngx-print';
import { EditableModule } from './_shared/components/editable/editable.module';
import { ImageUploadModule } from './_shared/components/image-upload/image-upload.module';
import { ClipboardModule } from 'ngx-clipboard';
import { LightboxModule } from 'ngx-lightbox';

@NgModule({
  declarations: declarations,
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-full-width',
      preventDuplicates: true,
    }),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AutocompleteLibModule,
    NgxPrintModule,
    ImageUploadModule,
    EditableModule,
    LightboxModule,
    ClipboardModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
