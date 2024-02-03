import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CharacterInput, CharacterOutput } from './models/character.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  baseUrl = environment.baseUrl + '/character';
  constructor(private http: HttpClient) {}

  create(character: CharacterInput): Observable<CharacterOutput> {
    return this.http.post<CharacterOutput>(this.baseUrl, character);
  }

  update(id: string, character: CharacterInput): Observable<CharacterOutput> {
    return this.http.put<CharacterOutput>(this.baseUrl + '/' + id, character);
  }

  get(id: string): Observable<CharacterOutput> {
    return this.http.get<CharacterOutput>(this.baseUrl + '/' + id);
  }

  delete(id: string): void {
    this.http.delete(this.baseUrl + '/' + id);
  }
}
