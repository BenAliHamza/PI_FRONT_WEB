import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategory } from "../../../../interfaces/categories.interface";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { CategoriesService } from "../../../../services/categories/categories.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: ICategory[] = [];
  filteredCategories: ICategory[] = [];
  selectedCategory: ICategory | null = null;
  searchText: string = '';
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private categoriesService: CategoriesService,
  ) {
    this.categoryForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    this.categoriesService.getCategories().subscribe(res => {
      this.categories = res;
      this.filteredCategories = res;
      this.spinner.hide();
    }, err => {
      this.toaster.error('Failed to load categories');
      this.spinner.hide();
    });
  }

  filterCategories(): void {
    this.filteredCategories = this.categories.filter(category =>
      category.nom.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  onCategoryClick(category: ICategory): void {
    this.selectedCategory = category;
    this.categoryForm.patchValue({
      nom: category.nom,
      description: category.description
    });
  }

  onCancel(): void {
    this.selectedCategory = null;
    this.categoryForm.reset();
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.spinner.show();
      const updatedCategory: ICategory = {
        ...this.selectedCategory,
        ...this.categoryForm.value
      };
      this.categoriesService.updateCategory(updatedCategory).subscribe(res => {
        this.toaster.success('Category updated successfully');
        this.spinner.hide();
        this.onCancel();
        this.ngOnInit(); // Refresh the categories list
      }, err => {
        this.toaster.error('Failed to update category');
        this.spinner.hide();
      });
    } else {
      this.toaster.error('Please fill in all required fields');
    }
  }

  delete(): void {
    if (this.selectedCategory) {
      this.spinner.show();
      this.categoriesService.delete(this.selectedCategory._id).subscribe(
        res => {
          this.toaster.success('Category deleted successfully');
          this.spinner.hide();
          this.selectedCategory = null; // Clear the selected category
          this.ngOnInit(); // Refresh the categories list
        },
        err => {
          this.toaster.error('Failed to delete category');
          this.spinner.hide();
        }
      );
    }
  }

}
