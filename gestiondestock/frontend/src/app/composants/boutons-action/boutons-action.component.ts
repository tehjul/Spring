import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-boutons-action',
  templateUrl: './boutons-action.component.html',
  styleUrls: ['./boutons-action.component.scss']
})
export class BoutonsActionComponent {

  @Output()
  clickEvent = new EventEmitter();

  boutonNouveauClick(): void {
    this.clickEvent.emit();
  }
}
