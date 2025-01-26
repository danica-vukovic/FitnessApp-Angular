import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';

@Component({
  selector: 'app-daily-exercises',
  templateUrl: './daily-exercises.component.html',
  styleUrls: ['./daily-exercises.component.css']
})
export class DailyExercisesComponent implements OnInit {

  exercises: any[] = [];

  constructor(private dailyExercisesService: ExerciseService) { }

  ngOnInit(): void {
    this.dailyExercisesService.getDailyExercises().subscribe(
      data => {
        this.exercises = data; 
      },
      error => {
        console.error('Error fetching exercises:', error);
      }
    );
  }

}
