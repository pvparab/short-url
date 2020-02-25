import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class BroadcastSubject {
    public bdcast = new Subject<any>();
    public $bdcastObservable =  this.bdcast.asObservable();

    public sendMessage(data) {
        this.bdcast.next(data);
    }
}
