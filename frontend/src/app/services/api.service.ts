import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article';
import { Comment } from '../models/comment';
import { Engagement } from '../models/engagement';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = '/api/v1';

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/articles`);
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/articles/${id}`);
  }

  createArticle(data: { title: string; body: string; author_name: string }): Observable<Article> {
    return this.http.post<Article>(`${this.baseUrl}/articles`, data);
  }

  createComment(articleId: number, data: { body: string; author_name: string }): Observable<Comment> {
    return this.http.post<Comment>(`${this.baseUrl}/articles/${articleId}/comments`, data);
  }

  getEngagement(): Observable<Engagement> {
    return this.http.get<Engagement>(`${this.baseUrl}/engagement`);
  }
}
