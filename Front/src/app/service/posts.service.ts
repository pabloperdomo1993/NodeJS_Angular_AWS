import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetMyPost } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) { }

  getMyPost(body: GetMyPost): Observable<any> {
    return this.http.post<any>(`${environment.url}/posts/my-posts`, body, {});
  }

  getAllPost(body: any): Observable<any> {
    return this.http.post<any>(`${environment.url}/posts/all-posts`, body, {});
  }

  createPost(body: any): Observable<any> {
    return this.http.post<any>(`${environment.url}/posts/create-post`, body, {});
  }
}
