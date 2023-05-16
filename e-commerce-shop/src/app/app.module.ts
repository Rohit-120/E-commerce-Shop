import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { BreadcrumbComponent } from './layout/breadcrumb/breadcrumb.component';
import { FullComponent } from './layout/full/full.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import {  DragScrollModule } from 'ngx-drag-scroll';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    FooterComponent,
    BreadcrumbComponent,
    FullComponent,
    NavbarComponent,
    TopbarComponent,
    NotFoundComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxUsefulSwiperModule,
    DragScrollModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
