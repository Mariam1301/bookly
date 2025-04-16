import { inject, Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { ErrorType } from '../../models/image-upload.model';

@Injectable({ providedIn: 'root' })
export class ImageValidatorService {
  private translocoService = inject(TranslocoService);

  exceedsMaxImageCount(currentCount: number, maxImages: number) {
    if (currentCount > maxImages) {
      return {
        message: this.translocoService.translate('maxImageCountError', {
          maxImageCount: maxImages,
        }),
        type: ErrorType.MAX_IMAGES,
      };
    } else {
      return false;
    }
  }

  exceedsMaxFileSize(file: File, maxSizeBytes: number) {
    if (file.size > maxSizeBytes) {
      return {
        message: this.translocoService.translate('fileSizeLimitExceededError', {
          fileSize: this.formatBytes(maxSizeBytes),
          uploadedFileSize: this.formatBytes(file.size),
        }),
        type: ErrorType.FILE_SIZE,
        data: { file },
      };
    } else {
      return false;
    }
  }

  hasValidFileType(file: File) {
    if (!file.type.startsWith('image/')) {
      return {
        message: this.translocoService.translate('imageFileTypeError', {
          fileType: file.type,
        }),
        type: ErrorType.FILE_TYPE,
      };
    } else {
      return false;
    }
  }

  private formatBytes(bytes: number): string {
    return (bytes / 1024 / 1024).toFixed(2) + 'MB';
  }
}
