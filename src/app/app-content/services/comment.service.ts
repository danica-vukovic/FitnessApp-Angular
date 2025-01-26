import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { CommentRequest } from '../../models/comment-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = 'http://localhost:8080/comments';

  constructor(
    private httpClient: HttpClient,
    private loginService: AuthService
  ) {}

  public addComment(commentRequest: CommentRequest): Observable<any> {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.loginService.getAccessToken()}`
      ),
    };
    return this.httpClient.post(`${this.apiUrl}`, commentRequest, header);
  }
}
