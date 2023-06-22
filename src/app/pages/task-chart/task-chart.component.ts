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

  private idCanvas = 'doughnutChart';
  private topic = '/topic/notifications';

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
    });
  }

  ngOnDestroy(): void {
    this.destroyChart(this.idCanvas);
    this.stompService.unsubscribe(this.topic);
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

        this.destroyChart(this.idCanvas);
        new Chart(this.idCanvas, config);
      }
    });
  }

  private destroyChart(idCanvas: string): void {
    let chartExist = Chart.getChart(idCanvas);

    if (chartExist !== undefined) {
      chartExist.destroy();
    }
  }

}
