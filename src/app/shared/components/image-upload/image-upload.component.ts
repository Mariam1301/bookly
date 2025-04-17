import { Component, forwardRef, inject, input, signal } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { compressImageToTargetSize } from '../../utils/image-compressor/image-compressor';
import { ErrorType, ImageError } from '../../../core/models/image-upload.model';
import { ImageValidatorService } from '../../../core/services/image-validator/image-validator.service';
import { ImageUploadViewComponent } from './image-upload-view/image-upload-view.component';

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  imports: [
    ButtonModule,
    ImageModule,
    TranslocoModule,
    ImageUploadViewComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageUploadComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ImageUploadComponent),
      multi: true,
    },
  ],
})
export class ImageUploadComponent implements ControlValueAccessor {
  maxImages = input(1);
  maxFileSizeMB = input(0.1);

  urls = signal<string[]>([]);
  errors = signal<ImageError[]>([]);
  isLoading = signal(false);

  private onChange: (value: string[]) => void = () => {};
  private onTouched: () => void = () => {};
  private touched = false;

  private imageValidatorService = inject(ImageValidatorService);

  private transolocoService = inject(TranslocoService);

  get maxFileSizeBytes(): number {
    return this.maxFileSizeMB() * 1024 * 1024;
  }

  onFilesSelected(files: FileList) {
    this.markAsTouched();
    this.errors.set([]);

    for (const file of files) {
      const maxImageCountError =
        this.imageValidatorService.exceedsMaxImageCount(
          files.length,
          this.maxImages() - this.urls().length
        );
      const fileSizeError = this.imageValidatorService.exceedsMaxFileSize(
        file,
        this.maxFileSizeBytes
      );
      const fileTypeError = this.imageValidatorService.hasValidFileType(file);

      if (maxImageCountError) {
        this.errors.update((prev) => [...prev, maxImageCountError]);
        return;
        break;
      }

      if (fileTypeError) {
        this.errors.update((prev) => [...prev, fileTypeError]);
        continue;
      }

      if (fileSizeError) {
        this.errors.update((prev) => [...prev, fileSizeError]);
        continue;
      }

      this.uploadAndAdd(file);
    }

    this.onChange(this.urls());
  }

  private uploadAndAdd(file: File) {
    try {
      this.isLoading.set(true);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        this.urls.update((prev) => [...prev, e.target?.result as string]);
        this.onChange(this.urls());
      };
    } catch (err) {
      this.errors.update((prev) => [
        ...prev,
        {
          message: this.transolocoService.translate('failedToUpload', {
            fileName: file.name,
          }),
          type: ErrorType.SERVER_ERROR,
        },
      ]);
    } finally {
      this.isLoading.set(false);
    }
  }

  onUrlsChanged(): void {
    this.onChange(this.urls());
  }

  writeValue(value: string[]): void {
    this.urls.set(value || []);
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control?.errors?.['required'] && this.urls.length === 0) {
      return { required: true };
    }
    return null;
  }

  compressAndReupload(file: any, index: number) {
    this.isLoading.set(true);
    this.errors.update((prev) => {
      prev.splice(index, 1);
      return prev;
    });
    compressImageToTargetSize(file, this.maxFileSizeBytes)
      .then((compressedBlob) => {
        if (compressedBlob) {
          const compressedFile = new File([compressedBlob], file.name, {
            type: file.type,
          });

          if (compressedFile.size >= this.maxFileSizeBytes) {
            this.errors.update((prev) => [
              ...prev,
              {
                message: this.transolocoService.translate('compressionFailed'),
                type: ErrorType.COMPRESSION_ERROR,
              },
            ]);
            console.log('error', file.size, this.maxFileSizeBytes);
            return;
          }
          this.uploadAndAdd(compressedFile);
        }
      })
      .catch((error) => {
        this.errors.update((prev) => [
          ...prev,
          {
            message: this.transolocoService.translate('compressionFailed'),

            type: ErrorType.COMPRESSION_ERROR,
          },
        ]);
        console.error('Compression failed:', error);
      })
      .finally(() => this.isLoading.set(false));
  }
}
