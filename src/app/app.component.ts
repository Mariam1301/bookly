import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { LoginService } from './core/services/login/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    InputTextModule,
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private _loginService = inject(LoginService);

  ngOnInit(): void {
    this._loginService.getUser();
  }
}
