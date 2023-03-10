import {ChangeDetectorRef, Component, ElementRef, Input, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';
import { AdminService } from '../../admin/admin-services/admin.service';
import {forkJoin, map, switchMap} from 'rxjs';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
  @Input() showCreateButton: boolean;

  @Input() showClientPost: boolean;

  @Input() showAdminPost: boolean;

  users: any;

  userPost: any = [];

  usersInPost: any = [];

  selectedPost: any;

  collection: any = [];

  searchText: string = '';

  posts:any;

  constructor(
    public auth: AuthService,
    private postService: PostService,
    private AdminServices: AdminService,
    private router: Router,
    private changeDetection: ChangeDetectorRef,
    private elementRef: ElementRef,
  ) {}

  ngOnInit(): void {
    this.postService.isAdminEdit = false;
    this.postService.isClientEdit = false;
    this.postService.isCreatePost = false;
    if (this.showClientPost) {
      this.postService.getPost().subscribe(
        (response) => {
          this.changeDetection.detectChanges();
          this.collection = response;
        },
      );
    }
    if (this.showAdminPost) {
      this.users = this.postService.getUsers().pipe(
        switchMap(users => {
          this.users = users;
          return forkJoin(this.users.map(user => this.postService.getAdminPost(user.id))).pipe(
            map(posts => {
              this.posts = posts;
              const filteredUsers = [];
              const filteredPosts = [];
              for (let i = 0; i < this.posts.length; i++) {
                if (posts[i].length !== 0) {
                  filteredUsers.push(users[i]);
                  filteredPosts.push(posts[i]);
                }
              }
              this.userPost = filteredPosts;
              return filteredUsers;
            }),
          );
        }),
      ).subscribe(users => {
        this.usersInPost = users;
      });
    }
  }

  filterPosts() {
    if (this.collection) {
      return this.collection.filter((post: any) =>
        post.message.includes(this.searchText),
      );
    }
  }

  filterAdminPosts(posts: any) {
    return posts.filter((post: any) => post.message.includes(this.searchText));
  }

  selectPostClient(post: any) {
    this.postService.CurrentPost = post;
    this.postService.isClientEdit = true;
    this.router.navigate(['/clientEdit', `${post.id}`]);
  }

  selectPostAdmin(post: any) {
    this.selectedPost = post;
    this.AdminServices.selectedPost = post;
    this.postService.isAdminEdit = true;
    this.router.navigate(['/adminEdit', `${post.id}`]);
  }

  selectedCreatePost() {
    this.postService.isCreatePost = true;
    this.router.navigate(['/client', 'list', 'new']);
  }
}
