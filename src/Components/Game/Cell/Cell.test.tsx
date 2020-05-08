import React from 'react';
import {Cell} from './Cell';
import {EValue} from 'Consts/GameConsts';
import renderer from 'react-test-renderer';
import {TCoordinates} from '../../../Consts/ActionTypes';

/**
 * Тест отрисовки клетки Cell.
 */
test("renders cell", () => {
    const tree = renderer
    .create(<Cell coordinates={[1,2]} value={EValue.X} onClick={(coordinates: TCoordinates) => coordinates}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});
