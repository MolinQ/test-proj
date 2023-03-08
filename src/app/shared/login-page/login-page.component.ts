import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  submit() {
    this.auth.logIn(this.form.value).subscribe(
      () => {
        this.router.navigate(['/client', 'list']);
        if (this.auth.userName === 'Admin' && this.auth.getToken() !== null) {
          this.router.navigate(['/admin', 'list']);
        }
      },
      () => {
        alert('enter correct username and password');
      },
    );
  }
}
