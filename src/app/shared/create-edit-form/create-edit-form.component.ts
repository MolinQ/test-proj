import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PostService } from '../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../admin/admin-services/admin.service';

@Component({
  selector: 'app-create-edit-form',
  templateUrl: './create-edit-form.component.html',
  styleUrls: ['./create-edit-form.component.scss'],
})
export class CreateEditFormComponent implements OnInit {
  @Input() showEdit: boolean;

  @Input() showCreate: boolean;

  modalActive:boolean = false;

  isNewPost: boolean = false;

  isEditClient: boolean = false;

  isEditAdmin: boolean = false;

  fullTime:any = null;

  post:any;

  Form =  new FormGroup({
    id: new FormControl(''),
    date: new FormControl('', Validators.required),
    hours: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
    done: new FormControl(false),
  });

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private postService:PostService,
    private AdminServices:AdminService,
  ) { }

  formatMinutesToTime(minutes: number):string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    let formattedHours = '';
    let formattedMinutes = '';
    if (hours < 10) {
      formattedHours = `0${hours}`;
    } else {
      formattedHours = `${hours}`;
    }
    if (mins < 10) {
      formattedMinutes = `0${mins}`;
    } else {
      formattedMinutes = `${mins}`;
    }
    return `${formattedHours}:${formattedMinutes}`;
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.keys.length === 0) {
      this.isNewPost = true;
      this.isEditClient = false;
      this.isEditAdmin = false;

      this.Form =  new FormGroup({
        id: new FormControl(''),
        date: new FormControl('', Validators.required),
        hours: new FormControl('', Validators.required),
        message: new FormControl('', Validators.required),
        done: new FormControl(false),
      });
    }

    if (this.postService.isClientEdit) {
      this.isEditClient = true;
      this.postService.getCurrentPost().subscribe(
        (response) => {
          this.post = response;
          this.Form = new FormGroup({
            id: new FormControl(this.postService.CurrentPost.id),
            date: new FormControl(this.postService.CurrentPost.date, Validators.required),
            hours: new FormControl(this.formatMinutesToTime(this.postService.CurrentPost.hours), Validators.required),
            message: new FormControl(this.postService.CurrentPost.message, Validators.required),
            done: new FormControl(this.postService.CurrentPost.done),
          });
        },
      );
    }

    if (this.postService.isAdminEdit) {
      this.isEditAdmin = true;
      this.Form = new FormGroup({
        id: new FormControl(this.AdminServices.selectedPost.id),
        date: new FormControl(this.AdminServices.selectedPost.date, Validators.required),
        hours: new FormControl(this.formatMinutesToTime(this.AdminServices.selectedPost.hours), Validators.required),
        message: new FormControl(this.AdminServices.selectedPost.message, Validators.required),
        done: new FormControl(this.AdminServices.selectedPost.done),
      });
    }

  }

  FormatInForm() {
    //  time
    const timeString = this.Form.value.hours;
    const timeParts = timeString.split(':');

    this.fullTime = (+timeParts[0] * 60) + +timeParts[1];
  }

  submit() {
    this.FormatInForm();
    if (this.isNewPost === true  && this.isEditClient === false && this.isEditAdmin === false) {
      let pushPostForm = {
        date: this.Form.value.date,
        hours: +this.fullTime,
        message: this.Form.value.message,
        done: this.Form.value.done,
      };
      this.postService.createPost(pushPostForm).subscribe(
        () => {
          this.router.navigate(['/client', 'list']);
          this.isNewPost = false;
        },
        error => {
          alert(error.error.message);
        },
      );
    }

    if (this.isNewPost === false  && this.isEditClient === true && this.isEditAdmin === false) {
      let pushClientForm = {
        id: this.Form.value.id,
        date: this.Form.value.date,
        hours: +this.fullTime,
        message: this.Form.value.message,
        done: this.Form.value.done,
      };
      this.postService.updatePost( this.Form.value.id, pushClientForm).subscribe(
        () => {
        },
      );
      this.router.navigate(['/client', 'list']);
      this.isEditClient = false;
      this.postService.isClientEdit = false;
    }
    if (this.isNewPost === false  && this.isEditClient === false && this.isEditAdmin === true) {
      let pushAdminForm = {
        id: this.Form.value.id,
        date: this.Form.value.date,
        hours: +this.fullTime,
        message: this.Form.value.message,
        done: this.Form.value.done,
      };
      this.postService.updatePost( this.Form.value.id, pushAdminForm).subscribe(
        (response) => {
          console.warn(response);
        },
      );
      this.router.navigate(['/admin', 'list']);
      this.isEditAdmin = false;
      this.postService.isAdminEdit = false;
    }

  }

  delete(item:any) {
    this.postService.deletePost(item).subscribe(
      (response) => {
        console.warn(response);
        this.modalActive = false;
      },
    );
    this.router.navigate(['/client', 'list']);
  }



  modalOn() {
    this.modalActive = true;
  }

  modalOff() {
    this.modalActive = false;
  }
}
