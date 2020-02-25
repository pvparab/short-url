import { Component, ViewChild } from '@angular/core';
import { ClientsService } from '../../services';
import { MdbTableDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-admin-clients',
  templateUrl: './clients.component.html'
})

export class ClientsComponent {
  headElements = ['No', 'Client Name', 'Email', 'Phone', 'GST No.', 'Pan No.', 'Action'];
  searchText = '';
  previous: string;
  clientsList: any = [];
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  constructor(public service: ClientsService) {
    this.service.getAll().subscribe((data: any) => {
      if (!data.data) {
        return 0;
      }
      this.clientsList = data.data;
      this.mdbTable.setDataSource(this.clientsList);
      this.clientsList = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    });
  }
  onSearchChange(searchText) {
    this.searchText = searchText;
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.clientsList = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.clientsList = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }
}
