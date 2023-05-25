import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  constructor(private http: HttpClient) {}

  getCandidatesForDistrict(district: number): Observable<any> {
    const apiUrl = `your-api-endpoint?district=${district}`;
    return this.http.get(apiUrl);
  }
}
