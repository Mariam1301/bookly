export async function compressImageToTargetSize(
  file: File,
  targetSize: number,
  timeoutMs: number = 20000 // default 10 seconds
): Promise<File> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Provided file is not an image.');
  }

  const dataUrl = await readFileAsDataURL(file);
  const image = await loadImage(dataUrl);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context.');

  let width = image.naturalWidth;
  let height = image.naturalHeight;
  let quality = 0.95;
  const minQuality = 0.05;
  const minScale = 0.1;
  let scale = 1.0;

  const startTime = Date.now();
  let blob: Blob | null = null;

  while (true) {
    const elapsed = Date.now() - startTime;
    if (elapsed > timeoutMs) {
      console.warn('Compression timed out. Returning best-effort result.');
      break;
    }

    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    let tempQuality = quality;

    while (tempQuality >= minQuality) {
      blob = await compressToBlob(canvas, tempQuality);
      if (blob.size <= targetSize) {
        return new File([blob], file.name.replace(/\.\w+$/, '.jpg'), {
          type: 'image/jpeg',
          lastModified: Date.now(),
        });
      }
      tempQuality -= 0.05;

      if (Date.now() - startTime > timeoutMs) {
        console.warn('Compression timed out during quality loop.');
        break;
      }
    }

    scale -= 0.1;
    if (scale < minScale) break;
  }

  if (!blob) throw new Error('Image compression failed entirely.');

  return new File([blob], file.name.replace(/\.\w+$/, '.jpg'), {
    type: 'image/jpeg',
    lastModified: Date.now(),
  });
}

// Helpers remain the same...

function compressToBlob(
  canvas: HTMLCanvasElement,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) reject(new Error('Compression failed.'));
        else resolve(blob);
      },
      'image/jpeg',
      quality
    );
  });
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image.'));
    img.src = src;
  });
}
