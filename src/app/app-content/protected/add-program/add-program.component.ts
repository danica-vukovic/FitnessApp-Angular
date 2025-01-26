import { catchError, EMPTY, forkJoin, map, of, switchMap } from "rxjs";
import { ProgramRequest } from "../../../models/program-request";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Category } from "../../../models/category";
import { ImageRequest } from "../../../models/image-request";
import { User } from "../../../models/user";
import { CategoryService } from "../../services/category.service";
import { ProgramService } from "../../services/program.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ImageService } from "../../services/image.service";
import { AuthService } from "../../../auth/services/auth.service";
import { AttributeDialogComponent } from "../../public/attribute-dialog/attribute-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { ProgramHasAttributeRequest } from "../../../models/program-has-attribute-request";
import { ProgramHasAttributeService } from "../../services/program-has-attribute.service";

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.css']
})
export class AddProgramComponent implements OnInit {

  programForm: FormGroup;
  categories: Category[] = [];
  selectedFiles: File[] = [];
  private images: ImageRequest[] = [];
  private user!: User;
  private programId: number = 0;
  selectedAttributeValues: Map<number, any[]> = new Map<number, any[]>();
  isLoading: boolean = false;

  difficultyLevels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
  locations = ['ONLINE', 'GYM', 'PARK'];

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private programService: ProgramService, private authService: AuthService,
    private imageService: ImageService, private snackBar: MatSnackBar, private dialog: MatDialog, private hasAttributeService: ProgramHasAttributeService) {
    this.programForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      level: ['', Validators.required],
      duration: ['', Validators.required],
      location: ['', Validators.required],
      instructorInformation: ['', Validators.required],
      contact: ['', Validators.required],
      videoUrl: [null],
      category: ['', Validators.required],
      images: [[]]
    });

    const user = this.authService.getUser();
    if (user) {
      this.user = user;
    }
  }

  ngOnInit(): void {
    this.loadCategories();

    this.programForm.get('location')?.valueChanges.subscribe((value) => {
      if (value === 'ONLINE') {
        this.programForm.get('videoUrl')?.setValidators([Validators.required]);
      } else {
        this.programForm.get('videoUrl')?.clearValidators();
      }

      this.programForm.get('videoUrl')?.updateValueAndValidity();
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error loading categories', error);
      }
    );
  }

  addProgram(): void {
    if (this.programForm.valid) {
      this.isLoading = true;

      this.addImages().subscribe({
        next: (images: any) => {
          this.images = images;

          const programRequest: ProgramRequest = {
            name: this.programForm.value.name,
            description: this.programForm.value.description,
            price: this.programForm.value.price,
            level: this.programForm.value.level,
            duration: this.programForm.value.duration,
            location: this.programForm.value.location,
            instructorInformation: this.programForm.value.instructorInformation,
            contact: this.programForm.value.contact,
            videoUrl: this.programForm.value.videoUrl ? this.programForm.value.videoUrl : '',
            categoryId: this.programForm.value.category.idCategory,
            userId: this.user.idUser,
            images: this.images,
          };

          this.programService.addProgram(programRequest).subscribe({
            next: (data) => {
              this.programId = data.idProgram;
              this.processAttributeValues();
            },
            error: () => {
              this.snackBar.open('An error occurred!', undefined, { duration: 2000 })
              this.isLoading = false;
            },
            complete: () => {
              this.snackBar.open('Program created successfully!', undefined, {
                duration: 4000,
              });
              this.resetForm();
              this.isLoading = false;
            },
          });
        },
        error: () =>
          this.snackBar.open('An error occurred while uploading photos!', undefined, { duration: 2000 })
      });
    }
  }

  private resetForm(): void {
    this.programForm.reset();
    this.selectedFiles = [];
    this.images = [];
    this.selectedAttributeValues.clear();
  }

  private processAttributeValues(): void {
    const requests: ProgramHasAttributeRequest[] = [];

    this.selectedAttributeValues.forEach((values, idAttribute) => {
      for (let v of values) {
        const programHasAttributeRequest = new ProgramHasAttributeRequest(this.programId, idAttribute, v);
        requests.push(programHasAttributeRequest);
      }
    });
    ;
    if (requests.length > 0) {
      forkJoin(
        requests.map(request =>
          this.hasAttributeService.addAttribute(request).pipe(
            catchError(() => {
              this.snackBar.open('An error occurred!', undefined, { duration: 2000 });
              return EMPTY;
            })
          )
        )
      ).subscribe();
    } else {
      this.snackBar.open('No attribute values to add!', undefined, { duration: 2000 });
    }
  }


  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files) {
      const newFiles = Array.from(input.files);
      this.selectedFiles = [...this.selectedFiles, ...newFiles];
    }
  }

  private addImages() {
    if (this.selectedFiles.length === 0) { return of([]); }
    const uploadObservables = this.selectedFiles.map((file) =>
      this.imageService.uploadFile(file).pipe(
        switchMap((response) => this.imageService.getImageUrl(response)),
        map((url) => ({
          url: url ?? '',
          programId: this.programId
        }))
      )
    );

    return forkJoin(uploadObservables);
  }

  onCategoryChange(category: Category): void {

    const dialogRef = this.dialog.open(AttributeDialogComponent, {
      width: '500px',
      data: { category: category.idCategory }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedAttributeValues.clear();
        result.forEach((item: { attributeId: number; values: any[] }) => {
          this.selectedAttributeValues.set(item.attributeId, item.values);
        });
      }
    });
  }
}
