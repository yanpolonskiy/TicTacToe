import {checkWin} from './Utils';
import {EValue} from 'Consts/GameConsts';

/**
 * Тесты проверки функции нахождения победителя.
 */
describe('checkWin util tests', () => {
    /**
     * Подгруппа тестов на проверку нахождения победителя по горизонтале.
     */
    describe('should find horizontal wins', () => {
        const board = {
            '0,0': EValue.X,
            '0,1': EValue.X,
            '0,2': EValue.X,
            '0,3': EValue.X,
            '0,4': EValue.X,
            '1,1': EValue.O,
            '1,2': EValue.O,
            '1,3': EValue.O,
            '1,4': EValue.O,
        };

        /**
         * Тесты на нахождения победителя при ходе в конце/внутри/начале победной линиий.
         */
        it('make move in the end of line', () => {
            const cell = [0, 4];
            expect(checkWin(board, cell[0], cell[1])).toBe(true);
        });
        it('make move inside line', () => {
            const cell = [0, 3];
            expect(checkWin(board, cell[0], cell[1])).toBe(true);
        });
        it('make move in the start of line', () => {
            const cell = [0, 0];
            expect(checkWin(board, cell[0], cell[1])).toBe(true);
        });
    });

    /**
     * Подгруппа тестов на проверку нахождения победителя по вертикале.
     */
    describe('should find vertical wins', () => {
        const board = {
            '0,0': EValue.X,
            '1,0': EValue.X,
            '2,0': EValue.X,
            '3,0': EValue.X,
            '4,0': EValue.X,
            '1,1': EValue.O,
            '1,2': EValue.O,
            '1,3': EValue.O,
            '1,4': EValue.O,
        };

        /**
         * Тесты на нахождения победителя при ходе в конце/внутри/начале победной линиий.
         */
        it('make move in the end of line', () => {
            const cell = [4, 0];
            expect(checkWin(board, cell[0], cell[1])).toBe(true);
        });
        it('make move inside line', () => {
            const cell = [3, 0];
            expect(checkWin(board, cell[0], cell[1])).toBe(true);
        });
        it('make move in the start of line', () => {
            const cell = [0, 0];
            expect(checkWin(board, cell[0], cell[1])).toBe(true);
        });
    });

    /**
     * Подгруппа тестов на проверку нахождения победителя по диагонале.
     */
    describe('should find diagonal wins', () => {
        const board = {
            '0,0': EValue.X,
            '1,1': EValue.X,
            '2,2': EValue.X,
            '3,3': EValue.X,
            '4,4': EValue.X,
            '1,0': EValue.O,
            '1,2': EValue.O,
            '1,3': EValue.O,
            '1,4': EValue.O,
        };

        /**
         * Тесты на нахождения победителя при ходе в конце/внутри/начале победной линиий.
         */
        it('make move in the end of line', () => {
            const cell = [4, 4];
            expect(checkWin(board, cell[0], cell[1])).toBe(true);
        });
        it('make move inside line', () => {
            const cell = [2, 2];
            expect(checkWin(board, cell[0], cell[1])).toBe(true);
        });
        it('make move in the start of line', () => {
            const cell = [0, 0];
            expect(checkWin(board, cell[0], cell[1])).toBe(true);
        });
    });
});
