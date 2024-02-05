import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { QuestInput, QuestOutput } from './models/quest.model';
import { Observable, filter, switchMap } from 'rxjs';
import { QuestTileComponent } from '../pages/quest-dashboard/components/quest-tile/quest-tile.component';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class QuestService {
  baseUrl = environment.baseUrl + '/quest';
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
  ) {}

  create(quest: QuestInput): Observable<QuestOutput> {
    return this.http.post<QuestOutput>(this.baseUrl, quest);
  }

  update(id: string, quest: QuestInput): Observable<QuestOutput> {
    return this.http.put<QuestOutput>(this.baseUrl + '/' + id, quest);
  }

  get(id: string): Observable<QuestOutput> {
    return this.http.get<QuestOutput>(this.baseUrl + '/' + id);
  }

  getQuestByUserId(): Observable<QuestOutput[]> {
    return this.http.get<QuestOutput[]>(this.baseUrl + '/getByUserId');
  }

  delete(id: string): void {
    this.http.delete(this.baseUrl + '/' + id);
  }
}
