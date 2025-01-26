import { Component, OnInit } from '@angular/core';
import { Program } from '../../../models/program';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '../../../models/program';
import { AuthService } from '../../../auth/services/auth.service';
import { UserService } from '../../services/user.service';
import { catchError, of } from 'rxjs';
import { ProgramService } from '../../services/program.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
import { CommentsComponent } from '../comments/comments.component';


@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrl: './program-details.component.css'
})
export class ProgramDetailsComponent implements OnInit {

  program: Program = {} as Program;
  Location = Location;
  showAttributes: boolean = false;
  userId: number = 0;
  hasProgram: boolean = false;
  userCreatedProgram: boolean = false;
  login: boolean = false;
  attributes: Map<string, string[]> = new Map();

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private userService: UserService,
     private programService: ProgramService, private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.program = this.router.getCurrentNavigation()?.extras.state?.['program'];
    this.userHasProgram();
  }

  userHasProgram(): void {
    if (this.authService.isAuthenticated()) {
      const user = this.authService.getUser();
      if (user != null) {
        this.login = true;
        this.userId = user.idUser;
        this.userCreatedProgram = this.program.user.idUser === this.userId;
        this.userService.userHasProgram(this.userId, this.program.idProgram).pipe(
          catchError(error => {
            console.error('Error checking if user has program:', error);
            return of(false);
          })
        ).subscribe(
          (result) => {
            this.hasProgram = result;
          }
        );
      }
    }
  }

  ngOnInit(): void {
    this.loadAttributes();
  }

  goBack(): void {
    this.router.navigate(['main/public/programs']);
  }

  deleteProgram(): void {
    this.programService.deleteProgram(this.program.idProgram).subscribe({
      next: () => {
        this.snackBar.open('Program deleted successfully', undefined, {
          duration: 4000,
        });
        this.router.navigate(['main/public/programs']);
      },
      error: (err) => {
          this.snackBar.open('Error deleting program:'+ err, undefined, {
            duration: 4000,
          });
      }
    });
  }

  loadAttributes(): void {
    this.programService.getAttributesByProgramId(this.program.idProgram).subscribe({
      next: (data) => {
        
        if(data.length > 0 ){ 
  
        const resultMap = new Map<string, string[]>();
  
        data.forEach((element:any) => {
          const attribute = element.attribute; 
          const value = element.value; 
          
          const attributeName = attribute.name;
          if (!resultMap.has(attributeName)) {
            resultMap.set(attributeName, []); 
          }
          resultMap.get(attributeName)?.push(value); 
        });
  
        this.attributes = resultMap;
      }
      },
      error: (err) => {
        this.snackBar.open('No attributes found for the program.', 'Close', {
          duration: 3000,
        });
      }
    });
  }
  
  
  openCommentsDialog() {
    this.dialog.open(CommentsComponent, {
      data: { programId: this.program?.idProgram },
    });
   }

  openBuyDialog() {
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '300px',
     data: this.program?.idProgram

    });
   }

  toggleAttributes() {
    this.showAttributes = !this.showAttributes;
  }

}
