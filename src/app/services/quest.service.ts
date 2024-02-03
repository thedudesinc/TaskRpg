import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { QuestInput, QuestOutput } from './models/quest.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestService {
  baseUrl = environment.baseUrl + '/quest';
  constructor(private http: HttpClient) {}

  create(quest: QuestInput): Observable<QuestOutput> {
    return this.http.post<QuestOutput>(this.baseUrl, quest);
  }

  update(id: string, quest: QuestInput): Observable<QuestOutput> {
    return this.http.put<QuestOutput>(this.baseUrl + '/' + id, quest);
  }

  get(id: string): Observable<QuestOutput> {
    return this.http.get<QuestOutput>(this.baseUrl + '/' + id);
  }

  delete(id: string): void {
    this.http.delete(this.baseUrl + '/' + id);
  }
}
