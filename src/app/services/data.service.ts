import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataUrl = '/data.json';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.dataUrl).pipe(
      catchError(error => {
        console.error('Error loading data:', error);
        return of({});
      })
    );
  }
}