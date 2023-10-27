import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from 'src/app/service/posts.service';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.scss']
})
export class MyPostComponent implements OnInit {
  form: FormGroup;
  urlImageIcon: string = '../../../assets/image_main.png';

  public items: any[] = [];
  public fullName: string | null = '';
  public imageUrl: string = '../../../assets/faces.png';
  public showEmpty: boolean = false;
  public allItems: any[] = [];
  public pageIndex: number = 0;
  public paginator: any[] = [];

  constructor(private fb: FormBuilder, private postService: PostsService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      date: ['']
    });
    this.getAllPosts();
    this.fullName = localStorage.getItem('fullName');
  }

  onChangeDate(event: any) {
    const dateOriginal = this.form.get('date')?.value;
    const year = dateOriginal.getFullYear();
    const month = (dateOriginal.getMonth() + 1).toString().padStart(2, '0');
    const day = dateOriginal.getDate().toString().padStart(2, '0');
    const newDate = `${year}-${month}-${day}`;

    this.items = this.allItems.filter(x => x.date === newDate);

    if (this.items.length === 0) {
      this.showEmpty = true;
    } else {
      this.showEmpty = false;
    }
    this.pageEvent({ pageIndex: 0 })
  }

  getAllPosts() {
    const email = localStorage.getItem('email');
    const body = {
      email: email
    }

    this.postService.getMyPost(body).subscribe({
      next: (data) => {
        this.allItems = data;
        this.items = this.allItems;
        this.pageEvent({ pageIndex: 0 })
      },
      error: (error) => { }
    })
  }

  pageEvent(event: any) {
    const page = event.pageIndex;
    const init = 2 * page;
    const end = 2 * (page + 1);
    this.paginator = this.items.slice(init, end);
  }
}
