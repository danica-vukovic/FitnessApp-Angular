import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { AuthService } from '../../../auth/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserHasCategoryService } from '../../services/user-has-category.service';
import { MatSelectionListChange } from '@angular/material/list';
import { catchError, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-subscribe-category',
  templateUrl: './subscribe-category.component.html',
  styleUrl: './subscribe-category.component.css'
})
export class SubscribeCategoryComponent {
  categories: { id: number; name: string; selected: boolean; wasSelected: boolean }[] = [];
  userId: number = 0;

  constructor(
    private categoryService: CategoryService,
    private userHasCategoryService: UserHasCategoryService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.authService.getUser()?.idUser;
    if (id !== undefined) this.userId = id;
    this.loadCategories();
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (categories: any[]) => {
        this.categories = categories.map(category => ({
          id: category.idCategory,
          name: category.name,
          selected: false,
          wasSelected: false
        }));
        this.initializeUserCategories();
      },
      (error: any) => {
        console.error('Error loading categories', error);
        this.snackBar.open('Error loading categories. Please try again later.', undefined, { duration: 3000 });
      }
    );
  }

  private initializeUserCategories(): void {
    this.categories.forEach(category => {
      this.userHasCategoryService.userHasCategory(this.userId, category.id).subscribe(
        (isSelected: boolean) => {
          category.selected = isSelected;
          category.wasSelected = isSelected; 
          console.log(category.id + " " +  isSelected);
        }
        ,
        (error: any) => {
          console.error(`Error checking category ${category.id} selection`, error);
        }
      );
    });
  }

  onSelectionChange(event: MatSelectionListChange): void {
    const selectedOptions = event.source.selectedOptions.selected;
    this.categories.forEach(category => {
      category.selected = selectedOptions.some(option => option.value === category.id);
    });
  }

  saveChanges(): void {
    const addCategories: number[] = [];
  const removeCategories: number[] = [];

  this.categories.forEach(category => {
    if (category.selected && !category.wasSelected) {
      addCategories.push(category.id);
    } else if (!category.selected && category.wasSelected) {
      removeCategories.push(category.id);
    }
  });

  const addRequests = addCategories.map(id =>
    this.userHasCategoryService.addUserCategory(this.userId, id).pipe(
      catchError(err => {
        this.snackBar.open(`Error adding category ${id}`, undefined, { duration: 2000 });
        return of(null);
      })
    )
  );

  const removeRequests = removeCategories.map(id =>
    this.userHasCategoryService.removeUserCategory(this.userId, id).pipe(
      catchError(err => {
        this.snackBar.open(`Error removing category ${id}`, undefined, { duration: 2000 });
        return of(null);
      })
    )
  );

  forkJoin([...addRequests, ...removeRequests]).subscribe(() => {
    this.snackBar.open('Changes saved successfully.', undefined, { duration: 2000 });
    this.loadCategories();
  });
}
}
