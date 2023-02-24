import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {AdminService} from "../admin-services/admin.service";
import {PostService} from "../../shared/services/post.service";

@Component({
  selector: 'app-admin-edit-page',
  templateUrl: './admin-edit-page.component.html',
  styleUrls: ['./admin-edit-page.component.scss']
})
export class AdminEditPageComponent implements OnInit {

  newTime:number

  AdminEditForm = new FormGroup({
    id: new FormControl(''),
    date: new FormControl(""),
    hours: new FormControl("",Validators.required),
    message: new FormControl('', Validators.required),
    done: new FormControl('')
  })

  users:any
  modalActive:boolean = false

  constructor(
    private route: ActivatedRoute,
    private postService:PostService,
    private router: Router,
    public AdminService: AdminService

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


  ngOnInit() {
    this.AdminEditForm = new FormGroup({
      id: new FormControl(this.AdminService.selectedPost.id),
      date: new FormControl(this.AdminService.selectedPost.date,Validators.required),
      hours: new FormControl(this.formatMinutesToTime(this.AdminService.selectedPost.hours),Validators.required),
      message: new FormControl(this.AdminService.selectedPost.message, Validators.required),
      done: new FormControl(this.AdminService.selectedPost.done)
    })

  }

  FormatInForm() {
    //  time
    const timeString = this.AdminEditForm.value.hours
    const timeParts = timeString.split(':')


    this.newTime = ((+timeParts[0] * 60) + +timeParts[1])
  }

  UpdatePost() {
   this.FormatInForm()
    let pushFormObj = {
      id: this.AdminEditForm.value.id,
      date: this.AdminEditForm.value.date,
      hours: +this.newTime,
      message: this.AdminEditForm.value.message,
      done: this.AdminEditForm.value.done
    }
     this.postService.updatePost( this.AdminEditForm.value.id, pushFormObj).subscribe(
       (response) => {
         console.warn(response)
       }
     )
     this.router.navigate(['/admin','list'])
  }


  delete(id) {
    this.postService.deletePost(id).subscribe(
      (response) => {
        this.modalActive = false
      }
    )
    this.router.navigate(['/admin','list'])
  }


  modalOn() {
    this.modalActive = true
  }

  modalOff() {
    this.modalActive = false
  }
}

