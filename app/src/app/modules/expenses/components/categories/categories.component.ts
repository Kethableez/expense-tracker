import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ControlComponent } from 'src/app/shared/forms/control/control.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'ktbz-categories',
  templateUrl: 'categories.component.html',
  styleUrls: ['./categories.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ControlComponent, ReactiveFormsModule],
  providers: [CategoryService],
})
export class CategoriesComponent implements OnInit {
  categories$ = this.categoryService.getCommonCategories();

  categoryForm!: FormGroup;
  constructor(
    private builder: FormBuilder,
    private categoryService: CategoryService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {}

  onCreate() {
    const payload = this.categoryForm.value;
    if (this.categoryForm.invalid) return;
    this.categoryService.addNewCategory(payload).subscribe({
      next: () => {
        this.notificationService.addNotification({
          header: 'Create success',
          message: 'New category was added',
          type: 'success',
          closable: true,
        });
        this.categories$ = this.categoryService.getCommonCategories();
      },
      error: ({ data }) => {
        this.notificationService.addNotification({
          header: 'Category error',
          message: data.message,
          type: 'error',
          closable: true,
        });
      },
      complete: () => this.cdr.markForCheck(),
    });
  }

  ngOnInit(): void {
    this.initCategoryForm();
  }

  initCategoryForm() {
    this.categoryForm = this.builder.group({
      name: new FormControl(null, Validators.required),
      icon: new FormControl(null, Validators.required),
    });
  }
}
