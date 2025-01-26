import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { jsPDF } from 'jspdf';
import { AuthService } from '../../../auth/services/auth.service';
import { UserService } from '../../services/user.service';
import { ActivityEntryComponent } from '../activity-entry/activity-entry.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrl: './activity-log.component.css'
})
export class ActivityLogComponent implements OnInit {
  public entries: [] = [];
  public weightChart: Chart | undefined;
  userId: number = 0;

  constructor(private userService: UserService, private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {

    const id = this.authService.getUser()?.idUser;
    Chart.register(...registerables);
    if (id != undefined)
      this.userId = id;
    this.loadEntries();
    this.initWeightChart();
  }

  loadEntries(): void {
    this.userService.getActivityLogsByUserId(this.userId).subscribe((entries: any) => {
      this.entries = entries;
      this.updateWeightChart();
    });
  }

  initWeightChart(): void {
    const ctx = (document.getElementById('weightChart') as HTMLCanvasElement)
      .getContext('2d')!;
    this.weightChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Body Weight Over Time',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          },
        ],
      },
    });
  }

  updateWeightChart(): void {
    const labels = this.entries.map((entry: any) =>
      new Date(entry.date).toLocaleDateString()
    );
    const data = this.entries.map((entry: any) => entry.bodyWeight);

    this.weightChart?.data.labels?.splice(0, this.weightChart.data.labels.length, ...labels);
    this.weightChart?.data.datasets[0].data.splice(0, this.weightChart.data.datasets[0].data.length, ...data);

    this.weightChart?.update();
  }

  openAddActivityDialog(): void {
    const dialogRef = this.dialog.open(ActivityEntryComponent, {
      width: '400px',
      height: '600px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadEntries();
      this.updateWeightChart();
    });
  }
  generatePDF(): void {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text('Activity Journal', 14, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text('Summary of Activities', 14, 30);

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(14, 32, 195, 32);

    let yPosition = 40;

    this.entries.forEach((entry: any, index: number) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(
        `${index + 1}. ${new Date(entry.date).toLocaleDateString()}: ${entry.exerciseType}, Duration: ${entry.duration} min, Intensity: ${entry.intensity}, Result: ${entry.result}, Weight: ${entry.bodyWeight} kg`,
        14,
        yPosition
      );
      yPosition += 14;
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
    });

    doc.save('activity-log.pdf');
  }
}
