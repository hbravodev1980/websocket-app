import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interface/task';
import { TaskChart } from '../interface/task-chart';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/api/v1/tasks`);
  }

  groupByStatus(): Observable<TaskChart> {
    return this.http.get<TaskChart>(`${this.apiUrl}/api/v1/tasks/group-by-status`);
  }

}
