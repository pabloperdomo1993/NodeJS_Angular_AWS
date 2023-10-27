import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/commons/modal/modalcomponent';
import { PostsService } from 'src/app/service/posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  form: FormGroup;
  urlImageIcon: string = '../../../assets/image_main.png';
  public fullName: string | null = '';
  public createAt: Date = new Date();

  constructor(private fb: FormBuilder, private postService: PostsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      message: ['', Validators.required]
    });
    this.fullName = localStorage.getItem('fullName');
  }

  onSubmit() {
    const body = {
      title: this.form.get('title')?.value,
      message: this.form.get('message')?.value,
      email: localStorage.getItem('email')
    }

    this.postService.createPost(body).subscribe({
      next: (data) => {
        this.dialog.open(ModalComponent, {
          data: {
            type: 'success',
            message: data.message
          },
        });
        this.form.reset();
      },
      error: (error) => {
        this.dialog.open(ModalComponent, {
          data: {
            type: 'error',
            message: error.error.message
          },
        });
      }
    })
  }
}
