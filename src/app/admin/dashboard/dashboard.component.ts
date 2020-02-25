import { Component, ViewChild, TemplateRef } from '@angular/core';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html'
})

export class AdminDashboardComponent {
  public userList: any = [];
  headElements = ['No', 'First', 'Last', 'Middle', 'email', 'Phone', 'Role', 'Action'];

  @ViewChild('actionPanel') actionPanel: TemplateRef<any>;
  constructor() {
  }
}
