import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from 'src/app/interface/task';
import { StompService } from 'src/app/service/stomp.service';
import { TaskService } from 'src/app/service/task.service';
import iziToast from 'izitoast';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})
export class TaskTableComponent implements OnInit, OnDestroy {

  tasks: Task[] = [];

  private topic = '/topic/notifications';
  private subscriptionId = 'taskTableSubscription';

  constructor(private taskService: TaskService, private stompService: StompService) {
    this.refreshTable();
  }

  ngOnInit(): void {
    this.stompService.subscribe(this.topic, (message): void => {
      this.refreshTable();
      iziToast.info({
        title: 'Notification',
        message: message.body
      });
    },
    this.subscriptionId);
  }

  ngOnDestroy(): void {
    this.stompService.unsubscribe(this.subscriptionId);
  }

  private refreshTable(): void {
    this.taskService.findAll().subscribe({
      next: (tasks) => this.tasks = tasks
    });
  }

}
