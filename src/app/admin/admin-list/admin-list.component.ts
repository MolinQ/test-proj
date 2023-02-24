import {Component, DoCheck, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {AdminService} from "../admin-services/admin.service";
import {Router} from "@angular/router";
import {forkJoin, map, of, switchMap, timeout} from "rxjs";
import {PostService} from "../../shared/services/post.service";


@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})

export class AdminListComponent implements OnInit {

  users:any
  usersObs:any
  usersMassive:any
  usersInPost:any = []
  userPost:any = []
  selectedPost: any;
  searchText: string = ""
  posts:any

  constructor(
    public auth:AuthService,
    private postService:PostService,
    private AdminService: AdminService,
    private router: Router
  ) {}

  ngOnInit() {
    this.users = this.postService.getUsers().subscribe(
      (user => {
        this.users = user
        this.users.forEach( user => {
          this.postService.getAdminPost(user.id).subscribe(
            (response)=> {
              let post:any = response
              if (post.length !== 0) {
                this.userPost.push(post)
                this.usersInPost.push(user)
              }
            })
        })
      })
    )
  }

  filterPosts(posts:any) {
    return posts.filter(post => post.message.includes(this.searchText))
  }


  selectPost(post: any) {
    this.selectedPost = post;
    this.AdminService.selectedPost = post
    this.router.navigate(['/admin','edit',`${post.id}`])
    console.log(this.AdminService)
  }
}

