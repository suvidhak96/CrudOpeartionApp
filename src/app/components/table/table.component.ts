import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() isDashboard: boolean = false;

  @Output() edit = new EventEmitter<any>();

  @Output() delete = new EventEmitter<any>();

  ngOnInit(): void {
    console.log('data is ', this.data);
  }

  editUser(id: any) {
    this.edit.emit(id);
  }

  deleteUser(id: any) {
    this.delete.emit(id);
  }
}
