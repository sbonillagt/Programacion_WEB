import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MyserviceService } from './../myservice.service';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MyserviceService]
})
export class LoginComponent implements OnInit {
  msg = '';
  constructor(private service: MyserviceService, private routes: Router) { }

  check(userName: string, password: string) {
    const output = this.service.checkUser(userName, password);
    if (output == true) {
      this.routes.navigate(['/starter']);
    } else {  
      this.msg = 'Usuario o Password Incorrecta';
    }
  }

  ngOnInit() {}
}
