import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserHasProgramRequest } from '../../../models/user-has-program-request';
import { AuthService } from '../../../auth/services/auth.service';
import { UserHasProgramService } from '../../services/user-has-program.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css'] 
})
export class PaymentDialogComponent {
  selectedPaymentMethod: string = '';
  paymentDetails: any = {
    cardNumber: '',
    paypalEmail: ''
  };
  idUser: number = 0;
  
  @Output() purchaseComplete = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<PaymentDialogComponent>,  
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public programId: number, 
    private snackBar: MatSnackBar,
    private userHasProgramService: UserHasProgramService
  ) {
    const id = this.authService.getUser()?.idUser;
    if (id) { 
      this.idUser = id;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.selectedPaymentMethod === 'card' && !this.paymentDetails.cardNumber) {
      alert('Please enter your card number.');
      return;
    }
  
    if (this.selectedPaymentMethod === 'paypal' && !this.paymentDetails.paypalEmail) {
      alert('Please enter your PayPal email.');
      return;
    }
    console.log(this.programId + " " + this.idUser);
    const userHasProgramRequest: UserHasProgramRequest = {
      programId: this.programId,
      userId: this.idUser,
    };

    this.userHasProgramService.addUserHasProgram(userHasProgramRequest)
      .subscribe({
        next: () => {
          this.snackBar.open('Program bought successfully!', undefined, {
            duration: 4000,
          });
          this.purchaseComplete.emit(); 
          this.dialogRef.close();
        },
        error: () => {
          this.snackBar.open('An error occurred!', undefined, {
            duration: 2000,
          });
        },
      });
  }
}
