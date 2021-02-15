import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Album } from './album';
import { Observable } from 'rxjs';

interface addCallbackType { (msg: string): void };

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private uri = 'http://localhost:3000';
  private requestOptions;

  constructor(private http: HttpClient) { 
    let headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };

    this.requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
  }


  addAlbum(album: Album, success?: addCallbackType, error?: addCallbackType) {

    let data = JSON.stringify(album);
    this.http.post(`${this.uri}/addalbum`, data, this.requestOptions).subscribe(
      (res) => {
        const msg = 'add album Done';
        console.log(msg);
        success(msg);
      },
      (err) => {
        const msg = 'add album Error';
        console.log(msg);
        error(msg);
      }
    );
    
  }

  getGreatestAlbum(): Observable<Album> {
    return this.http.get<Album>(`${this.uri}/greatestAlbum`);
  }

  getAlbumList(artistName: string): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.uri}/albumList/${artistName}`);
  }

}