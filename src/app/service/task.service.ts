import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interface/task';
import { TaskChart } from '../interface/task-chart';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:8080/api/v1/tasks');
  }

  groupByStatus(): Observable<TaskChart> {
    return this.http.get<TaskChart>('http://localhost:8080/api/v1/tasks/group-by-status');
  }

}
