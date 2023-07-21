import { createCanvas, loadImage } from 'canvas';

export async function stitchImages(urls: string[]): Promise<string> {
  const images = await Promise.all(urls.map(url => loadImage(url)));

  const totalWidth = images.reduce((sum, img) => sum + img.width, 0);
  const maxHeight = Math.max(...images.map(img => img.height));

  const canvas = createCanvas(totalWidth, maxHeight);
  const context = canvas.getContext("2d");

  let currentX = 0;
  for (const img of images) {
    context.drawImage(img, currentX, 0, img.width, img.height);
    currentX += img.width;
  }

  return canvas.toDataURL();
}