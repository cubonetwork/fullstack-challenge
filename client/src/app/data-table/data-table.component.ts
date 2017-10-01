import { Component, Input, OnInit } from '@angular/core';

import { Employee } from '../employee.model';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.styl']
})
export class DataTableComponent implements OnInit {
    @Input() employees: Employee[];

    constructor() { }

    ngOnInit() { }

}
