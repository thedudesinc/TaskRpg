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
  // public changeCharacter: BehaviorSubject<CharacterOutput[]> =
  //   new BehaviorSubject(this.loadState());
  // public character$: Observable<CharacterOutput[]> =
  //   this.changeCharacter.asObservable();

  baseUrl = environment.baseUrl + '/character';
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
  ) {}

  // loadState(): CharacterOutput[] {
  //   var character: CharacterOutput[] = [];
  //   this.authenticationService.user$
  //     .pipe(
  //       filter((user) => !!user),
  //       switchMap((user) => this.getCharacterByUserId(user!.id)),
  //     )
  //     .subscribe((response) => {
  //       character = response;
  //     });
  //   return character;
  // }

  create(character: CharacterInput): Observable<CharacterOutput> {
    return this.http.post<CharacterOutput>(this.baseUrl, character);
  }

  update(id: string, character: CharacterInput): Observable<CharacterOutput> {
    return this.http.put<CharacterOutput>(this.baseUrl + '/' + id, character);
  }

  getCharacter(id: string): Observable<CharacterOutput> {
    return this.http.get<CharacterOutput>(this.baseUrl + '/' + id);
  }

  getCharacterByUserId(userId: string): Observable<CharacterOutput[]> {
    return this.http.get<CharacterOutput[]>(
      this.baseUrl + '/getByUserId/' + userId,
    );
  }

  delete(id: string): void {
    this.http.delete(this.baseUrl + '/' + id);
  }
}
