import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'ui-navigation',
  standalone: true,
  imports: [RouterModule, TranslocoModule],
  templateUrl: './navigation.component.html',
})
export class UiNavigationComponent {
  navigation = input.required<NavigationModel[]>();

  navigationClicked = output();
}

export interface NavigationModel {
  title: string;
  path: string;
  icon?: string;
  subItems?: NavigationModel[];
}
