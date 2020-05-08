import React from 'react';
import {Button} from './Button';
import renderer from 'react-test-renderer';

/**
 * Тест отрисовки кнопки.
 */
test("renders button", () => {
    const tree = renderer
    .create(<Button>Тестовая кнопка</Button>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});
