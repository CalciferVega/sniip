import QRCode from 'qrcode';

interface QRGeneratorOptions {
  width?: number;
  margin?: number;
  color?: {
    dark?: string; // Dot color (hex)
    light?: string; // Background color (hex)
  };
}

/**
 * Service for generating QR codes in Cloudflare Workers.
 * Since 'canvas' is not supported, this service focuses on SVG generation.
 */
export const qrGenerator = {
  /**
   * Generates a standard QR code as an SVG string.
   * @param text - The content to encode
   * @param options - Color and margin options
   * @returns An SVG string
   */
  async generateSVG(text: string, options: QRGeneratorOptions = {}): Promise<string> {
    return QRCode.toString(text, {
      type: 'svg',
      errorCorrectionLevel: 'H',
      margin: options.margin || 1,
      color: options.color || { dark: '#000000', light: '#ffffff' },
      width: options.width || 512,
    });
  },

  /**
   * Note: PNG generation with logo overlay is disabled in Workers 
   * due to the lack of 'canvas' support. 
   * Recommendation: Use SVG on the frontend and apply logos there,
   * or use an external specialized image processing API.
   */
  async generatePNG(): Promise<never> {
    throw new Error('PNG generation with logo overlay is not supported in the Edge runtime.');
  }
};
