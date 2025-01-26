import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { ActivityLogRequest, ExerciseType } from '../../../models/activity-log';
import { ActivityLogService } from '../../services/activity-log.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-activity-entry',
  templateUrl: './activity-entry.component.html',
  styleUrl: './activity-entry.component.css'
})
export class ActivityEntryComponent {
  public form: FormGroup = new FormGroup({});
  @Output() activityAdded = new EventEmitter<void>();
  public exerciseTypes: string[] = Object.keys(ExerciseType).filter((item) => {
    return isNaN(Number(item));
  });
  userId: number = 0;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    public dialogRef: MatDialogRef<ActivityEntryComponent>,
    private activityLogService: ActivityLogService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      exerciseType: [null, Validators.required],
      duration: [null, [Validators.required, Validators.min(1)]],
      result: ['', [Validators.required, Validators.maxLength(200)]],
      intensity: [null, Validators.required],
      bodyWeight: [null, [Validators.required, Validators.min(0), Validators.max(999.99)]],
    });
    const id = this.authService.getUser()?.idUser;
    if (id != undefined) this.userId = id

  }

  submitForm() {
    const activityLogRequest: ActivityLogRequest = {
      exerciseType: this.form.value.exerciseType,
      duration: this.form.value.duration,
      result: this.form.value.result,
      intensity: this.form.value.intensity,
      bodyWeight: this.form.value.bodyWeight,
      userId: this.userId,
    };
    console.log(activityLogRequest);
    this.activityLogService.addActivityLog(activityLogRequest).subscribe({
      next: (data) => {
        this.form.reset();
      },
      error: () =>
        this.snackBar.open('An error occured!', undefined, {
          duration: 2000,
        }),
      complete: () => {
        this.snackBar.open('Entry added sucessfully!', undefined, {
          duration: 4000,
        });
        this.activityAdded.emit();
        this.dialogRef.close();
      },
    });
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
