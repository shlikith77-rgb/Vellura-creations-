// Client-side image compression to allow unlimited products without browser storage quota issues
export const compressImageFile = (file: File, maxDimension = 1000, quality = 0.82): Promise<string> => {
  return new Promise((resolve) => {
    // If it's not an image, fall back to basic base64
    if (!file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }

        // Draw and compress to lightweight JPEG
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    };
    reader.onerror = () => {
      resolve('');
    };
    reader.readAsDataURL(file);
  });
};
