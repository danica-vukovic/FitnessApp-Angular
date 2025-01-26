import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Program } from '../../../models/program';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  filteredPrograms: Program[] = [];
  nameSearch: string = '';
  priceSearch: number | null = null;
  durationSearch: number | null = null;
  instructorInfoSearch: string = '';
  contactSearch: string = '';
  creatorSearch: string = '';

  constructor(public dialogRef: MatDialogRef<SearchComponent>,   @Inject(MAT_DIALOG_DATA) public data: { programs: Program[] } ) {
 
  }
  ngOnInit(): void {}

 
  onSearchChange(): void {
    console.log(this.data);
    this.filteredPrograms = this.data.programs.filter(program => {
      return (
        (!this.nameSearch || program.name.toLowerCase().includes(this.nameSearch.toLowerCase())) &&
        (!this.priceSearch || program.price <= this.priceSearch) &&
        (!this.durationSearch || program.duration <= this.durationSearch) &&
        (!this.instructorInfoSearch || program.instructorInformation.toLowerCase().includes(this.instructorInfoSearch.toLowerCase())) &&
        (!this.contactSearch || program.contact.toLowerCase().includes(this.contactSearch.toLowerCase())) && 
        (!this.creatorSearch || program.user?.name.toLowerCase().includes(this.creatorSearch.toLowerCase())) 
      );
    });
  }

  onSearch(): void {
    this.onSearchChange();
    console.log(this.filteredPrograms);
    this.dialogRef.close(this.filteredPrograms); 
  }

  onCancel(): void {
    this.dialogRef.close(); 
  }
}
