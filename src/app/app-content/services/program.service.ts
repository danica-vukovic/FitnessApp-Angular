import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ProgramRequest } from '../../models/program-request';
import { AuthService } from '../../auth/services/auth.service';
import { Program } from '../../models/program';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  private apiUrl = 'http://localhost:8080/programs';

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  public addProgram(programRequest: ProgramRequest): Observable<Program> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAccessToken()}`,
    });

    return this.httpClient.post<Program>(`${this.apiUrl}`, programRequest, { headers });
  }

  getAllPrograms(): Observable<Program[]> {
    return this.httpClient.get<Program[]>(this.apiUrl).pipe(
      tap(data => {
        console.log('Data received from server:', data); 
      }),
      catchError(error => {
        console.error('Error fetching programs:', error);
        return throwError(() => new Error('Error fetching programs'));
      })
    );
  }
  public getComments(id: number): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.apiUrl}/${id}/comments`);
  }

  deleteProgram(programId: number): Observable<void> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService.getAccessToken()}`
    );
    return this.httpClient.delete<void>(`${this.apiUrl}/${programId}`, { headers });
  }

  public getAttributesByProgramId(id: number): Observable<any> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/${id}/attributes`);
  }
}

