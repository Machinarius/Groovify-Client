/**
 * @jest-environment jsdom
 */

import { mock, verify } from "ts-mockito";
import JestMockPromise from "jest-mock-promise";

import * as React from "react";
import * as testRenderer from "react-test-renderer";
import { shallow } from "enzyme";

import ProgressUI from "./ProgressUI";

test("Must show a progress bar element while the promise is resolving and then hide its own UI when the promise resolves", async () => {
    let mockPromise = new JestMockPromise();
    let fakePromise = mockPromise as any as Promise<number>;
    let fakePromiseFn = () => fakePromise;
    let component = testRenderer.create(
        <ProgressUI promiseFactory={fakePromiseFn} callback={(_result, _error) => {}} />
    );

    expect(component.toJSON()).toMatchSnapshot();
    
    mockPromise.resolve(42);
    await fakePromise;
    
    expect(component.toJSON()).toMatchSnapshot();
});

test("Must show a progress bar element while the promise is resolving and then show an error message when the promise rejects", async () => {
    let mockPromise = new JestMockPromise();
    let fakePromise = mockPromise as any as Promise<number>;
    let fakePromiseFn = () => fakePromise;
    let component = testRenderer.create(
        <ProgressUI promiseFactory={fakePromiseFn} callback={(_result, _error) => {}} />
    );

    expect(component.toJSON()).toMatchSnapshot();
    
    let expectedError = new Error("This is expected");
    mockPromise.reject(expectedError);
    try { await mockPromise; } catch (e) { }
    
    expect(component.toJSON()).toMatchSnapshot();
});

test("Must call the promise factory function and deliver the result into the callback", async () => {
    var deliveredResult: number;

    let mockPromise = new JestMockPromise();
    let fakePromise = mockPromise as any as Promise<number>;
    let fakePromiseFn = () => fakePromise;
    let component = testRenderer.create(
        <ProgressUI promiseFactory={fakePromiseFn} callback={(result, _error) => { deliveredResult = result; }} />
    );

    let expectedResult = 42;
    mockPromise.resolve(expectedResult);
    await fakePromise;

    expect(deliveredResult).toEqual(expectedResult);
});

test("Must call the promise factory function and deliver the error into the callback", async () => {
    var deliveredError: Error;

    let mockPromise = new JestMockPromise();
    let fakePromise = mockPromise as any as Promise<number>;
    let fakePromiseFn = () => fakePromise;
    let component = testRenderer.create(
        <ProgressUI promiseFactory={fakePromiseFn} callback={(_result, error) => { deliveredError = error; }} />
    );

    let expectedError = new Error("This is expected");
    mockPromise.reject(expectedError);
    try { await mockPromise; } catch (e) { }

    expect(deliveredError).toBe(expectedError);
});

test("Must retry calling the promise when the user clicks retry", async () => {
    var callCount = 0;

    let mockPromises = [new JestMockPromise(), new JestMockPromise()];
    let fakePromiseFn = () => {
        return mockPromises[callCount++] as any as Promise<number>;
    };
    let component = shallow(
        <ProgressUI promiseFactory={fakePromiseFn} callback={(_result, _error) => { }} />
    );

    let expectedError = new Error("This is expected");
    mockPromises[0].reject(expectedError);
    try { await mockPromises[0]; } catch (e) { }
    
    component.find('button.retry-button').simulate('click');
    expect(callCount).toEqual(2);
});