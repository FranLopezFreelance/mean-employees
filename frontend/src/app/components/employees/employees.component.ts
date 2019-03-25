import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';

//Materialize Messagges
declare var M: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeeService]
})
export class EmployeesComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  addEmployee(form: NgForm){
    if(form.value._id){
      this.employeeService.putEmployee(form.value)
        .subscribe(res => {
          this.resetForm(form);
          M.toast({html: 'Los datos se actualizaron correctamente.'});
          this.getEmployees();
        });
    }else{
    this.employeeService.postEmployee(form.value)
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Los datos se guardaron correctamente.'});
        this.getEmployees();
      }); 
    }
  }

  getEmployees(){
    this.employeeService.getEmployees()
      .subscribe(res => {
        this.employeeService.employees = res as Employee[];
      })
  }

  editEmployee(employee: Employee){
    this.employeeService.selectedEmployee = employee;
    //this.employeeService.putEmployee(employee._id)
  }

  deleteEmployee(_id: string){
    if(confirm('¿Estás seguro de eliminar estos datos?')){
      this.employeeService.deleteEmployee(_id)
      .subscribe(res =>{
        M.toast({html: 'Los datos se eliminaron correctamente.'});
        this.getEmployees();
      });
    }
  }

  resetForm(form: NgForm){
    form.reset();
    this.employeeService.selectedEmployee = new Employee; 
  }

}
