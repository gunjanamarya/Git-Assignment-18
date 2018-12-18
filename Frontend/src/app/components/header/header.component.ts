import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [LoginService]
})
export class HeaderComponent implements OnInit {

  private user: string;
  private status: any;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.user = this.loginService.getSessionStorageVar('username')
  }

  onLogout() {
    this.loginService.logout().subscribe(data => {
      this.status = data;
      if (!this.status) {
        this.router.navigate(['']);
      }
    }, error => {
      console.log('Error while logging out !!')
    })
  }

}
