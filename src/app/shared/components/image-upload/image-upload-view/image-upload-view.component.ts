import {
  Component,
  ElementRef,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { TranslocoDirective } from '@jsverse/transloco';
import {
  ErrorType,
  ImageError,
} from '../../../../core/models/image-upload.model';

@Component({
  templateUrl: './image-upload-view.component.html',
  selector: 'app-image-upload-view',
  imports: [ImageModule, ButtonModule, TranslocoDirective],
})
export class ImageUploadViewComponent {
  urls = model<string[]>();
  errors = input<ImageError[]>();
  isLoading = input<boolean>(false);
  maxImages = input<number>(1);

  filesSelected = output<FileList>();
  retryImage = output<{ file: File; index: number }>();

  errorTypes = ErrorType;

  fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    this.filesSelected.emit(input.files);
    this.fileInput() && (this.fileInput()!.nativeElement.value = '');
  }

  onRemoveImage(index: number) {
    const urls = [...(this.urls() || [])];
    urls.splice(index, 1);
    this.urls.set(urls);
  }

  onRetryImage(file: File, index: number) {
    this.retryImage.emit({ file, index });
  }
}
