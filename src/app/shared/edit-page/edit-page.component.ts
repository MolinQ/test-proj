import {Component, OnInit,} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {PostService} from "../services/post.service";



@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  editForm = new FormGroup({
  id: new FormControl(""),
  date: new FormControl(""),
  hours: new FormControl("",Validators.required),
  message: new FormControl('', Validators.required),
  done: new FormControl('')
})

  post:any
  newTime:number
  modalActive:boolean = false

  constructor(
    private route: ActivatedRoute,
    private postService:PostService,
    private router: Router,

  ) {}

  formatMinutesToTime(minutes: number):string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    let formattedHours = ''
    let formattedMinutes = ''
    if (hours < 10) {
      formattedHours = `0${hours}`
    } else {
      formattedHours = `${hours}`
    }
    if (mins < 10) {
      formattedMinutes = `0${mins}`
    } else {
      formattedMinutes = `${mins}`
    }
    return `${formattedHours}:${formattedMinutes}`;
  }


  ngOnInit():void {


    this.postService.getCurrentPost().subscribe(
      (response) => {
        console.warn(response)
        this.post = response
        this.editForm = new FormGroup({
          id: new FormControl(this.postService.CurrentPost.id,Validators.required),
          date: new FormControl(this.postService.CurrentPost.date,Validators.required),
          hours: new FormControl(this.formatMinutesToTime(this.postService.CurrentPost.hours), Validators.required),
          message: new FormControl(this.postService.CurrentPost.message, Validators.required),
          done: new FormControl(this.postService.CurrentPost.done)
          })
        }
      )
    }


  FormatInForm() {
    //  time
    const timeString = this.editForm.value.hours
    const timeParts = timeString.split(':')

    this.newTime = ((+timeParts[0] * 60) + +timeParts[1])
  }



    UpdatePost() {
      this.FormatInForm()
      let pushFormPost = {
        id: this.editForm.value.id,
        date: this.editForm.value.date,
        hours: +this.newTime,
        message: this.editForm.value.message,
        done: this.editForm.value.done
      }
      this.postService.updatePost( this.editForm.value.id, pushFormPost).subscribe(
        (response) => {
        }
      )
      this.router.navigate(['/client','list'])
    }

    delete(item) {
    this.postService.deletePost(item).subscribe(
      (response) => {
        console.warn(response)
        this.modalActive = false
      }
    )
      this.router.navigate(['/client','list'])
      }


  modalOn() {
    this.modalActive = true
  }

  modalOff() {
    this.modalActive = false
  }
}

