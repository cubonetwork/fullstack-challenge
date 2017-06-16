import { CreateEmployeeAction } from '../../redux/employee/employee.action';
import { Subscription } from 'rxjs/Rx';
import { State, getEmployeeStatus } from '../../redux';
import { Employee } from '../employee.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NotificationsService } from "angular2-notifications";

interface Status{
  created: boolean;
  creating: boolean;
  failed: boolean;
}

@Component({
  selector: 'new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit, OnDestroy {
  public employeeForm: FormGroup;
  public subscription: Subscription;
  public options = {
      position: ["top", "right"],
      timeOut: 5000,
      lastOnBottom: true
  }

  constructor(
    private fb: FormBuilder, 
    private store:Store<State>,
    private _service: NotificationsService
  ) { }

  ngOnInit() {

    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      participation: ['', [Validators.required]]
    });
    this.subscription = this.store.select(getEmployeeStatus)
    .subscribe((data: Status)=>{
      if(data.creating==false && data.failed==true){
        this._service.warn(
            'Erro ao Inserir Dados',
            'Por favor, entre com todos os dados de cadastro!',
            {
                timeOut: 5000,
                showProgressBar: true,
                clickToClose: true,
                maxLength: 48
            }
        );
      }else if(data.created==true && data.creating==false){
        this._service.success(
            'Sucesso',
            'Participação cadastrada com sucesso!',
            {
                timeOut: 5000,
                showProgressBar: true,
                clickToClose: true,
                maxLength: 36
            }
        );
        this.employeeForm.reset();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public saveEmployee(employee: Employee){
    this.store.dispatch(new CreateEmployeeAction(employee));
  }
}
