import React = require('react');
import { shallow } from 'enzyme';
import HelloWorld from './HelloWorld'

test("HelloWorld component", () => {
    var component = shallow(<HelloWorld compiler="TypeScript" framework="Jest" />);
    expect(component.text()).toBe("Hello from TypeScript and Jest");
});