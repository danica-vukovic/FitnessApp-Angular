import { Component, Inject } from '@angular/core';
import { Level, Location, Program } from '../../../models/program';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { ProgramService } from '../../services/program.service';
import { AttributeService } from '../../services/attribute.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin, map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  form: FormGroup;
  categories: any[] = [];
  difficultyLevels: string[] = [];
  locations: string[] = [];
  availableAttributes: any[] = [];
  availableValues: any = {};
  selectedCategory: any;
  filteredPrograms: Program[] = [];
  attributesMap = new Map<number, Map<string, string[]>>();



  constructor(
    public dialogRef: MatDialogRef<FilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { programs: Program[] },
    private categoryService: CategoryService,
    private attributeService: AttributeService,
    private programService: ProgramService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      category: [null],
      difficultyLevel: [null],
      location: [null],
      attribute: [null],
      attributeValue: [[]]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.locations = [Location.GYM, Location.ONLINE, Location.PARK];
    this.difficultyLevels = [Level.BEGINNER, Level.INTERMEDIATE, Level.ADVANCED];
    this.fetchAllAttributes(this.data.programs);
    this.form.get('category')?.valueChanges.subscribe(() => this.loadAttributes());
    this.form.get('attribute')?.valueChanges.subscribe(() => this.onAttributeChange());
  }

  fetchAllAttributes(programs: Program[]): void {
    const attributesMap = new Map<number, Map<string, string[]>>();

    const requests = programs.map(program =>
      this.loadAttributesForPrograms(program.idProgram).pipe(
        tap(result => attributesMap.set(program.idProgram, result))
      )
    );

    forkJoin(requests).subscribe({
      next: () => {
        this.attributesMap = attributesMap; 
        console.log('All attributes fetched:', this.attributesMap);
      },
      error: (err) => {
        console.log("Error");
      }
    });
  }

  loadAttributesForPrograms(programId: number): Observable<Map<string, string[]>> {
    return this.programService.getAttributesByProgramId(programId).pipe(
      map((data: any[]) => {
        const resultMap = new Map<string, string[]>();

        data.forEach((element: any) => {
          const attribute = element.attribute;
          const value = element.value;
          const attributeName = attribute.name;

          if (!resultMap.has(attributeName)) {
            resultMap.set(attributeName, []);
          }
          resultMap.get(attributeName)?.push(value);
        });

        return resultMap;
      })
    );
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.error('Error loading categories', error);
      }
    );
  }

  loadAttributes(): void {
    const categoryId = this.form.get('category')?.value?.idCategory;
    if (categoryId) {
      this.categoryService.getAttributesByCategoryId(categoryId).subscribe(
        (data) => {
          this.availableAttributes = data;
          this.availableAttributes.forEach(attribute => {
            this.loadValues(attribute.idAttribute);
          });
        },
        (error) => {
          console.error('Error loading attributes', error);
        }
      );
    }
  }

  loadValues(attributeId: number): void {
    this.attributeService.getValuesByAttributeId(attributeId).subscribe((values) => {
      this.availableValues[attributeId] = values.map(value => value.value);
    });
  }

  onAttributeChange(): void {
    this.form.get('attributeValue')?.setValue([]);
  }

  onFilter(): void {
    this.onFilterChange();
    this.dialogRef.close(this.filteredPrograms);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onFilterChange(): void {
    const filterValues = this.form.value;
    const filteredPrograms = this.data.programs.filter(program => {
      return (
        (!filterValues.category || program.category.name === filterValues.category.name) &&
        (!filterValues.difficultyLevel || program.level === filterValues.difficultyLevel) &&
        (!filterValues.location || program.location === filterValues.location) &&
        this.matchesAttributes(program, filterValues)
      );
    });

    this.filteredPrograms = filteredPrograms;
  }

  matchesAttributes(program: Program, filterValues: any): boolean {
    const attributeId = filterValues.attribute;
    const selectedValues = filterValues.attributeValue;

    if (!attributeId) return true;

    const programAttributes = this.attributesMap.get(program.idProgram);
    const selectedAttribute = this.availableAttributes.find(attr => attr.idAttribute === attributeId)?.name;

    if (!programAttributes || !selectedAttribute || !programAttributes.has(selectedAttribute)) return false;
    if (selectedValues.length === 0) return true;

    const programValues = programAttributes.get(selectedAttribute) || [];

    return selectedValues.every((value: any) => programValues.includes(value));
  }

}

