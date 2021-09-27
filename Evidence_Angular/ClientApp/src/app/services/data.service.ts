import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImagePathResponse } from '../models/image-path-response';
import { Player } from '../models/player';
import { Sport } from '../models/sport';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  getSports(): Observable<Sport[]> {
    return this.http.get<Sport[]>("http://localhost:64863/api/Sports");
  }
  getSportById(id: number): Observable<Sport> {
    return this.http.get<Sport>(`http://localhost:64863/api/Sports/${id}`);
  }
  postSport(data: Sport): Observable<Sport> {
    return this.http.post<Sport>('http://localhost:64863/api/Sports', data);
  }
  putSport(data: Sport): Observable<any> {
    return this.http.put<Sport>(`http://localhost:64863/api/Sports/${data.sportId}`, data);
  }
  deleteSport(id: number): Observable<Sport> {
    return this.http.delete<Sport>(`http://localhost:64863/api/Sports/${id}`);
  }
  getPlayes(): Observable<Player[]> {
    return this.http.get<Player[]>("http://localhost:64863/api/Players");
  }
  getPlayerById(id: number): Observable<Player> {
    return this.http.get<Player>(`http://localhost:64863/api/Players/${id}`);
  }
  postPlayer(data: Player): Observable<Player> {
    return this.http.post<Player>('http://localhost:64863/api/Players', data);
  }
  putPlayer(data: Player): Observable<any> {
    return this.http.put<Player>(`http://localhost:64863/api/Players/${data.playerId}`, data);
  }
  deletePlayer(id: number): Observable<Player> {
    return this.http.delete<Player>(`http://localhost:64863/api/Players/${id}`);
  }
  upload(id: number, f: File): Observable<ImagePathResponse> {
    const formData = new FormData();
    formData.append('file', f);
    return this.http.post<ImagePathResponse>(`http://localhost:64863/api/Players/Uploads/${id}`, formData);
  }
}
