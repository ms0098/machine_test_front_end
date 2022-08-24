import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogData } from 'src/app/components/confirmation-box/confirmation-box.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  user_form: any;
  maxDate: Date;
  
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit(): void {
    this.user_form = new FormGroup({
      name: new FormControl(this.data.id ? this.data.name : '', [
        Validators.required,
      ]),
      email: new FormControl(this.data.id ? this.data.email : '', [
        Validators.required,
        Validators.email,
      ]),
      gender: new FormControl(this.data.id ? this.data.gender : '', [
        Validators.required,
      ]),
      dob: new FormControl(this.data.id ? this.data.dob : '', [
        Validators.required,
      ]),
      address: new FormControl(this.data.id ? this.data.address : '', [
        Validators.required,
      ]),
    });
  }

  onSubmit() {
    console.log(this.user_form)
    if (this.user_form.valid) {
      let data;
      if (this.data.id) {
        data = {
          id: this.data.id,
          name: this.user_form.value.name.trim(),
          email: this.user_form.value.email.trim(),
          gender: this.user_form.value.gender,
          dob: this.user_form.value.dob,
          address: this.user_form.value.address.trim(),
        };
        this.user_form.reset();
        this.dialogRef.close(data);
      }
    } else {
      return;
    }
  }
  dismissBox(data: any) {
    this.dialogRef.close(data);
  }

}
