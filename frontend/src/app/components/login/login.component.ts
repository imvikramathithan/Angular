import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule ,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Referencing the external CSS file
})
export class LoginComponent {
  login = { email: '', password: '' };
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  onLogin() {
    const { email, password } = this.login;

    this.authService.loginUser(email, password).subscribe({
      next: (response) => {
        if (response) {
          this.showMessage('success', 'Login successfully');
          sessionStorage.setItem('email', email);
          this.router.navigate(['home']);
        } else {
          this.showMessage('error', 'Something went wrong');
        }
      },
      error: () => this.showMessage('error', 'Something went wrong'),
    });
  }

  private showMessage(severity: string, detail: string) {
    this.messageService.add({ severity, summary: severity, detail });
  }
}
