import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoService } from '@jsverse/transloco';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'ui-language-switch',
  standalone: true,
  imports: [SelectButtonModule, FormsModule],
  templateUrl: './language-switch.component.html',
})
export class UiLanguageSwitchComponent implements OnInit {
  private readonly _translocoService = inject(TranslocoService);
  languageOptions = signal<string[]>([]);
  currentLang = signal<string>('en');

  ngOnInit(): void {
    this.languageOptions.set(
      this._translocoService.getAvailableLangs() as string[]
    );
    this.currentLang.set(this._translocoService.getActiveLang());
  }
  switchLang(lang: string) {
    if (lang) {
      this._translocoService.setActiveLang(lang);
      this.currentLang.set(lang);
    }
  }
}
