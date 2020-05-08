import {GameActions} from './Actions';
import {GAME_ACTION} from 'Consts/ActionTypes';

/**
 * Тест выполнения экшена хода.
 */
describe('makeMove actions', () => {
    it('should send make move action', () => {
        const gameActions = new GameActions();
        const payload = {cell: [0, 0]};
        const expectedAction = {
            type: GAME_ACTION.MAKE_MOVE,
            payload
        };
        expect(gameActions.makeMove({cell: [0, 0]})).toEqual(expectedAction)
    });
});
