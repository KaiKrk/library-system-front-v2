import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {NgbCollapseModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {BookComponent} from './book-list/book.component';
import {Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BookFormComponent} from './book-form/book-form.component';
import {BookingFormComponent} from './booking-form/booking-form.component';
import {MemberListComponent} from './member-list/member-list.component';
import {MemberFormComponent} from './member-form/member-form.component';
import {BookingPersonalComponent} from './booking-personal/booking-personal.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BookService} from './services/book.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MemberService} from './services/member.service';
import {BookingService} from './services/booking.service';
import {AuthService} from './services/auth.service';
import {WelcomeComponent} from './welcome/welcome.component';
import { AdminSpaceComponent } from './admin-space/admin-space.component';
import {AuthGuard} from './services/auth-guard.service';
import {JwtInterceptor} from './helpers/jwt.interceptor';

const appRoutes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'bookForm', canActivate: [AuthGuard], component: BookFormComponent},
  {path: 'bookList', canActivate: [AuthGuard], component: BookComponent},
  {path: 'bookingForm/:bookId/:bookName', component: BookingFormComponent},
  {path: 'myBooking', component: BookingPersonalComponent},
  {path: 'memberForm', component: MemberFormComponent},
  {path: 'memberList', canActivate: [AuthGuard], component: MemberListComponent},
  {path: 'authentication', component: AuthenticationComponent},
  {path: 'adminSpace', canActivate: [AuthGuard], component: AdminSpaceComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookFormComponent,
    BookingFormComponent,
    MemberListComponent,
    MemberFormComponent,
    BookingPersonalComponent,
    AuthenticationComponent,
    WelcomeComponent,
    AdminSpaceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}),
    FontAwesomeModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    NgbCollapseModule,
    ReactiveFormsModule,
  ],
  providers: [BookService, MemberService, BookingService, AuthService, AuthGuard,
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {

}
