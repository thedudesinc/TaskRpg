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
import { CharacterOutput } from 'src/app/services/models/character.model';

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

  @Input()
  isSidebarVisible = false;

  constructor(
    private characterService: CharacterService,
    private authenticationService: AuthenticationService,
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
        console.log(this.currentCharacter);
      });
  }
}
