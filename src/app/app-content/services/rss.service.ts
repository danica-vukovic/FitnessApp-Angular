import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RssService {

  private rssFeedUrl = '/feed/AceFitFacts';

  constructor(private http: HttpClient) { }


  getRssFeed(): Observable<any> {
    const options = {
      responseType: 'text' as 'text',
      headers: new HttpHeaders({
        'Accept': 'application/rss+xml',
      }),
    };
    return this.http.get(this.rssFeedUrl, options);
  }
}
