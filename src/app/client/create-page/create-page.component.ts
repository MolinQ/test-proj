import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PostService} from "../../shared/services/post.service";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {


  createForm:FormGroup = new FormGroup({
    date: new FormControl('',Validators.required),
    hours: new FormControl('',Validators.required),
    message: new FormControl('', Validators.required),
    done: new FormControl(false)
  })
  public date: Date;


  constructor(
    private postService:PostService,
    private router: Router,
  ) { }
  ngOnInit() {}

      FormatInForm() {
    //  time

      const timeString = this.createForm.value.hours
      const timeParts = timeString.split(':')

      this.createForm.value.hours = (+timeParts[0] * 60) + +timeParts[1]
    }

    submit() {
    this.FormatInForm()
      this.postService.createPost(this.createForm.value).subscribe(
       (response) => {
         this.router.navigate(['/client','list'])
       },
       error => {
        alert(error.error.message)
       }
     )

  }
}
