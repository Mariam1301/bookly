import { Directive, TemplateRef, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[uiTemplate]',
})
export class UiTemplateDirective {
  public template: TemplateRef<any>;

  @Input('uiTemplate') name: string = '';

  constructor(template: TemplateRef<any>) {
    this.template = template;
  }
}
