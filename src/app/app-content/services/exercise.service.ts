import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Exercise {
  name: string;
  instructions: string;
  difficulty: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private apiUrl = 'https://api.api-ninjas.com/v1/exercises'; 
  private apiKey = '7zyO3A2TdTjCHnCP1dt/EQ==IqzQaRTxEkyXh4kO'; 

  constructor(private http: HttpClient) { }

  getDailyExercises(): Observable<any> {
    const headers = new HttpHeaders({
      'X-Api-Key': this.apiKey 
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }
}
