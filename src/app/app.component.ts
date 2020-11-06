import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  formControl!: FormControl;

  ngOnInit(): void {
    this.formControl = new FormControl('test', undefined, () => {
      return new Observable(obs => {
        setTimeout(() => {
          obs.next({ required: true });
          obs.complete();
        }, 1000);
      });
    });
    console.log(this.formControl.status); // pending
    this.formControl.statusChanges.subscribe(status => {
      // will emit after 1 second
      // but when it binding with input, then it won't emit any more.
      console.log('status', status);
    });
  }
}
