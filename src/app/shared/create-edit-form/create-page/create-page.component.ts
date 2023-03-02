import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../../services/post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {



  constructor
  (
    private postService:PostService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }



  }

