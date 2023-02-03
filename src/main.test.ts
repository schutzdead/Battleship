import {describe, it, expect} from "vitest";
import { gameBoard} from "./factoryFunction";

describe('#Position', () => {
    it('first position (square)', () => 
    expect(gameBoard().firstBoatSquare([3,2])).toStrictEqual([13]))
    it('close position', () => 
    expect(gameBoard().firstBoatSquare([8,2])).toStrictEqual([18]))

    it('last position (square) - vertical', () => 
    expect(gameBoard().lastBoatsquare([3,2], true, 4, [13])).toStrictEqual([13,23,33,43]))
    it('last position (square) - horizontal', () => 
    expect(gameBoard().lastBoatsquare([3,2], false, 4, [13])).toStrictEqual([13,14,15,16]))
    it('horizontal - close situation', () => 
    expect(gameBoard().lastBoatsquare([10,2], false, 4, [20])).toStrictEqual([17,18,19,20]))
    it('vertical - close situation', () => 
    expect(gameBoard().lastBoatsquare([2,10], true, 4, [92])).toStrictEqual([62,72,82,92]))
})

describe('#SunkOrNot', () => {
    it('hit', () =>
        expect(gameBoard().receiveAttack(14, [13,18])).toBe(true))
    it('sunk', () =>
        expect(gameBoard().receiveAttack(1, [13,18])).toBe(false))
})