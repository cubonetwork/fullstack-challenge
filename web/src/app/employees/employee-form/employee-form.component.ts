import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee } from '../shared/employee.model'
import { EmployeeService } from '../shared/employee.service'

@Component({
    moduleId: module.id,
    selector: 'employee-form',
    templateUrl: './employee-form.component.html',
    styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

    errorMessage:string = '';
    employee:Employee = Employee.empty();
    frmEmployee:FormGroup;
    @Output() onCreated: EventEmitter<any> = new EventEmitter();

    constructor(private employeeService: EmployeeService, private  fb: FormBuilder) { }

    ngOnInit() {
        // form validation rules
        this.frmEmployee = this.fb.group({
            nome: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
            sobrenome: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
            participacao: ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(100)])]
        });
    }

    cleanForm() {
        this.errorMessage = '';
        this.employee = Employee.empty();
    }

    register(event) {
        event.preventDefault();
        
        this.employeeService
            .add(this.employee)
            .subscribe(response => {
                if(response.status == 201) {
                    this.cleanForm();
                    this.onCreated.emit(null);
                } else if(response.status == 205) {
                    this.errorMessage = 'Não foi possível cadastrar o funcionário, pois, a soma das participações excede 100%.';
                }
            }, error => {
                this.errorMessage = 'Ops :(. Infelizmente não conseguimos realizar o seu cadastro.';
            });
    }
}