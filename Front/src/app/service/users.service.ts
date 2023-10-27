import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth, CreateUser, GetMyPost } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) { }

  createUser(body: CreateUser): Observable<any> {
    return this.http.post<any>(`${environment.url}/users/create-user`, body, {})
  }

  auth(body: Auth): Observable<any> {
    return this.http.post<any>(`${environment.url}/users/auth`, body, {})
  }
}
