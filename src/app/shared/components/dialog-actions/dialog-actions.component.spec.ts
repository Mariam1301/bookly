import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiDialogActionsComponent } from './dialog-actions.component';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { NgClass } from '@angular/common';
import { getTranslocoModule } from '../../../transloco.testing.module';

describe('UiDialogActionsComponent', () => {
  let component: UiDialogActionsComponent;
  let componentRef: ComponentRef<UiDialogActionsComponent>;
  let fixture: ComponentFixture<UiDialogActionsComponent>;
  let dynamicDialogRef: DynamicDialogRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiDialogActionsComponent, NgClass, getTranslocoModule()],
      providers: [
        {
          provide: DynamicDialogRef,
          useValue: { close: jest.fn() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UiDialogActionsComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    dynamicDialogRef = TestBed.inject(DynamicDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have disabled input default to false', () => {
    expect(component.disabled()).toBe(false);
  });

  it('should have showCancel input default to false', () => {
    expect(component.showCancel()).toBe(false);
  });

  it('should display cancel button when showCancel is true', () => {
    componentRef.setInput('showCancel', true);
    fixture.detectChanges();

    let cancelButton = fixture.debugElement.query(
      By.css('[data-testid="cancel-button"]'),
    );

    expect(cancelButton).toBeTruthy();
  });

  it('should hide cancel button when showCancel is false', () => {
    componentRef.setInput('showCancel', false);
    fixture.detectChanges();

    let cancelButton = fixture.debugElement.query(
      By.css('[data-testid="cancel-button"]'),
    );

    expect(cancelButton).toBeNull();
  });

  it('should disable save button when disabled is true', () => {
    componentRef.setInput('disabled', true);
    fixture.detectChanges();

    let saveButton = fixture.debugElement.query(
      By.css('[data-testid="save-button"]'),
    );

    expect(saveButton.nativeElement.disabled).toBe(true);
  });

  it('should not disable save button when disabled is false', () => {
    componentRef.setInput('disabled', false);

    let saveButton = fixture.debugElement.query(
      By.css('[data-testid="save-button"]'),
    );

    expect(saveButton.nativeElement.disabled).toBe(false);
  });

  it('should translate save text on save button', () => {
    let saveButton = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="save-button"]',
    );

    expect(saveButton.textContent?.trim()).toBe('Save');
  });

  it('should translate cancel text on save button', () => {
    componentRef.setInput('showCancel', true);
    fixture.detectChanges();

    let cancelButton = fixture.debugElement.nativeElement.querySelector(
      '[data-testid="cancel-button"]',
    );

    expect(cancelButton.textContent?.trim()).toBe('Cancel');
  });

  it('should emit saveClicked event when save button is clicked', () => {
    jest.spyOn(component.saveClicked, 'emit');

    let saveButton = fixture.debugElement.query(
      By.css('[data-testid="save-button"]'),
    );

    saveButton.nativeElement.click();

    expect(component.saveClicked.emit).toHaveBeenCalled();
  });

  it('should call ref.close() when cancel button is clicked', () => {
    componentRef.setInput('showCancel', true);
    fixture.detectChanges();

    let cancelButton = fixture.debugElement.query(
      By.css('[data-testid="cancel-button"]'),
    );

    cancelButton.nativeElement.click();

    expect(dynamicDialogRef.close).toHaveBeenCalled();
  });
});
