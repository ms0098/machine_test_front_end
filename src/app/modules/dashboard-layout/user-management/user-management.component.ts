import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationBoxComponent } from 'src/app/components/confirmation-box/confirmation-box.component';
import { CoreService } from 'src/app/services/core.service';
import { UserFormComponent } from './user-form/user-form.component';


export interface UserElement {
  id: number;
  name: string;
  email: string;
  gender: number;
  address: string;
  dob: string;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'email', 'gender', 'address', 'dob', 'action'];
  dataSource: any;
  selection = new SelectionModel<UserElement>(true, []);
  male: number = 0;
  female: number = 0;

  constructor(
    private coreService: CoreService,
    public dialog: MatDialog ) {
  }
  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.coreService.get('/assets/dummy-data.json').subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.getUsersCount(this.dataSource.data);
    });
  }

  getUsersCount(data: any) {
    this.male = data.filter((e: UserElement) => (e.gender == 1)).length;
    this.female = data.filter((e: UserElement) => (e.gender == 2)).length;
  }
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data?.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: UserElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  editUser(user: UserElement) {
    const modalRef = this.dialog.open(UserFormComponent, {
      data: user
    });
    modalRef.afterClosed().subscribe({
      next: (res: any) => {
        if (res) {
          let updated_data = this.dataSource.data.map((element: UserElement) => {
            if (element.id === res.id) {
              element = res;
            }
            return element;
          });
          
          this.dataSource = new MatTableDataSource(updated_data);
          this.getUsersCount(this.dataSource.data);
          this.coreService.showSnackBar(res.name + ' updated successfully');
        }
      },
      error: (reason) => {},
    });
  }

  deleteUser(id: number) {
    console.log(this.dataSource.data.map((x: UserElement) => x.id).indexOf(id));
    this.dataSource.data?.splice((this.dataSource.data.map((x: UserElement) => x.id).indexOf(id)), 1);
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    this.getUsersCount(this.dataSource.data);
    this.coreService.showSnackBar('User deleted successfully');
  }

  removeUser(user: UserElement) {
    const modalRef = this.dialog.open(ConfirmationBoxComponent, {
      data: { flag: 'delete', msg: `Are you sure want to delete ${user.name}?` }
    });
    modalRef.afterClosed().subscribe({
      next: (res: any) => {
        if (res) {
          this.deleteUser(user.id);
        }
      },
      error: (reason) => {},
    });
  }

}
