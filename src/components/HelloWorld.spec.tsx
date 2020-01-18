import * as React from 'react';
import * as testRenderer from 'react-test-renderer';

import { shallow } from 'enzyme';
import HelloWorld from './HelloWorld'

test("Must show the hello message for the prop values passed in", () => {
    let component = shallow(<HelloWorld compiler="TypeScript" framework="Jest" />);
    expect(component.text()).toBe("Hello from TypeScript and Jest");
});

test("Must match the snapshot", () => {
    let component = testRenderer.create(
        <HelloWorld compiler="TypeScript" framework="Jest" />
    );
    let treeData = component.toJSON();
    expect(treeData).toMatchSnapshot();
});