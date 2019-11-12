import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Post } from '../models/Post';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()
export class PostService {
  postsUrl: string = 'https://jsonplaceholder.typicode.com/posts'
  
  constructor(private http: HttpClient) { }

  getPosts() : Observable<Post[]> {
    console.log('Getting posts from URL..');
    return this.http.get<Post[]>(this.postsUrl);
  }

  savePost(post: Post): Observable<Post> {
    console.log('Displaying posts..')
    return this.http.post<Post>(this.postsUrl, post, httpOptions);
  }

  updatePost(post: Post) :Observable<Post> {
    console.log('Postservice updatePost');
    const url = `${this.postsUrl}/${post.id}`;
    return this.http.put<Post>(url, post, httpOptions);
  }

  getPost(id: number) :Observable<Post> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.get<Post>(url);
  }

  removePost(post: Post | number): Observable<Post> {
    const id = typeof post === 'number' ? post : post.id;
    const url = `${this.postsUrl}/${id}`;
    return this.http.delete<Post>(url, httpOptions);
  }
}
