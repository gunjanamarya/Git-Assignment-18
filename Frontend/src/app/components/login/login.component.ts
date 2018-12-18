import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User.model';
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, CookieService]
})
export class LoginComponent implements OnInit {

  private user: User;
  private loginForm: FormGroup;
  public error: string;

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private cookieService: CookieService) {
    this.createForm();
  }

  ngOnInit() {
    this.loginService.clearSession();
    this.cookieService.delete('connect.sid', 'http://localhost:4200');
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onSubmit() {

    this.user = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    }

    this.loginService.login(this.user).subscribe(result => {
      this.error = null;
      this.loginService.setSessionStorageVar('username', result.username);
      this.router.navigate(['dashboard']);
    }, error => {
      this.error = "Invalid Username or Password !!"
      console.log('Authentication failed')
    })
  }

}