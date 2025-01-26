import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageRequest } from '../../models/message';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private apiUrl = 'http://localhost:8080/messages'; 

  constructor(private http: HttpClient, private authService: AuthService) { }

  getMessagesBetweenUsers(userId: number, receiverId: number): Observable<any[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService.getAccessToken()}`
    );
    return this.http.get<any[]>(`${this.apiUrl}/${userId}/${receiverId}`, { headers });
}

  sendMessage(message: MessageRequest): Observable<void> {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.authService.getAccessToken()}`
      ),
    };
    return this.http.post<void>(`${this.apiUrl}`, message, header);
  }
}
