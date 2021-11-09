import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { NavAuthComponent } from './components/nav-auth/nav-auth.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { PasswordForgotComponent } from './components/password-forgot/password-forgot.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { UsersComponent } from './components/users/users.component';
import { ScenarioComponent } from './components/scenario/scenario.component';
import { ScenarioFormComponent } from './components/scenario-form/scenario-form.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarUserComponent } from './components/calendar-user/calendar-user.component';
import { ReservaEscenarioComponent } from './components/reserva-escenario/reserva-escenario.component';
import localeEs from '@angular/common/locales/es';
import { LoadingComponent } from './components/loading/loading.component';
import { ImplementComponent } from './components/implement/implement.component';
import { ImplementFormComponent } from './components/implement-form/implement-form.component';
import { PrestamosComponent } from './components/prestamos/prestamos.component';
import { PrestamoImplementoComponent } from './components/prestamo-implemento/prestamo-implemento.component';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    NavAuthComponent,
    RegisterComponent,
    HomeComponent,
    VerifyEmailComponent,
    PasswordForgotComponent,
    PasswordResetComponent,
    UsersComponent,
    ScenarioComponent,
    ScenarioFormComponent,
    ReservasComponent,
    CalendarUserComponent,
    ReservaEscenarioComponent,
    LoadingComponent,
    ImplementComponent,
    ImplementFormComponent,
    PrestamosComponent,
    PrestamoImplementoComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  exports: [
    LoginComponent
  ],
  providers: [AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
