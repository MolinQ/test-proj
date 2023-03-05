import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    const userToken = localStorage.getItem('auth-token');
    const userName = localStorage.getItem('user-name');
    if (userToken !== null || userName !== '') {
      this.auth.setToken(userToken);
      this.auth.setNameToken(userName);
    }
  }
}

