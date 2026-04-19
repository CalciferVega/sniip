/**
 * Base62 alphabet: 0-9, a-z, A-Z (62 characters)
 */
const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE = BigInt(ALPHABET.length);

/**
 * Service for generating and decoding short slugs using Base62 encoding.
 */
export const slugGenerator = {
  encode(id: number | bigint): string {
    let num = BigInt(id);
    if (num === 0n) return ALPHABET[0];

    let result = '';
    while (num > 0n) {
      const remainder = Number(num % BASE);
      result = ALPHABET[remainder] + result;
      num = num / BASE;
    }

    return result;
  },

  decode(slug: string): bigint {
    let result = 0n;
    for (let i = 0; i < slug.length; i++) {
      const char = slug[i];
      const index = ALPHABET.indexOf(char);

      if (index === -1) {
        throw new Error(`Invalid character in slug: ${char}`);
      }

      result = result * BASE + BigInt(index);
    }
    return result;
  },

  generateRandom(length: number = 6): string {
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * ALPHABET.length);
      result += ALPHABET[randomIndex];
    }
    return result;
  },
};
