import QRCode from 'qrcode';
import { createCanvas, loadImage } from 'canvas';

interface QRGeneratorOptions {
  width?: number;
  margin?: number;
  color?: {
    dark?: string; // Dot color (hex)
    light?: string; // Background color (hex)
  };
  logo?: {
    buffer: Buffer;
    width?: number; // Defaults to 20% of QR width
    height?: number;
  };
}

/**
 * Service for generating customized QR codes with optional logo overlay.
 * Uses Error Correction Level 'H' (High) to allow up to 30% of data to be
 * obscured by a logo while remaining readable.
 */
export const qrGenerator = {
  /**
   * Generates a QR code as a PNG Buffer.
   * @param text - The content to encode in the QR (e.g., short URL)
   * @param options - Customization options for the QR code
   * @returns A Buffer containing the PNG image data
   */
  async generatePNG(text: string, options: QRGeneratorOptions = {}): Promise<Buffer> {
    const {
      width = 512,
      margin = 1,
      color = { dark: '#000000', light: '#ffffff' },
      logo,
    } = options;

    // 1. Generate the base QR code on a canvas
    const canvas = createCanvas(width, width);
    await QRCode.toCanvas(canvas, text, {
      errorCorrectionLevel: 'H', // Required for logo overlay safety
      width,
      margin,
      color,
    });

    const ctx = canvas.getContext('2d');

    // 2. If a logo is provided, overlay it in the center
    if (logo) {
      const logoImg = await loadImage(logo.buffer);

      // Calculate logo size (defaults to 20% of the total QR width)
      const logoWidth = logo.width || width * 0.2;
      const logoHeight = logo.height || logoWidth;

      // Center the logo
      const x = (width - logoWidth) / 2;
      const y = (width - logoHeight) / 2;

      // Draw a background behind the logo to improve contrast/readability
      // (Optional: but recommended for better scanner performance)
      ctx.fillStyle = color.light || '#ffffff';
      ctx.fillRect(x - 2, y - 2, logoWidth + 4, logoHeight + 4);

      // Draw the logo
      ctx.drawImage(logoImg, x, y, logoWidth, logoHeight);
    }

    return canvas.toBuffer('image/png');
  },

  /**
   * Generates a standard QR code as an SVG string.
   * Note: SVG logo overlay logic is more complex and typically handled by
   * embedding images or paths. This version provides a clean SVG QR.
   * @param text - The content to encode
   * @param options - Color and margin options
   * @returns An SVG string
   */
  async generateSVG(text: string, options: Pick<QRGeneratorOptions, 'margin' | 'color'> = {}): Promise<string> {
    return QRCode.toString(text, {
      type: 'svg',
      errorCorrectionLevel: 'H',
      margin: options.margin || 1,
      color: options.color || { dark: '#000000', light: '#ffffff' },
    });
  },
};
