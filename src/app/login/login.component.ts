import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  errorMsg: string | undefined;
  loader: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [ Validators.required, Validators.email ]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  loginUser(form: FormGroup): void {   
     if (!this.loginForm.valid) {
      return;
    }

    const { email, password } = this.loginForm.value;  
    this.authService.login(email, password).pipe(
      this.toast.observe({
        success: 'Logged in successfully',
        loading: 'Loagging in...',
        error: 'There was an error'
      })
    ).subscribe(() => {
    this.router.navigate(['/home']);
    });
  }

}


// loginUser(form: FormGroup): void {
//   // let formValues = { ...form.value };
//   delete this.errorMsg;
//   this.loader = true;
//   let formValues: { email: string; password: string } = { ...form.value };
// }  