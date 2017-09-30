import { Component, OnInit, ViewEncapsulation, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { Employee } from '../employee.model';

@Component({
    selector: 'app-main-form',
    templateUrl: './main-form.component.html',
    styleUrls: ['./main-form.component.styl'],
    encapsulation: ViewEncapsulation.None
})

export class MainFormComponent implements OnInit {
    @ViewChild('nameInput') nameInputReference: ElementRef;
    @ViewChild('lastNameInput') lastNameInputReference: ElementRef;
    @ViewChild('participationInput') participationInputReference: ElementRef;

    @Input() participationAvailable: Number = 100;
    @Output() employeeAdded = new EventEmitter<Employee>();

    ngOnInit() { }

    onAddItem($event) {
        $event.preventDefault();

        const newEmployee = new Employee(
            this.nameInputReference.nativeElement.value,
            this.lastNameInputReference.nativeElement.value,
            +this.participationInputReference.nativeElement.value
        );

        // Reset the form
        this.nameInputReference.nativeElement.value = '';
        this.lastNameInputReference.nativeElement.value = '';
        this.participationInputReference.nativeElement.value = '';

        this.employeeAdded.emit(newEmployee);
    }
}
