import { Injectable } from '@angular/core';

@Injectable()
export class MyserviceService {

  constructor() { }

  checkUser(userName: string, password: string) {
    if (userName === 'admin' && password === 'admin123') {
      localStorage.setItem('username', 'admin');
      return true;
    } else {
      return false;
    }
  }
}
