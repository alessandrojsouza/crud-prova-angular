import { Component, OnInit } from '@angular/core';
import { Student } from '../models/Student';
import { StudentService } from '../service/Student.service';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  providers: [MessageService]
})
export class StudentsComponent implements OnInit{

  students : Student = { matricule: '', name: '', email: ''}

  studentsList : Student[] = [];

  constructor(
    private service : StudentService,
    private messageService: MessageService){}

  ngOnInit() {
    this.service.getStudents().subscribe(data => this.studentsList = data);
  }

  onSubmitStudent(form:NgForm) {
    this.students = form.value;
    this.service.saveStudent(this.students).
      subscribe( data => {
        this.studentsList.push(data);
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Estudante adicionado!' });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Atenção', detail: 'Algo deu errado' });
      });
      form.resetForm();
  }

}
