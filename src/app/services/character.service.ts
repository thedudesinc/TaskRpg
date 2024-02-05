import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CharacterInput, CharacterOutput } from './models/character.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  baseUrl = environment.baseUrl + '/character';
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
  ) {}

  create(character: CharacterInput): Observable<CharacterOutput> {
    return this.http.post<CharacterOutput>(this.baseUrl, character);
  }

  update(id: string, character: CharacterInput): Observable<CharacterOutput> {
    return this.http.put<CharacterOutput>(this.baseUrl + '/' + id, character);
  }

  getCharacter(id: string): Observable<CharacterOutput> {
    return this.http.get<CharacterOutput>(this.baseUrl + '/' + id);
  }

  getCharacterByUserId(): Observable<CharacterOutput> {
    return this.http.get<CharacterOutput>(this.baseUrl + '/getByUserId');
  }

  delete(id: string): void {
    this.http.delete(this.baseUrl + '/' + id);
  }
}
