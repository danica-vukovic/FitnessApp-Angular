import { Component } from '@angular/core';
import { Program } from '../../../models/program';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../../auth/services/auth.service';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-purchased-programs',
  templateUrl: './purchased-programs.component.html',
  styleUrl: './purchased-programs.component.css'
})
export class PurchasedProgramsComponent {
  programs: Program[] = [];
  private userId: number=0;
 
  constructor(private userService: UserService, private authService: AuthService) {
    const user=authService.getUser();
    if(user!=null)
    this.userId=user.idUser;
  }

  ngOnInit(): void {
    this.userService.getPurchasedPrograms(this.userId).subscribe(
      (data) => {
        const tempPrograms: Program[] = data; 

        const observables = tempPrograms.map(program => 
          this.userService.isProgramFinished(this.userId, program.idProgram).pipe(
            map(isFinished => {
              program.completed = isFinished; 
              return program; 
            })
          )
        );

        forkJoin(observables).subscribe(updatedPrograms => {
          this.programs = updatedPrograms;  
        });
      },
      (error) => { 
        console.error('Error fetching programs:', error.message);
      }
    );
}
}
