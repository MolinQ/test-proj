import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup;

  aSub: Subscription;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
  ) { }

  ngOnInit() {


    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.route.queryParams.subscribe((param: Params) => {
      if (param.registered) {
      //  авторизация прошла успешно
      } else
      if (param.accessDenied) {
        // нужно авторизоваться
      }
    });
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  submit() {
    this.aSub = this.auth.logIn(this.form.value).subscribe(
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

