import type { Tide } from '@/models/tide';
import { generateTideFragments } from './generateTideFragments';

describe('generateTideFragments', () => {
  const baseTide: Tide = {
    isRising: 1,
    start: { date: '2025-08-04', time: '06:00', height: 2.0 },
    end: { date: '2025-08-04', time: '12:00', height: 8.0 },
    range: 6.0,
    duration: 360, // minutes (6h)
    hour: 60, // minutes between fragments
  };

  it('should generate 7 fragments for a rising tide', () => {
    const fragments = generateTideFragments(baseTide);
    expect(fragments).toHaveLength(7);
    expect(fragments[0].label).toBe('BM');
    expect(fragments[6].label).toBe('PM');
    expect(fragments[0].height).toBeCloseTo(2.0);
    expect(fragments[6].height).toBeCloseTo(8.0);
  });

  it('should generate 7 fragments for a falling tide', () => {
    const fallingTide = {
      ...baseTide,
      isRising: 0,
      start: { ...baseTide.start, height: 8.0 },
      end: { ...baseTide.end, height: 2.0 },
    };
    const fragments = generateTideFragments(fallingTide);
    expect(fragments).toHaveLength(7);
    expect(fragments[0].label).toBe('PM');
    expect(fragments[6].label).toBe('BM');
    expect(fragments[0].height).toBeCloseTo(8.0);
    expect(fragments[6].height).toBeCloseTo(2.0);
  });

  it('should compute correct intermediate heights for rising tide', () => {
    const fragments = generateTideFragments(baseTide);
    // 2.0 + 1/12*6 = 2.5, 2.5 + 2/12*6 = 3.5, 3.5 + 3/12*6 = 5.0, etc.
    expect(fragments[1].height).toBeCloseTo(2.5); // 1/12
    expect(fragments[2].height).toBeCloseTo(3.5); // 2/12
    expect(fragments[3].height).toBeCloseTo(5.0); // 3/12
    expect(fragments[4].height).toBeCloseTo(6.5); // 3/12
    expect(fragments[5].height).toBeCloseTo(7.5); // 2/12
  });

  it('should compute correct intermediate heights for falling tide', () => {
    const fallingTide = {
      ...baseTide,
      isRising: 0,
      start: { ...baseTide.start, height: 8.0 },
      end: { ...baseTide.end, height: 2.0 },
    };
    const fragments = generateTideFragments(fallingTide);
    expect(fragments[1].height).toBeCloseTo(7.5); // 1/12
    expect(fragments[2].height).toBeCloseTo(6.5); // 2/12
    expect(fragments[3].height).toBeCloseTo(5.0); // 3/12
    expect(fragments[4].height).toBeCloseTo(3.5); // 3/12
    expect(fragments[5].height).toBeCloseTo(2.5); // 2/12
  });
});
