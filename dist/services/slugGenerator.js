/**
 * Base62 alphabet: 0-9, a-z, A-Z (62 characters)
 */
const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE = BigInt(ALPHABET.length);
/**
 * Service for generating and decoding short slugs using Base62 encoding.
 * Base62 is ideal for URL shorteners as it uses only alphanumeric characters,
 * avoiding special characters that might need URL encoding.
 */
export const slugGenerator = {
    /**
     * Encodes a numeric ID into a Base62 string.
     * @param id - The unique numeric ID (e.g., from a database sequence)
     * @returns A short Base62 string
     */
    encode(id) {
        let num = BigInt(id);
        if (num === 0n)
            return ALPHABET[0];
        let result = '';
        while (num > 0n) {
            const remainder = Number(num % BASE);
            result = ALPHABET[remainder] + result;
            num = num / BASE;
        }
        return result;
    },
    /**
     * Decodes a Base62 string back into its original numeric ID.
     * @param slug - The Base62 encoded string
     * @returns The original numeric ID as a BigInt
     */
    decode(slug) {
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
    /**
     * Generates a random slug of a specific length.
     * Useful for custom or non-sequential short links.
     * @param length - The desired length of the slug (default 6)
     * @returns A random Base62 string
     */
    generateRandom(length = 6) {
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * ALPHABET.length);
            result += ALPHABET[randomIndex];
        }
        return result;
    },
};
