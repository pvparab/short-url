
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-spinner',
    template: `
    <div class="d-flex justify-content-center loading" *ngIf="show">
    <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    `,
    styles:[
        `.loading {
        position: fixed;
        z-index: 999;
        height: 2em;
        width: 2em;
        overflow: visible;
        margin: auto;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
      }
      /* Transparent Overlay */
      .loading:before {
        content: '';
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.3);
      }
      `
    ]
})
export class SpinnerComponent {
    @Input() public show: boolean;
    constructor() {
        this.show = true;
    }
}
