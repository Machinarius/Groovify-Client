import { mock, when, instance, verify } from "ts-mockito";

import * as React from "react";
import * as testRenderer from "react-test-renderer";
import { shallow } from "enzyme";

import AppContainer from "./AppContainer"
import LoginSplash from "./LoginSplash/LoginSplash"
import PlayerShell from "./PlayerShell/PlayerShell";

import IAuthenticationService from "../services/IAuthenticationService";

test("Must show the LoginSplash component when there's no user logged in", () => {
    let mockAuthService = mock<IAuthenticationService>();
    when(mockAuthService.isUserAuthenticated()).thenReturn(false);

    let component = shallow(
        <AppContainer _authService={instance(mockAuthService)} />
    );
    expect(component.find(LoginSplash)).toHaveLength(1);
    verify(mockAuthService.isUserAuthenticated()).once();
});

test("Must show the PlayerShell component when ther user is logged in", () => {
    let mockAuthService = mock<IAuthenticationService>();
    when(mockAuthService.isUserAuthenticated()).thenReturn(true);

    let component = shallow(
        <AppContainer _authService={instance(mockAuthService)} />
    );
    expect(component.find(PlayerShell)).toHaveLength(1);
    verify(mockAuthService.isUserAuthenticated()).once();
});