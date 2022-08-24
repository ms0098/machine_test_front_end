import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable()

export class CoreService {

 constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  get(url: string) {
    return this.http.get<any>(url);
  }

  showSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      duration: 3000
    });
  }

}
