import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/service/users.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/commons/modal/modalcomponent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  urlImageIcon: string = '../../../assets/image_main.png';

  constructor(private fb: FormBuilder, private userService: UsersService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const body = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }

    this.userService.auth(body).subscribe({
      next: (data) => {
        this.setData(data);
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

  setData(data: any) {
    localStorage.setItem('fullName', data.fullName);
    localStorage.setItem('email', data.email);
    localStorage.setItem('token', data.token);
    this.router.navigate(['/create-post']);
  }
}
