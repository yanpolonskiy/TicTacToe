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

/**
 * По заданию должен быть один экшен.
 * Можно было написать экшен, который принимает различные type c payload и обрабатывать их в редьюсере, чтобы
 * перенести массив поля в него, но мне такой подход с экшеном не нравится. Перенос массива поля внутрь убережет нас
 * от обьекта игрового поля и необходимости приводить индексы toString, но не ложится на текущий экшен.
 */
