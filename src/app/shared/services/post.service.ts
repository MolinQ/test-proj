import { Injectable } from '@angular/core';
import { Post } from '../interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn:'root',
})
export class PostService {
  public CurrentPost:any;

  public isClientEdit:boolean = false;

  public isAdminEdit:boolean = false;

  constructor(private http:HttpClient) {}



  getPost() {
    return this.http.get('http://localhost:3000/api/track');
  }

  createPost(post):Observable<Post> {
    return this.http.post<Post>('http://localhost:3000/api/track', post);
  }

  getCurrentPost() {
    return this.http.get('http://localhost:3000/api/track');
  }

  updatePost(id, post) {
    return this.http.patch(`http://localhost:3000/api/track/${id}`, post);
  }

  deletePost(id) {
    return this.http.delete(`http://localhost:3000/api/track/${id}`);
  }

  getUsers() {
    return this.http.get('http://localhost:3000/api/users');
  }

  getAdminPost(userId) {
    return this.http.get(`http://localhost:3000/api/track/${userId}`);
  }
}
