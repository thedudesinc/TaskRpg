import { Component, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  faBarsProgress,
  faCoins,
  faSignature,
  faUpLong,
} from '@fortawesome/free-solid-svg-icons';
import { Observable, catchError, filter, startWith, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CharacterService } from 'src/app/services/character.service';
import { QuestTag } from 'src/app/services/enums/quest-tag.enum';
import { LoadingService } from 'src/app/services/loading.service';
import { CharacterOutput } from 'src/app/services/models/character.model';
import {
  QuestFormInput,
  QuestInput,
  QuestOutput,
} from 'src/app/services/models/quest.model';
import { LoginResponse } from 'src/app/services/models/user.model';
import { QuestService } from 'src/app/services/quest.service';

@Component({
  selector: 'app-quest-dashboard',
  templateUrl: './quest-dashboard.component.html',
  styleUrls: ['./quest-dashboard.component.scss'],
})
export class QuestDashboardComponent {
  faSignature = faSignature;
  faCoins = faCoins;
  faBarsProgress = faBarsProgress;
  faUpLong = faUpLong;
  currentCharacter?: CharacterOutput;
  isQuestModalVisible = false;
  questTag = QuestTag;

  questReloader: EventEmitter<boolean> = new EventEmitter();

  quests$: Observable<QuestOutput[]> = this.questReloader.pipe(
    startWith(true),
    switchMap(() => this.questService.getQuestByUserId()),
  );
  character$: Observable<CharacterOutput> = this.characterService
    .getCharacterByUserId()
    .pipe(
      catchError((error) => {
        console.error(error);
        this.router.navigate(['pages/character']);
        throw error;
      }),
    );

  @Input()
  isSidebarVisible = false;

  constructor(
    private questService: QuestService,
    private router: Router,
    private characterService: CharacterService,
    private authenticationService: AuthenticationService,
    private loadingService: LoadingService,
  ) {}

  processFormData(formData: QuestFormInput): QuestInput {
    var challengeLevel: number =
      (formData.difficulty + formData.time + formData.avoidance) / 300;
    var calculatedGold: number = Math.trunc(challengeLevel * 100);
    var calculatedXp: number = Math.trunc(challengeLevel * 250);

    return {
      userId: '',
      title: formData.title,
      description: formData.description,
      tag: QuestTag.Available,
      gold: calculatedGold,
      xp: calculatedXp,
    };
  }

  onSubmit(formData: QuestFormInput): void {
    this.loadingService.changeLoadingVisible.next(true);
    this.authenticationService.user$
      .pipe(
        filter((user) => !!user),
        switchMap((user) =>
          this.questService.create({
            ...this.processFormData(formData),
            userId: user!.id,
          }),
        ),
      )
      .subscribe((response) => {
        this.questReloader.emit(true);
        this.loadingService.changeLoadingVisible.next(false);
        this.closeQuestModal();
      });
  }

  getQuestsByTag(tag: QuestTag, quests: QuestOutput[]): QuestOutput[] {
    return quests.filter((q) => q.tag === tag);
  }

  openQuestModal(): void {
    this.isQuestModalVisible = true;
  }

  closeQuestModal(): void {
    this.isQuestModalVisible = false;
  }
}
