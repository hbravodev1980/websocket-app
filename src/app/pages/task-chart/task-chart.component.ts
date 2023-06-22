import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import { StompService } from 'src/app/service/stomp.service';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import iziToast from 'izitoast';

@Component({
  selector: 'app-task-chart',
  templateUrl: './task-chart.component.html',
  styleUrls: ['./task-chart.component.css']
})
export class TaskChartComponent implements OnInit, OnDestroy {

  private canvasId = 'doughnutChart';
  private topic = '/topic/notifications';
  private subscriptionId = 'taskChartSubscription';

  constructor(private taskService: TaskService, private stompService: StompService) {
    this.refreshRenderChart();
  }

  ngOnInit(): void {
    this.stompService.subscribe(this.topic, (message): void => {
      this.refreshRenderChart();
      iziToast.info({
        title: 'Notification',
        message: message.body
      });
    },
    this.subscriptionId);
  }

  ngOnDestroy(): void {
    this.destroyChart();
    this.stompService.unsubscribe(this.subscriptionId);
  }

  private refreshRenderChart(): void {
    this.taskService.groupByStatus().subscribe({
      next: (taskChart) => {
        const dataChart = {
          labels: taskChart.status,
          datasets: [{
            label: 'Quantity',
            data: taskChart.quantity,
            hoverOffset: 4
          }]
        };

        const config: ChartConfiguration<'doughnut', number[], string> = {
          type: 'doughnut',
          data: dataChart,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Task Chart'
              }
            }
          }
        };

        this.destroyChart();
        new Chart(this.canvasId, config);
      }
    });
  }

  private destroyChart(): void {
    let chartExist = Chart.getChart(this.canvasId);

    if (chartExist !== undefined) {
      chartExist.destroy();
    }
  }

}
