import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BookyConfig } from '../booky.config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor(private http: HttpClient) {}

  public getAllBooks(): Observable<any> {
    const url = BookyConfig.getPath() + '/books';

    return this.http.get(url);
  }
  public addNewBook(data: object): Observable<any> {
    const url = BookyConfig.getPath() + '/books/add';

    return this.http.post(url, data);
  }
  public updateBook(data): Observable<any> {
    console.log('datadata', data);
    const url = BookyConfig.getPath() + `/books/${data._id}`;

    return this.http.put(url, data);
  }
  public deleteBook(id: string): Observable<any> {
    const url = BookyConfig.getPath() + `/books/${id}`;

    return this.http.delete(url);
  }
}
