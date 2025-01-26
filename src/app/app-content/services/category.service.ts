import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../models/category';
import { Attribute } from '../../models/attribute';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8080/categories';

  constructor(private httpClient: HttpClient) {}

  public getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.apiUrl);
  }
  public getAttributesByCategoryId(categoryId: number): Observable<Attribute[]> {
    return this.httpClient.get<Attribute[]>(
      `${this.apiUrl}/${categoryId}/attributes`
    );
  }
}
