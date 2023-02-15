import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-boutons-action',
  templateUrl: './boutons-action.component.html',
  styleUrls: ['./boutons-action.component.scss']
})
export class BoutonsActionComponent {

  @Input()
  isNouveauVisible = true;
  @Input()
  isExporterVisible = true;
  @Input()
  isImporterVisible = true;

  @Output()
  clickEvent = new EventEmitter();

  boutonNouveauClick(): void {
    this.clickEvent.emit();
  }
}
