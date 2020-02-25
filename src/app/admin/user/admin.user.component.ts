import { Component, ViewChild } from '@angular/core';
import { UserService, ToastService, appConst } from '../../services';
import { MdbTableDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin.user.component.html'
})

export class AdminUserComponent {
  headElements = ['No', 'First', 'Last', 'Middle', 'email', 'Phone', 'Role', 'Action'];
  searchText = '';
  previous: string;
  userList: any = [];
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  constructor(public service: UserService) {
    this.service.getAllUser().subscribe((data: any) => {
      this.userList = data.user;
      this.mdbTable.setDataSource(this.userList);
      this.userList = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    });
  }
  onSearchChange(searchText) {
    this.searchText = searchText;
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.userList = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.userList = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }
}
