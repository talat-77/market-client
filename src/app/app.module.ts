import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { LayoutModule } from './admin/layout/layout.module';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule, provideHttpClient} from '@angular/common/http';
import { withFetch } from '@angular/common/http';
import { UpdateDialogComponent } from './shared/update-dialog/update-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AuthInterceptor } from './Interceptors/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    UpdateDialogComponent,
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
  NgxSpinnerModule,
  HttpClientModule,
  ReactiveFormsModule,
  MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  
  

  
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    {provide:"baseUrl", useValue:"https://localhost:7145/api",multi:false},
    {provide:"HTTP_INTERCEPTORS",useClass:AuthInterceptor,multi:true},
    provideHttpClient(withFetch())
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
