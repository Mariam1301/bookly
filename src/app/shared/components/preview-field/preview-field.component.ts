import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-preview-field',
  standalone: true,
  imports: [],
  templateUrl: './preview-field.component.html',
})
export class PreviewFieldComponent {
  label = input.required();
}
