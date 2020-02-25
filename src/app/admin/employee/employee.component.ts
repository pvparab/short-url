import { Component, ViewChild } from '@angular/core';
import { EmployeeService } from '../../services';
import { MdbTableDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-admin-employee',
  templateUrl: './employee.component.html'
})

export class EmployeeComponent {
  headElements = ['No', 'first', 'Last', 'Middle', 'email', 'Phone', 'Action'];
  searchText = '';
  previous: string;
  employeeList: any = [];
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  constructor(public service: EmployeeService) {
    this.service.getAll().subscribe((data: any) => {
      if (!data.data) {
        return 0;
      }
      this.employeeList = data.data;
      this.mdbTable.setDataSource(this.employeeList);
      this.employeeList = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    });
  }
  onSearchChange(searchText) {
    this.searchText = searchText;
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.employeeList = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.employeeList = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }
}
