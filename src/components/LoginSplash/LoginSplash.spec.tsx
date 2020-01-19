/**
 * @jest-environment jsdom
 */

import { mock, when, instance, verify } from "ts-mockito";

import * as React from "react";
import { shallow } from "enzyme";

import LoginSplash from "./LoginSplash"

import IAuthenticationService from "../../services/IAuthenticationService";

test("Must render a Login Button", () => {
    let mockAuthService = mock<IAuthenticationService>();
    let component = shallow(
        <LoginSplash authService={instance(mockAuthService)} />
    );

    expect(component.find("button")).toHaveLength(1);
    expect(component.find("button").text()).toEqual("Log In");
});

test("Must call beginLogin on the supplied Authentication Service when the users clicks the Login Button", () => {
    let mockAuthService = mock<IAuthenticationService>();
    when(mockAuthService.beginLogin()).thenReturn();

    let component = shallow(
        <LoginSplash authService={instance(mockAuthService)} />
    );
    component.find("button").simulate('click');

    verify(mockAuthService.beginLogin()).once();
});