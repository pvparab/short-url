import { Component, ViewChild } from '@angular/core';
import { DecorationItemService, ToastService, appConst } from '../../services';
import { MdbTableDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-admin-decoration-items',
  templateUrl: './decoration-items.component.html'
})

export class DecorationItemsComponent {
  headElements = ['No', 'Image Url', 'Item Name', 'Description', 'Quantity', 'Price', 'Action'];
  searchText = '';
  previous: string;
  decorationItemsList: any = [];
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  constructor(public service: DecorationItemService) {
    this.service.getAllEntity().subscribe((data: any) => {
      if (!data.data) {
        return 0;
      }
      this.decorationItemsList = data.data;
      this.mdbTable.setDataSource(this.decorationItemsList);
      this.decorationItemsList = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    });
  }
  onSearchChange(searchText) {
    this.searchText = searchText;
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.decorationItemsList = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.decorationItemsList = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }
}
