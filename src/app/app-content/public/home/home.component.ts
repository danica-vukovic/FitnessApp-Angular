import { Component, OnInit } from '@angular/core';
import { RssService } from '../../services/rss.service';
import { parseString } from 'xml2js';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  facts: any[] = [];
  isAuthenticated: boolean = false;

  constructor(private rssService: RssService, private authService:  AuthService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.loadFacts();
    console.log(new Date().toLocaleDateString());
  }

  private loadFacts(): void {
    this.rssService.getRssFeed().subscribe(
      async (data: any) => {
        this.facts = await this.parseXml(data);
      },
      (error: any) => {
        console.error('Error consuming RSS feed:', error);
      }
    );
  }
  private parseXml(data: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      parseString(data, { explicitArray: false }, (err, result) => {
        if (err) {
          console.error('Error parsing XML:', err);
          reject(err);
          return;
        }
  
        const items = result?.rss?.channel?.item || [];
        const parsedItems = items.map((item: any) => ({
          title: item.title,        
          link: item.link,           
          description: item.description, 
        }));

        resolve(parsedItems);
      });
    });
  }
}
