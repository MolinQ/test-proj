import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PostService } from '../services/post.service';
import { Router } from '@angular/router';
import { AdminService } from '../../admin/admin-services/admin.service';

@Component({
  selector: 'app-create-edit-form',
  templateUrl: './create-edit-form.component.html',
  styleUrls: ['./create-edit-form.component.scss'],
})
export class CreateEditFormComponent implements OnInit {
  @Input() showEdit: boolean;

  @Input() showCreate: boolean;

  modalActive: boolean = false;

  isNewPost: boolean = false;

  isClient: boolean = false;

  isAdmin: boolean = false;

  fullTime: any = null;

  post: any;

  form = new FormGroup({
    id: new FormControl(''),
    date: new FormControl('', Validators.required),
    hours: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
    done: new FormControl(false),
  });

  constructor(
    private router: Router,
    private postService: PostService,
    private AdminServices: AdminService,
  ) {}

  formatMinutesToTime(minutes: number): string {
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
    if (this.postService.isCreatePost) {
      this.isNewPost = true;

      this.form = new FormGroup({
        id: new FormControl(''),
        date: new FormControl('', Validators.required),
        hours: new FormControl('', Validators.required),
        message: new FormControl('', Validators.required),
        done: new FormControl(false),
      });
    }

    if (this.postService.isClientEdit) {
      this.isClient = true;
      this.postService.getCurrentPost().subscribe((response) => {
        this.post = response;
        this.form = new FormGroup({
          id: new FormControl(this.postService.CurrentPost.id),
          date: new FormControl(
            this.postService.CurrentPost.date,
            Validators.required,
          ),
          hours: new FormControl(
            this.formatMinutesToTime(this.postService.CurrentPost.hours),
            Validators.required,
          ),
          message: new FormControl(
            this.postService.CurrentPost.message,
            Validators.required,
          ),
          done: new FormControl(this.postService.CurrentPost.done),
        });
      });
    }

    if (this.postService.isAdminEdit) {
      this.isAdmin = true;
      this.form = new FormGroup({
        id: new FormControl(this.AdminServices.selectedPost.id),
        date: new FormControl(
          this.AdminServices.selectedPost.date,
          Validators.required,
        ),
        hours: new FormControl(
          this.formatMinutesToTime(this.AdminServices.selectedPost.hours),
          Validators.required,
        ),
        message: new FormControl(
          this.AdminServices.selectedPost.message,
          Validators.required,
        ),
        done: new FormControl(this.AdminServices.selectedPost.done),
      });
    }
  }

  formatInForm() {
    //  time
    const timeString = this.form.value.hours;
    const timeParts = timeString.split(':');

    this.fullTime = +timeParts[0] * 60 + +timeParts[1];
  }

  submit() {
    this.formatInForm();
    if (
      this.isNewPost === true &&
      this.isClient === false &&
      this.isAdmin === false
    ) {
      let pushPostForm = {
        date: this.form.value.date,
        hours: +this.fullTime,
        message: this.form.value.message,
        done: this.form.value.done,
      };
      this.postService.createPost(pushPostForm).subscribe(
        () => {
          this.router.navigate(['/client', 'list']);
          this.isNewPost = false;
        },
        (error) => {
          alert(error.error.message);
        },
      );
    }

    if (
      this.isNewPost === false &&
      this.isClient === true &&
      this.isAdmin === false
    ) {
      let pushClientForm = {
        id: this.form.value.id,
        date: this.form.value.date,
        hours: +this.fullTime,
        message: this.form.value.message,
        done: this.form.value.done,
      };
      this.postService
        .updatePost(this.form.value.id, pushClientForm)
        .subscribe(() => {});
      this.router.navigate(['/client', 'list']);
      this.isClient = false;
    }
    if (
      this.isNewPost === false &&
      this.isClient === false &&
      this.isAdmin === true
    ) {
      let pushAdminForm = {
        id: this.form.value.id,
        date: this.form.value.date,
        hours: +this.fullTime,
        message: this.form.value.message,
        done: this.form.value.done,
      };
      this.postService
        .updatePost(this.form.value.id, pushAdminForm)
        .subscribe(() => {
          this.router.navigate(['/admin', 'list']);
          this.isAdmin = false;
        });
    }
  }

  delete(item: any) {
    this.postService.deletePost(item).subscribe(() => {
      this.isClient = false;
      this.isAdmin = false;
      this.form = new FormGroup({
        id: new FormControl(''),
        date: new FormControl('', Validators.required),
        hours: new FormControl('', Validators.required),
        message: new FormControl('', Validators.required),
        done: new FormControl(false),
      });
    });
    if (this.isClient) {
      this.router.navigate(['/client', 'list']);
    } else if (this.isAdmin) {
      this.router.navigate(['/admin', 'list']);
    }
  }

  modalOn() {
    this.modalActive = true;
  }

  modalOff() {
    this.modalActive = false;
  }
}
