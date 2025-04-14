import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'ui-dark-mode-toggle',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './dark-mode-toggle.component.html',
})
export class UiDarkModeToggleComponent {
  isDarkMode = signal(false);

  toggle() {
    const element = document.querySelector('html');
    element?.classList.toggle('dark');
    this.isDarkMode.update((prev) => !prev);
  }
}
