import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ControlsOf } from 'src/app/helpers/helper.types';
import { LoadingService } from 'src/app/services/loading.service';
import { UserInput } from 'src/app/services/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  @Input()
  isSignupVisible = false;

  @Output()
  closeEventEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  openLoginEventEmitter: EventEmitter<void> = new EventEmitter<void>();

  userForm: FormGroup<ControlsOf<UserInput>> = new FormGroup<
    ControlsOf<UserInput>
  >({
    id: new FormControl('', {
      nonNullable: false,
    }),
    displayName: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
      asyncValidators: [EmailValidator.createValidator(this.userService, '')],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100),
      ],
    }),
  });

  get displayName() {
    return this.userForm.get('displayName');
  }
  get email() {
    return this.userForm.get('email');
  }
  get password() {
    return this.userForm.get('password');
  }

  constructor(
    private userService: UserService,
    private loadingService: LoadingService,
  ) {}

  onClose(): void {
    this.closeEventEmitter.emit();
  }

  onSubmit(): void {
    this.loadingService.changeLoadingVisible.next(true);
    this.userService
      .create(this.userForm.getRawValue())
      .subscribe((response) => {
        this.loadingService.changeLoadingVisible.next(false);
        this.closeEventEmitter.emit();
        this.openLoginEventEmitter.emit();
      });
  }
}

export class EmailValidator {
  static createValidator(
    userService: UserService,
    omittedEmail: string,
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return userService
        .verifyEmail(control.value, omittedEmail)
        .pipe(
          map((result: boolean) =>
            result ? null : { emailAlreadyExists: true },
          ),
        );
    };
  }
}
