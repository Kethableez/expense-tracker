import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { expandCollapse } from '../../animations/expand-collapse.animation';
import { InputErrorComponent } from '../input-error/input-error.component';

@Component({
  selector: 'ktbz-control',
  templateUrl: 'control.component.html',
  styleUrls: ['./control.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, InputErrorComponent],
  animations: [expandCollapse],
})
export class ControlComponent implements OnInit, OnDestroy {
  @Input() iconName!: string;
  @Input() label: string = '';
  @Input() type: 'text' | 'password' | 'numeric' = 'text';
  @Input() placeholder: string = '';
  @Input() control!: FormControl | AbstractControl;
  @Input() required = true;
  @Input() errorKeys = [];

  @HostListener('focusin')
  onFocusin() {
    this.isFocused = true;
  }

  @HostListener('focusout')
  onFocusout() {
    this.isFocused = false;
  }

  public isFocused = false;
  public passwordVisible = false;
  status: string = 'INVALID';
  private destroy$ = new Subject<void>();

  get formControl(): FormControl {
    return this.control as FormControl;
  }

  get controlName() {
    const formGroup = this.control.parent;
    const name = formGroup
      ? Object.keys(formGroup.controls).find(
          (name) => this.control === formGroup.get(name)
        )
      : '';
    return name;
  }

  get controlType(): 'text' | 'password' | 'numeric' {
    if (this.type === 'password') {
      return this.passwordVisible ? 'text' : 'password';
    }
    return this.type;
  }

  get areErrorsVisible(): boolean {
    return !!this.control.errors && this.isTouchedAndNotPristine;
  }

  get hasErrors() {
    if (this.isTouchedAndNotPristine && !this.isFocused) {
      return !!this.control.errors;
    }
    return false;
  }

  get statusClass(): string {
    if (this.status === 'DISABLED') return this.status.toLowerCase();
    else if (this.isTouchedAndNotPristine) {
      return this.status.toLowerCase();
    } else {
      return '';
    }
  }

  get isTouchedAndNotPristine(): boolean {
    return this.formControl.touched && !this.formControl.pristine;
  }

  get errors() {
    return this.control.errors;
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.control.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((status) => {
        this.status = status;
        this.changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  public togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
