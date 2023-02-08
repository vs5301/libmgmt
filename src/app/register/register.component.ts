import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({});
  errorMsg: string | undefined;
  loader: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService
  ) { }

  ngOnInit(): any {
    this.registerForm = this.fb.group({
      name: [null, [ Validators.required ]],
      email: [null, [ Validators.required, Validators.email ]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  registerUser(form: any): void {
    if (!this.registerForm.valid) {
      return;
    }

    const { name,email, password } = this.registerForm.value;  
    this.authService.signUp(name, email, password).pipe(
      this.toast.observe({
        success: 'Congrats! You are all signed up',
        loading: 'Signing in...',
        error: ({ message }) => `${message}`
      })
    ).subscribe(() => {
    this.router.navigate(['/home']);
    });
    }

}

// registerUser(form: any): void {
//   // let formValues = { ...form.value };
//   delete this.errorMsg;
//   this.loader = true;
//   let formValues: {  name: string; email: string; password: string } = Object.assign({}, form.value);
// }