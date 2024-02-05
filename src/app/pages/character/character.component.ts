import { Component } from '@angular/core';
import { Observable, catchError, filter, switchMap, throwError } from 'rxjs';
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
export class CharacterComponent {
  isCreationVisible = false;

  character$: Observable<CharacterOutput> = this.characterService
    .getCharacterByUserId()
    .pipe(
      catchError((error) => {
        console.error(error);
        this.isCreationVisible = true;
        throw error;
      }),
    );

  constructor(
    private characterService: CharacterService,
    private authenticationService: AuthenticationService,
    private loadingService: LoadingService,
  ) {}

  onCreationEvent(formData: CharacterInput): void {
    this.loadingService.changeLoadingVisible.next(true);
    this.authenticationService.user$
      .pipe(
        filter((user) => !!user),
        switchMap((user) =>
          this.characterService.create({
            ...formData,
            userId: user!.id,
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
