import { Component } from '@angular/core';
import { Program } from '../../../models/program';
import { ImageService } from '../../services/image.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-my-programs',
  templateUrl: './my-programs.component.html',
  styleUrl: './my-programs.component.css'
})
export class MyProgramsComponent {
  programs: Program[] = [];
  private userId: number=0;
  constructor(private userService: UserService, private authService: AuthService) {
    const user=authService.getUser();
    if(user!=null)
    this.userId=user.idUser;
  }

  ngOnInit(): void {
    this.userService.getMyPrograms(this.userId).subscribe(
      (data) => {
        this.programs = data;
      },
      (error) => { 
        console.error('Error fetching programs:', error.message);
      }
    );
  }
}
