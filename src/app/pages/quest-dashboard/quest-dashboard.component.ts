import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {
  faBarsProgress,
  faCoins,
  faSign,
  faSignature,
  faUpLong,
} from '@fortawesome/free-solid-svg-icons';
import { filter, switchMap, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CharacterService } from 'src/app/services/character.service';
import { LoadingService } from 'src/app/services/loading.service';
import { CharacterOutput } from 'src/app/services/models/character.model';
import {
  QuestFormInput,
  QuestInput,
} from 'src/app/services/models/quest.model';
import { QuestService } from 'src/app/services/quest.service';

@Component({
  selector: 'app-quest-dashboard',
  templateUrl: './quest-dashboard.component.html',
  styleUrls: ['./quest-dashboard.component.scss'],
})
export class QuestDashboardComponent implements OnInit {
  faSignature = faSignature;
  faCoins = faCoins;
  faBarsProgress = faBarsProgress;
  faUpLong = faUpLong;
  currentCharacter?: CharacterOutput;
  isQuestModalVisible = false;

  @Input()
  isSidebarVisible = false;

  constructor(
    private questService: QuestService,
    private characterService: CharacterService,
    private authenticationService: AuthenticationService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.authenticationService.user$
      .pipe(
        filter((user) => !!user),
        switchMap((user) =>
          this.characterService.getCharacterByUserId(user!.id),
        ),
      )
      .subscribe((response) => {
        this.currentCharacter = response[0];
      });
  }

  processFormData(formData: QuestFormInput): QuestInput {
    var challengeLevel: number =
      (formData.difficulty + formData.time + formData.avoidance) / 300;
    var calculatedGold: number = Math.trunc(challengeLevel * 1000);
    var calculatedXp: number = Math.trunc(challengeLevel * 2500);
    console.log(calculatedGold, calculatedXp);
    return {
      userId: '',
      description: formData.description,
      title: formData.title,
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
        this.loadingService.changeLoadingVisible.next(false);
        this.closeQuestModal();
      });
  }

  openQuestModal(): void {
    this.isQuestModalVisible = true;
  }

  closeQuestModal(): void {
    this.isQuestModalVisible = false;
  }
}
