import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ControlsOf } from 'src/app/helpers/helper.types';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {
  QuestFormInput,
  QuestInput,
} from 'src/app/services/models/quest.model';
import { QuestService } from 'src/app/services/quest.service';

@Component({
  selector: 'app-quest-modal',
  templateUrl: './quest-modal.component.html',
  styleUrls: ['./quest-modal.component.scss'],
})
export class QuestModalComponent {
  faXMark = faXmark;

  @Input()
  isQuestModalVisible = false;

  @Output()
  closeEventEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  onCreateEventEmitter: EventEmitter<QuestFormInput> =
    new EventEmitter<QuestFormInput>();

  questForm: FormGroup<ControlsOf<QuestFormInput>> = new FormGroup<
    ControlsOf<QuestFormInput>
  >({
    userId: new FormControl('', {
      nonNullable: false,
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.maxLength(200)],
    }),
    difficulty: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    time: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    avoidance: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  get title() {
    return this.questForm.get('title');
  }

  get difficulty() {
    return this.questForm.get('difficulty');
  }

  get time() {
    return this.questForm.get('time');
  }

  get avoidance() {
    return this.questForm.get('avoidance');
  }

  constructor(
    private questService: QuestService,
    private authenticationService: AuthenticationService,
  ) {}

  onQuestCreate(): void {
    this.onCreateEventEmitter.emit(this.questForm.getRawValue());
    this.questForm.reset();
  }

  onClose(): void {
    this.closeEventEmitter.emit();
  }
}
