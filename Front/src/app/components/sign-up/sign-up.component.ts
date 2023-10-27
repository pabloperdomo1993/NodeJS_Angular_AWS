import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { UsersService } from 'src/app/service/users.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/commons/modal/modalcomponent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  loginForm: FormGroup;
  urlImageIcon: string = '../../../assets/image_main.png';

  constructor(private fb: FormBuilder, private usersService: UsersService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    },
      {
        validator: this.passwordsMatchValidator('password', 'confirmPassword')
      });
  }

  onSubmit() {
    const body = {
      fullName: this.loginForm.get('fullName')?.value,
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }
    this.usersService.createUser(body).subscribe({
      next: (data) => {
        this.dialog.open(ModalComponent, {
          data: {
            type: 'success',
            message: data.message
          },
        });
        this.loginForm.reset();
        this.router.navigate(['/']);
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

  passwordsMatchValidator(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (!control || !matchingControl) {
        return null;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ passwordsNotMatch: true });
      } else {
        matchingControl.setErrors(null);
      }

      return null;
    }
  }
}
