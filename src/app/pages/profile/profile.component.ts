import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, filter, switchMap, tap } from 'rxjs';
import { ControlsOf } from 'src/app/helpers/helper.types';
import { EmailValidator } from 'src/app/layout/signup/signup.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UserInput, UserOutput } from 'src/app/services/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  profile$: Observable<UserOutput>;

  profileForm: FormGroup<ControlsOf<UserInput>> = new FormGroup<
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
    }),
  });

  get displayName() {
    return this.profileForm.get('displayName');
  }
  get displayImageUrl() {
    return this.profileForm.get('displayImageUrl');
  }
  get email() {
    return this.profileForm.get('email');
  }
  get zip() {
    return this.profileForm.get('zip');
  }

  constructor(
    private userService: UserService,
    private loadingService: LoadingService,
    authenticationService: AuthenticationService,
  ) {
    this.profile$ = authenticationService.user$.pipe(
      filter((user) => !!user),
      switchMap((user) => this.userService.get(user!.id)),
      tap((user) => {
        this.loadingService.changeLoadingVisible.next(false);
        this.profileForm.patchValue(user);
        this.profileForm
          .get('email')
          ?.addAsyncValidators([
            EmailValidator.createValidator(this.userService, user.email),
          ]);
      }),
    );
  }

  ngOnInit(): void {
    this.loadingService.changeLoadingVisible.next(true);
  }

  onSubmit(): void {
    const id = this.profileForm.get('id')?.value;
    if (!id) return;

    this.loadingService.changeLoadingVisible.next(true);
    this.userService
      .update(id, this.profileForm.getRawValue())
      .subscribe((response) => {
        this.loadingService.changeLoadingVisible.next(false);
        this.profileForm.markAsPristine();
        this.profileForm.get('email')?.clearAsyncValidators();
        this.profileForm
          .get('email')
          ?.addAsyncValidators([
            EmailValidator.createValidator(this.userService, response.email),
          ]);
      });
  }
}
