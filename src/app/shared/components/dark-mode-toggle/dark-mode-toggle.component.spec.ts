import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiDarkModeToggleComponent } from './dark-mode-toggle.component';
import { By } from '@angular/platform-browser';

describe('UiDarkModeToggleComponent', () => {
  let component: UiDarkModeToggleComponent;
  let fixture: ComponentFixture<UiDarkModeToggleComponent>;
  let button: HTMLButtonElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(UiDarkModeToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    button = fixture.debugElement.query(
      By.css('[data-testid="dark-mode-toggle-button"]'),
    ).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default isDarkMode value as false', () => {
    expect(component.isDarkMode()).toBe(false);
  });

  it('should toggle isDarkMode value on button click', () => {
    button.click();
    expect(component.isDarkMode()).toBe(true);

    button.click();
    expect(component.isDarkMode()).toBe(false);
  });

  it('should toggle dark class on html element on button click', () => {
    button.click();
    expect(document.querySelector('html')?.classList.contains('dark')).toBe(
      true,
    );

    button.click();
    expect(document.querySelector('html')?.classList.contains('dark')).toBe(
      false,
    );
  });
});
