import {describe, it, expect} from "vitest";
import {boatPosition} from "./boatCreation";

describe.skip('#Position', () => {
    it('first position (square)', () => 
    expect(boatPosition().firstBoatSquare([3,2])).toStrictEqual([13]))
    it('close position', () => 
    expect(boatPosition().firstBoatSquare([8,2])).toStrictEqual([18]))

    it('last position (square) - vertical', () => 
    expect(boatPosition().lastBoatsquare([3,2], true, 4, [13])).toStrictEqual([13,23,33,43]))
    it('last position (square) - horizontal', () => 
    expect(boatPosition().lastBoatsquare([3,2], false, 4, [13])).toStrictEqual([13,14,15,16]))
    it('horizontal - close situation', () => 
    expect(boatPosition().lastBoatsquare([10,2], false, 4, [20])).toStrictEqual([17,18,19,20]))
    it('vertical - close situation', () => 
    expect(boatPosition().lastBoatsquare([2,10], true, 4, [92])).toStrictEqual([62,72,82,92]))
})
