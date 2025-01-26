import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Program } from '../../../models/program';
import { SearchComponent } from '../../public/search/search.component';
import { FilterComponent } from '../../public/filter/filter.component';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.css']
})
export class ProgramListComponent  implements OnInit  {

  @Input() programs: Program[] = [];
  @Input() listTitle: string = '';
  ogPrograms: Program[] = [];
  pagedPrograms: Program[] = [];
  length: number = 0;
  pageSize: number = 3;
  pageSizeOptions: number[] = [3, 5, 10];
  currentIndex: number = 0;

  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['programs']) {
      this.ogPrograms = this.programs;
      this.updatePagedPrograms(this.ogPrograms);
    }
  }

  ngOnInit(): void {
    this.ogPrograms = this.programs;
    this.updatePagedPrograms(this.ogPrograms);
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = Math.min(startIndex + event.pageSize, this.length);
    this.pagedPrograms = this.programs.slice(startIndex, endIndex);
  }

  openProgramDetails(item: Program): void {
    this.router.navigate(['/programs/program-details', item.idProgram], {
      state: { program: item },
    });
  }

  public showSearchDialog(): void {
    const dialogRef = this.dialog.open(SearchComponent, {
      data: { programs: this.programs },
      width: '600px',
      height:'600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.programs = result;
        this.updatePagedPrograms(this.programs);
      }
    });
  }

  public showFilterDialog(): void {
     const dialogRef = this.dialog.open(FilterComponent, {
      data: { programs: this.programs },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.programs = result;
        this.updatePagedPrograms(this.programs);
      }
    });
  }

  private updatePagedPrograms( programs: Program[] ): void {
    this.length = programs.length;
    this.pagedPrograms = programs.slice(0, this.pageSize);
  }

  public resetPrograms(): void {
    this.programs = this.ogPrograms;
    this.updatePagedPrograms(this.programs);
  }

}
