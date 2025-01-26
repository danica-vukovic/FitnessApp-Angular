import { Component } from '@angular/core';
import { Program } from '../../../models/program';
import { ProgramService } from '../../services/program.service';
import { ImageService } from '../../services/image.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.css'
})
export class ProgramsComponent {
  
  programs: Program[] = []
  constructor(private programService: ProgramService, private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.programService.getAllPrograms().subscribe(
      (data) => {
        this.programs = data;
      },
      (error) => { 
        console.error('Error fetching programs:', error.message);
      }
    );
  }
}