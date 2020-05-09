import { gameReducer } from "./Reducers";
import { GAME_ACTION, TCoordinates, TGameActions } from "Consts/ActionTypes";
import { EValue } from "Consts/GameConsts";

/**
 * Тесты игрового редьюсера.
 */
describe("reducers test", () => {
  /**
   * Проверка инициализации.
   */
  it("should return the initial state", () => {
    expect(gameReducer(undefined, {} as TGameActions)).toEqual({
      board: {},
      turn: EValue.X,
      hasWinner: false,
    });
  });

  /**
   * Проверка начала игры.
   */
  it("should handle start game action", () => {
    expect(
      gameReducer(undefined, {
        type: GAME_ACTION.MAKE_MOVE,
        payload: { cell: [0, 0] },
      })
    ).toEqual({
      board: { [[0, 0].toString()]: EValue.X },
      turn: EValue.O,
      hasWinner: false,
    });
  });

  /**
   * Проверка выполнения хода.
   */
  it("should handle move action", () => {
    const initialState = {
      board: { [[0, 0].toString()]: EValue.X },
      turn: EValue.O,
      hasWinner: false,
    };
    const cell = [2, 2] as TCoordinates;
    expect(
      gameReducer(initialState, {
        type: GAME_ACTION.MAKE_MOVE,
        payload: { cell },
      })
    ).toEqual({
      board: {
        [[0, 0].toString()]: EValue.X,
        [[cell[0], cell[1]].toString()]: EValue.O,
      },
      turn: EValue.X,
      hasWinner: false,
    });
  });

  /**
   * Проверка установления флага true при нахождении победителя.
   */
  it("should find winner", () => {
    const initialState = {
      board: {
        "0,0": EValue.X,
        "0,1": EValue.X,
        "0,2": EValue.X,
        "0,3": EValue.X,
        "1,1": EValue.O,
        "1,2": EValue.O,
        "1,3": EValue.O,
        "1,4": EValue.O,
      },
      turn: EValue.X,
      hasWinner: false,
    };
    const cell = [0, 4] as TCoordinates;
    expect(
      gameReducer(initialState, {
        type: GAME_ACTION.MAKE_MOVE,
        payload: { cell },
      })
    ).toEqual({
      board: {
        ...initialState.board,
        [[cell[0], cell[1]].toString()]: EValue.X,
      },
      turn: EValue.X,
      hasWinner: true,
    });
  });
});
