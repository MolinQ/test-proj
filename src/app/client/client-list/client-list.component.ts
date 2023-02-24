import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {PostService} from "../../shared/services/post.service";




@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit  {

  constructor(
    public auth:AuthService,
    private postService:PostService,
    private router: Router
  ) {}

  collection:any;
  searchText: string =""

  ngOnInit() {
    this.postService.getPost().subscribe(
      (response) =>{
        this.collection = response
      }
    )
  }



  filterPosts() {
    return this.collection.filter(post => post.message.includes(this.searchText))
  }

  selectPost(post: any) {
    this.postService.CurrentPost = post
    this.router.navigate(['/edit',`${post.id}`])
    console.log(this.postService.getCurrentPost)
  }

}
