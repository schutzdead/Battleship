import {describe, it, expect} from "vitest";
import { gameBoard, players } from "./main";

describe('#Position', () => {
    it('first position (square)', () => 
    expect(gameBoard().firstBoatSquare([3,2], [])).toStrictEqual([13]))
    it('close position', () => 
    expect(gameBoard().firstBoatSquare([8,2], [])).toStrictEqual([18]))

    it('last position (square) - vertical', () => 
    expect(gameBoard().lastBoatsquare([3,2], true, 4, [13])).toStrictEqual([13,43]))
    it('last position (square) - horizontal', () => 
    expect(gameBoard().lastBoatsquare([3,2], false, 4, [13])).toStrictEqual([13,16]))
    it('horizontal - close situation', () => 
    expect(gameBoard().lastBoatsquare([8,2], false, 4, [18])).toStrictEqual([15,18]))
})

describe('#SunkOrNot', () => {
    it('hit', () =>
        expect(gameBoard().receiveAttack(14, [13,18])).toBe(true))
    it('sunk', () =>
        expect(gameBoard().receiveAttack(1, [13,18])).toBe(false))
})

describe('#EndGame', () => {
    it('not the end', () => 
        expect(gameBoard().endGame([true, true, false])).toBe('Le jeu continue'))
    it('finish', () => 
        expect(gameBoard().endGame([true, true, true])).toBe('Fin du jeu'))
})

describe('#Shoot', () => {
    it('already hit', () => 
        expect(players().shoot(13,[12,19,89,13,100])).toBe('Already hit'))
    it('already hit', () => 
        expect(players().shoot(13,[12,19,89,100])).toBe('Nice shoot'))
})