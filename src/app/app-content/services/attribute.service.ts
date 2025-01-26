import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AttributeValue } from '../../models/attributes-value';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  private apiUrl = 'http://localhost:8080/attributes';

  constructor(private httpClient: HttpClient) {}

  public getValuesByAttributeId(attributeId: number) : Observable<AttributeValue[]>{
    return this.httpClient.get<AttributeValue[]>(
      `${this.apiUrl}/${attributeId}/values`
    );
  }
}
