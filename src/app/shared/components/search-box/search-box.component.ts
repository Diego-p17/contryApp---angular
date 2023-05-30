import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();

  @Input() public placeHolder:string ='';
  @Input() public initialValue:string ='';
  @Output() searchValue:EventEmitter<string> = new EventEmitter();


  constructor(){}

  ngOnInit(): void {
    this.debouncer
      .pipe( debounceTime(300))
      .subscribe( value => this.searchValue.emit(value))
  }
  ngOnDestroy(): void {
    this.debouncer.unsubscribe();
  }

  emitValue( value:string ):void{
    this.searchValue.emit(value);
  }

  onKeyPress( value:string ):void{
      this.debouncer.next(value);
  }
}
