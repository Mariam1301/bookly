import {
  AfterContentInit,
  Component,
  contentChild,
  input,
  signal,
  TemplateRef,
} from '@angular/core';
import { UiTemplateDirective } from '../../../directives/template/ui-template.directive';

@Component({
  standalone: true,
  selector: 'ui-data-element',
  templateUrl: './data-element.component.html',
  host: {
    class: '',
  },
})
export class UiDataElement implements AfterContentInit {
  public name = input<string>();

  public valueField = input<string>();

  public template = contentChild(UiTemplateDirective);

  public templateRef = signal<TemplateRef<any> | null>(null);

  ngAfterContentInit(): void {
    this.template() && this.templateRef.set(this.template()!.template);
  }
}

export interface DataElement {
  name?: string;
  valueField?: string;
  tempalte?: any;
  templateRef?: any;
}
