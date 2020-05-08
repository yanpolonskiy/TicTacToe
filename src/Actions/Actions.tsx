import { IMove, GAME_ACTION } from "Consts/ActionTypes";

/**
 * Игровые экшены (по заданию - один).
 */
export class GameActions {
  // Экшен выполнения хода.
  makeMove = (move: IMove): { payload: IMove; type: GAME_ACTION } => {
    return {
      type: GAME_ACTION.MAKE_MOVE,
      payload: move,
    };
  };
}

