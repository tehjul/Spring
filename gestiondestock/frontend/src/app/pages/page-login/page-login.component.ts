import {Component} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {AuthenticationRequest} from "../../../gs-api/src/models/authentication-request";
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent {

  authenticationRequest: AuthenticationRequest = {};
  errorMessage = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  login(): void {
    console.log(this.authenticationRequest);
    this.userService.login(this.authenticationRequest).subscribe((data) => {
      this.userService.setConnectedUser(data);
      this.router.navigate(['']);
    }, error => {
      this.errorMessage = 'Login et/ou mot de passe incorrect';
    });
  }

}
