import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, switchMap } from 'rxjs';
import { ControlsOf } from 'src/app/helpers/helper.types';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CharacterService } from 'src/app/services/character.service';
import { LoadingService } from 'src/app/services/loading.service';
import { CharacterInput } from 'src/app/services/models/character.model';

@Component({
  selector: 'app-creation-modal',
  templateUrl: './creation-modal.component.html',
  styleUrls: ['./creation-modal.component.scss'],
})
export class CreationModalComponent {
  @Input()
  isCreationModalVisible = false;

  @Output()
  closeEventEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  creationEventEmitter: EventEmitter<CharacterInput> =
    new EventEmitter<CharacterInput>();

  characterForm: FormGroup<ControlsOf<CharacterInput>> = new FormGroup<
    ControlsOf<CharacterInput>
  >({
    userId: new FormControl('', {
      nonNullable: false,
    }),
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ],
    }),
    level: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    xp: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    gold: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  get name() {
    return this.characterForm.get('Name');
  }

  constructor(
    private characterService: CharacterService,
    private loadingService: LoadingService,
    private authenticationService: AuthenticationService,
  ) {}

  onCharacterCreate(): void {
    this.creationEventEmitter.emit(this.characterForm.getRawValue());
  }
}
