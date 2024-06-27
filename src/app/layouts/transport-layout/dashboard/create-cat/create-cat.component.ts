import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriesService } from '../../../../services/categories/categories.service';
import { ICategory } from '../../../../interfaces/categories.interface';

@Component({
  selector: 'app-category-create',
  templateUrl: './create-cat.component.html',
  styleUrls: ['./create-cat.component.scss']
})
export class CreateCatComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private categoriesService: CategoriesService
  ) {
    this.categoryForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.spinner.show();
      const newCategory: ICategory = this.categoryForm.value;
      this.categoriesService.createCategory(newCategory).subscribe(res => {
        this.toaster.success('Category created successfully');
        this.spinner.hide();
        this.router.navigate(['/co-transport/admin/categories']);
      }, err => {
        this.toaster.error('Failed to create category');
        this.spinner.hide();
      });
    } else {
      this.toaster.error('Please fill in all required fields');
    }
  }

  onCancel(): void {
    this.router.navigate(['/co-transport/admin/categories']);
  }
}
