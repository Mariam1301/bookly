import { Component, signal } from '@angular/core';
import {
  NavigationModel,
  UiNavigationComponent,
} from '../../shared/components/navigation/navigation.component';
import { UiHeaderComponent } from '../../shared/components/header/header.component';
import { RouterModule } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [
    UiHeaderComponent,
    UiNavigationComponent,
    RouterModule,
    DrawerModule,
  ],
  templateUrl: './wrapper.component.html',
})
export class WrapperComponent {
  isMenuOpen = signal(false);

  navigationArray: NavigationModel[] = [
    // {
    //   title: 'company',
    //   path: 'company',
    // },
  ];

  toggleIsMenuOpen() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }
}
