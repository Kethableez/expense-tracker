import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'error',
  standalone: true,
})
export class ErrorPipe implements PipeTransform {
  transform(error: { key: string; value: any }): any {
    const { key, value } = error;
    switch (key) {
      case 'required':
        return 'This field is required';
      case 'email':
        return 'Provide a valid e-mail address';
      case 'minlength':
        return `This field requires more than ${value.requiredLength} characters`;
      case 'maxlength':
        return `This field requires less than ${value.requiredLength} characters`;
      case 'taken':
        return `This ${value.field} is taken`;
      case 'pattern':
        return 'Invalid pattern';
      case 'mustMatch':
        return `${value.label} must match`;
      default:
        return 'Validation errors';
    }
  }
}
