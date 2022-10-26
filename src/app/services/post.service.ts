import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {Post, Comment} from "../model";

@Injectable({
  providedIn: 'root'
})
export class PostService {


  private readonly apiUrl = environment.postApi

  constructor(private httpClient: HttpClient) {
  }

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.apiUrl}/posts`);
  }

  findPost(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.apiUrl}/posts/${id}`)
  }

  getComments(postId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.apiUrl}/posts/${postId}/comments`);
  }

  addComment(postId: number, name: string, email: string, body: string): Observable<Comment> {
    return this.httpClient.post<Comment>(`${this.apiUrl}/posts/${postId}/comments`, {
      postId: postId,
      name: name,
      email: email,
      body: body
    })
  }
}
