import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CalendarUserComponent } from './components/calendar-user/calendar-user.component';
import { HomeComponent } from './components/home/home.component';
import { ImplementFormComponent } from './components/implement-form/implement-form.component';
import { LoginComponent } from './components/login/login.component';
import { PasswordForgotComponent } from './components/password-forgot/password-forgot.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { PrestamoImplementoComponent } from './components/prestamo-implemento/prestamo-implemento.component';
import { PrestamosComponent } from './components/prestamos/prestamos.component';
import { RegisterComponent } from './components/register/register.component';
import { ReservaEscenarioComponent } from './components/reserva-escenario/reserva-escenario.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { ScenarioFormComponent } from './components/scenario-form/scenario-form.component';
import { UsersComponent } from './components/users/users.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'verify-email/:message', component: VerifyEmailComponent },
  { path: 'password/email', component: PasswordForgotComponent },
  { path: 'password/reset/:token', component: PasswordResetComponent },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: { role: 'Admin'}},
  { path: 'escenarios', component: ReservaEscenarioComponent , canActivate: [AuthGuard]},
  { path: 'escenarios/crear', component: ScenarioFormComponent, canActivate: [AuthGuard], data: { role: 'Admin'}},
  { path: 'escenarios/editar/:id', component: ScenarioFormComponent, canActivate: [AuthGuard], data: { role: 'Admin'}},
  { path: 'reservas', component: ReservasComponent, canActivate: [AuthGuard], data: { role: 'Admin'}},
  { path: 'mis-reservas', component: ReservasComponent, canActivate: [AuthGuard]},
  { path: 'calendario', component: CalendarUserComponent , canActivate: [AuthGuard]},
  { path: 'implementos', component: PrestamoImplementoComponent, canActivate: [AuthGuard], data:{ role: ['Admin','Profesor']}},
  { path: 'implementos/crear', component: ImplementFormComponent,canActivate:[AuthGuard], data: { role: 'Admin'}},
  { path: 'implementos/editar/:id', component: ImplementFormComponent,canActivate:[AuthGuard], data: { role: 'Admin'}},
  { path: 'prestamos', component: PrestamosComponent, canActivate: [AuthGuard], data: { role: 'Admin'}},
  { path: 'mis-prestamos', component: PrestamosComponent, canActivate: [AuthGuard], data:{ role: 'Profesor'}},
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
