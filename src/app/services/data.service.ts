import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tr } from 'date-fns/locale';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private URL = 'http://reservas.poli/api/';
  role: string;
  constructor(private http:HttpClient) {}

  //Users
  login(user) {
    return this.http.post<any>(`${this.URL}login`,user);
  }

  register(user) {
    return this.http.post<any>(`${this.URL}register`,user);
  }

  resendVerifyEmail(user) {
    return this.http.post<any>(`${this.URL}resend-verify`,user);
  }

  forgot(email){
    return this.http.post<any>(`${this.URL}password/email`,email);
  }

  reset(body, token) {
    return this.http.post<any>(`${this.URL}password/reset?token=${token}`,body);
  }

  loggedIn(): Boolean {
    return !!localStorage.getItem('token');
  }
  
  isAdmin(): Boolean {
    if(localStorage.getItem('role') ==='Admin'){
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRole() {
    return localStorage.getItem('role');
  }

  listUsers() {
    return this.http.get<any>(`${this.URL}users/all`);
  }

  logout() {
    return this.http.get<any>(`${this.URL}logout`);
  }

  changeStatus(body) {
    return this.http.put<any>(`${this.URL}users/active`,body);
  }

  //Escenarios

  listScenarios() {
    return this.http.get<any>(`${this.URL}escenarios`);
  }

  addScenario(scenario) {
    return this.http.post<any>(`${this.URL}escenarios/add`,scenario);
  }

  updateScenario(id,scenario) {
    return this.http.put<any>(`${this.URL}escenarios/${id}`,scenario);
  }

  deleteScenario(id) {
    return this.http.delete<any>(`${this.URL}escenarios/${id}`);
  }

  getScenario(id) {
    return this.http.get<any>(`${this.URL}escenarios/${id}`);
  }

  //Reservas

  listReservations() {
    return this.http.get<any>(`${this.URL}reservas`);
  }

  changeStatusReservation(id,status) {
    return this.http.put<any>(`${this.URL}reservas/estado/${id}`,status);
  }

  getReservation(id) {
    return this.http.get<any>(`${this.URL}reservas/${id}`);
  }

  addReservation(reservation) {
    return this.http.post<any>(`${this.URL}reservas`,reservation);
  }

  listStatusReservations(status) {
    return this.http.get<any>(`${this.URL}reservas/status/${status}`);
  }

  listReservationsDay(today) {
    return this.http.post<any>(`${this.URL}reservas/today`,today);
  }

  listReservationsUser() {
    return this.http.get<any>(`${this.URL}reservas/user`);
  }

  getReservationById(id) {
    return this.http.get<any>(`${this.URL}reservas/get/${id}`);
  }

  //Implementos

  listImplements() {
    return this.http.get<any>(`${this.URL}implementos`);
  }

  getImplement(id) {
    return this.http.get<any>(`${this.URL}implementos/${id}`);
  }

  addImplement(implement) {
    return this.http.post<any>(`${this.URL}implementos/add`,implement);
  }

  updateImplement(id,implemet) {
    return this.http.put<any>(`${this.URL}implementos/${id}`,implemet);
  }

  deleteImplement(id){
    return this.http.delete<any>(`${this.URL}implementos/${id}`);
  }

  //Prestamos

  listLoans() {
    return this.http.get<any>(`${this.URL}prestamos`);
  }

  getLoan(id) {
    return this.http.get<any>(`${this.URL}prestamos/${id}`);
  }
  

  addLoan(loan) {
    return this.http.post<any>(`${this.URL}prestamos`,loan);
  }

  listLoansUser() {
    return this.http.get<any>(`${this.URL}prestamos/user`);
  }

  getLoanUser(id) {
    return this.http.get<any>(`${this.URL}prestamos/user/${id}`);
  }

  listLoansDay(today) {
    return this.http.post<any>(`${this.URL}prestamos/today`,today);
  }

  updateStatus(id,status) {
    return this.http.put<any>(`${this.URL}prestamos/estado/${id}`,status);
  }

  updateStatusImplement(id,body) {
    return this.http.put<any>(`${this.URL}prestamos/estado/implemento/${id}`,body)
  }

  listStatusLoans(status) {
    return this.http.get<any>(`${this.URL}prestamos/status/${status}`);
  }

  getLoanById(id) {
    return this.http.get<any>(`${this.URL}prestamos/get/${id}`);
  }
}
