import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit, OnDestroy {

  form: FormGroup

  aSub: Subscription

  constructor(
    private auth: AuthService,
    private router:Router
  )
  {}

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl('',[
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ])
    })
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
    }

  submit() {
   this.aSub = this.auth.register(this.form.value).subscribe(
      () => {
        this.router.navigate(['/login'],{
          queryParams:{
            registered:true
          }
        })
      },
      error => {
      alert(error.error.message)
      }
    )

  }

}


