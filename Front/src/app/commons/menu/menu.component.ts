import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  public name: string | null = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('fullName');
  }

  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('fullName');
    localStorage.removeItem('token');

    this.router.navigate(['/']);
  }

  redirectTo(url: string) {
    this.router.navigate([url]);
  }
}
