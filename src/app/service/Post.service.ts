import { Observable } from 'rxjs';
import { Post } from './../models/Post';
import { Api } from './Api';
import { HttpClient } from '@angular/common/http';
import { Injectable, Input, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService{

  constructor(private http : HttpClient) { }

  deletePost(id: number) {
    return this.http.delete( Api.URL + '/posts/' + id);
  }

  savePost(post : Post): Observable<Post>{
    return this.http.post<Post>(Api.URL + '/posts', post);
  }
}
