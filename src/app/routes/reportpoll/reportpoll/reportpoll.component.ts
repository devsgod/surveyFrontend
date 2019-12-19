import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

const _clone = (d) => JSON.parse(JSON.stringify(d));


@Component({
  selector: 'app-reportpoll',
  templateUrl: './reportpoll.component.html',
  styleUrls: ['./reportpoll.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ReportpollComponent implements OnInit {

  editing = {};
  rows = [];
  rowsFilter = [];
  rowsExp = [];
  rowsSort = [];
  temp = [];
  expanded: any = {};
  timeout: any;

  rowsSel = [];
  selected = [];
  columns = [
    { prop: 'name' },
    { name: 'Company' },
    { name: 'Gender' }
];
columnsSort = [
    { prop: 'name' },
    { name: 'Company' },
    { name: 'Gender' }
];

@ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
    @ViewChild('myTable', { static: true }) tableExp: any;
  constructor() { 
    this.fetch((data) => {
      // cache our list
      this.temp = _clone(data);

      this.rows = _clone(data);;
      this.rowsFilter = _clone(data);;
      this.rowsExp = _clone(data);
      this.rowsSort = _clone(data);
      this.rowsSel = _clone(data);

  });
  }

  ngOnInit() {
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/company.json`);

    req.onload = () => {
        cb(JSON.parse(req.response));
    };

    req.send();
}

updateFilter(event) {
  const val = event.target.value.toLowerCase();

  // filter our data
  const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
  });

  // update the rows
  this.rowsFilter = temp;
  // Whenever the filter changes, always go back to the first page
  this.table.offset = 0;
}

// Selection


onSelect({ selected }) {
  console.log('Select Event', selected, this.selected);

  this.selected.splice(0, this.selected.length);
  this.selected.push(...selected);
}

onActivate(event) {
  console.log('Activate Event', event);
}

onPage(event) {
  clearTimeout(this.timeout);
  this.timeout = setTimeout(() => {
      console.log('paged!', event);
  }, 100);
}
toggleExpandRow(row) {
  console.log('Toggled Expand Row!', row);
  this.tableExp.rowDetail.toggleExpandRow(row);
}

onDetailToggle(event) {
  console.log('Detail Toggled', event);
}


}
