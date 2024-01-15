import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  isSignupModalVisible = false;
  isLoginModalVisible = false;

  openSignupModal() {
    this.isSignupModalVisible = true;
  }

  closeSignupModal() {
    this.isSignupModalVisible = false;
  }

  openLoginModal() {
    this.isLoginModalVisible = true;
  }

  closeLoginModal() {
    this.isLoginModalVisible = false;
  }

}
