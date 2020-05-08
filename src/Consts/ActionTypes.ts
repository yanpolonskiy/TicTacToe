/**
 * Енам игровых экшенов
 */
export enum GAME_ACTION {
  MAKE_MOVE = `MAKE_MOVE`,
}

/**
 * Вспомогательный тип для тайпгварда типа экшена и его payload.
 */
type Action<K = GAME_ACTION, V = void> = V extends void
  ? { type: K }
  : { type: K } & V;

/**
 * Тип координат.
 */
export type TCoordinates = [number, number];

/**
 * Интерфейс хода.
 * Сделано в виде обьекта для удобного добавления дополнительной информации в ход.
 */
export interface IMove {
  cell: TCoordinates;
}

/**
 * Тайпгвард игровых экшенов
 */
export type TGameActions = Action<GAME_ACTION.MAKE_MOVE, { payload: IMove }>;

/**
 * Маппинг для класса игровых экшенов.
 */
export interface IGameActions {
  [prop: string]: (props: any) => TGameActions;
}
