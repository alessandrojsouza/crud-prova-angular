import { Post } from './../models/Post';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/Student';
import { Api } from './Api';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http : HttpClient) { }

  getStudents() : Observable<Student[]>{
    return this.http.get<Student[]>(Api.URL + '/students');
  }

  getStudentPosts(studentId: number) : Observable<Post[]> {
    return this.http.get<Post[]>(Api.URL + '/students/'+ studentId +'/posts');
  }

  saveStudent(student : Student) : Observable<Student>{
    return this.http.post<Student>(Api.URL + '/students', student);
  }

}
