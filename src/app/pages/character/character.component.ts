import { Component, OnInit } from '@angular/core';
import { filter, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CharacterService } from 'src/app/services/character.service';
import { LoadingService } from 'src/app/services/loading.service';
import {
  CharacterInput,
  CharacterOutput,
} from 'src/app/services/models/character.model';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit {
  isCreationVisible = false;

  constructor(
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
        if (response.length == 0) {
          this.isCreationVisible = true;
        }
      });
  }

  onCreationEvent(formData: CharacterInput): void {
    this.loadingService.changeLoadingVisible.next(true);
    this.authenticationService.user$
      .pipe(
        filter((user) => !!user),
        switchMap((user) =>
          this.characterService.create({
            ...formData,
            UserId: user!.id,
          }),
        ),
      )
      .subscribe((response) => {
        this.loadingService.changeLoadingVisible.next(false);
        this.closeCreationModal();
      });
  }

  openCreationModal(): void {
    this.isCreationVisible = true;
  }

  closeCreationModal(): void {
    this.isCreationVisible = false;
  }
}
