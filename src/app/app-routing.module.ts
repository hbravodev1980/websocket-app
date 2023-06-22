import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskTableComponent } from './pages/task-table/task-table.component';
import { TaskChartComponent } from './pages/task-chart/task-chart.component';

const routes: Routes = [
  { path: '', redirectTo: '/task-table', pathMatch: 'full' },
  { path: 'task-table', component: TaskTableComponent },
  { path: 'task-chart', component: TaskChartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
