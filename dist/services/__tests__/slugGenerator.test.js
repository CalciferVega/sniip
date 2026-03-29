import { describe, it, expect } from 'vitest';
import { slugGenerator } from '../slugGenerator.js';
describe('slugGenerator', () => {
    it('should encode 0 correctly', () => {
        expect(slugGenerator.encode(0)).toBe('0');
    });
    it('should encode and decode correctly', () => {
        const ids = [1, 61, 62, 1000, 1000000, 999999999999n];
        ids.forEach((id) => {
            const slug = slugGenerator.encode(id);
            expect(slugGenerator.decode(slug)).toBe(BigInt(id));
        });
    });
    it('should generate slugs of correct length', () => {
        const slug = slugGenerator.generateRandom(8);
        expect(slug).toHaveLength(8);
    });
    it('should only contain alphanumeric characters', () => {
        const slug = slugGenerator.generateRandom(100);
        expect(slug).toMatch(/^[a-zA-Z0-9]+$/);
    });
    it('should throw error for invalid characters', () => {
        expect(() => slugGenerator.decode('invalid-slug!')).toThrow();
    });
});
