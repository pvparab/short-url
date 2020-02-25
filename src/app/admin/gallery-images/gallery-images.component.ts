import { Component, ViewChild } from '@angular/core';
import { GalleryService, CommonURL, ToastService } from '../../services';
import { MdbTableDirective } from 'angular-bootstrap-md';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-admin-gallery-images',
  templateUrl: './gallery-images.component.html'
})

export class GalleryImagesComponent {
  headElements = ['No', 'Image', 'Client Name', 'venu', 'Description', 'Edit', 'Copy to Clipboard'];
  searchText = '';
  imageUrl: any;
  previous: string;
  spinner = false;
  galleryItems: any = [];
  public commonURL = new CommonURL();
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  constructor(public service: GalleryService, public toast: ToastService, private _lightbox: Lightbox) {
    this.getAll();
  }
  getAll() {
    this.service.getAll().subscribe((data: any) => {
      if (!data.data) {
        return 0;
      }
      this.galleryItems = data.data;
      this.mdbTable.setDataSource(this.galleryItems);
      this.galleryItems = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    });
  }
  onSearchChange(searchText) {
    this.searchText = searchText;
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.galleryItems = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.galleryItems = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }
  openEnlargeImage(index) {
    const album = {
      src: this.galleryItems[index].imageUrl,
      caption: this.galleryItems[index].description,
      thumb: this.galleryItems[index].imageUrl
    };
    this._lightbox.open([album], 0);
  }
  copytoclipboard() {
    this.toast.success('Copied to clipboard', '');
  }
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
}