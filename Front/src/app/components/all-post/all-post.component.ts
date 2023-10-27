import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from 'src/app/service/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.scss']
})
export class AllPostComponent implements OnInit {
  form: FormGroup;
  public urlImageIcon: string = '../../../assets/image_main.png';
  public imageUrl: string = '../../../assets/faces.png';
  public showEmpty: boolean = false;

  public items: any[] = [];
  public allItems: any[] = [];
  public pageIndex: number = 0;
  public paginator: any[] = [];

  constructor(private fb: FormBuilder, private postService: PostsService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      post: [''],
      date: [null]
    });
    this.getAllPosts();
  }

  getAllPosts() {
    this.postService.getAllPost({}).subscribe({
      next: (data) => {
        this.allItems = data;
        this.items = this.allItems;
        this.pageEvent({ pageIndex: 0 })
      },
      error: (error) => { }
    })
  }

  onChangeData(event: any) {
    const post = this.form.get('post')?.value;
    const date = this.form.get('date')?.value;
    const newDate = this.formatDate(date);

    this.items = this.allItems.filter(x => x.title.includes(post));
    if (this.form.get('date')?.value) {
      this.items = this.items.filter(x => x.date === newDate);
    }

    if (this.items.length === 0) {
      this.showEmpty = true;
    } else {
      this.showEmpty = false;
    }

    this.pageEvent({ pageIndex: 0 })
  }

  formatDate(dateOriginal: Date | null) {
    if (!dateOriginal) return '0000-00-00';
    const year = dateOriginal.getFullYear();
    const month = (dateOriginal.getMonth() + 1).toString().padStart(2, '0');
    const day = dateOriginal.getDate().toString().padStart(2, '0');
    const newDate = `${year}-${month}-${day}`;
    return newDate;
  }

  pageEvent(event: any) {
    const page = event.pageIndex;
    const init = 2 * page;
    const end = 2 * (page + 1);
    this.paginator = this.items.slice(init, end);
  }
}
