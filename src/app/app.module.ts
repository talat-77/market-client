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


@NgModule({
  declarations: [
    AppComponent,
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
  NgxSpinnerModule,
  HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    {provide:"baseUrl", useValue:"https://localhost:7145/api",multi:false},
    provideHttpClient(withFetch())
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
