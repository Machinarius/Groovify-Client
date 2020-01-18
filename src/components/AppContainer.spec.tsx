import { mock, when, instance, verify } from "ts-mockito";

import * as React from "react";
import * as testRenderer from "react-test-renderer";
import { shallow } from "enzyme";

import { Subject, Observable } from "rxjs";

import AppContainer from "./AppContainer"
import LoginSplash from "./LoginSplash/LoginSplash"
import PlayerShell from "./PlayerShell/PlayerShell";

import IAuthenticationService from "../services/IAuthenticationService";

test("Must show the LoginSplash component when there's no user logged in", () => {
    let mockAuthService = mock<IAuthenticationService>();
    when(mockAuthService.isUserAuthenticated()).thenReturn(false);
    when(mockAuthService.authStateChanges()).thenReturn(new Observable<boolean>());

    let component = shallow(
        <AppContainer _authService={instance(mockAuthService)} />
    );
    expect(component.find(LoginSplash)).toHaveLength(1);
    verify(mockAuthService.isUserAuthenticated()).once();
});

test("Must show the PlayerShell component when ther user is logged in", () => {
    let mockAuthService = mock<IAuthenticationService>();
    when(mockAuthService.isUserAuthenticated()).thenReturn(true);
    when(mockAuthService.authStateChanges()).thenReturn(new Observable<boolean>());

    let component = shallow(
        <AppContainer _authService={instance(mockAuthService)} />
    );
    expect(component.find(PlayerShell)).toHaveLength(1);
    verify(mockAuthService.isUserAuthenticated()).once();
});

test("Must update the UI when the Authentication state changes", () => {
    let fakeAuthStateSubject = new Subject<boolean>();

    let mockAuthService = mock<IAuthenticationService>();
    when(mockAuthService.isUserAuthenticated()).thenReturn(false);
    when(mockAuthService.authStateChanges()).thenReturn(fakeAuthStateSubject);

    let component = shallow(
        <AppContainer _authService={instance(mockAuthService)} />
    );
    expect(component.find(LoginSplash)).toHaveLength(1);

    fakeAuthStateSubject.next(true);
    expect(component.find(PlayerShell)).toHaveLength(1);
    
    fakeAuthStateSubject.next(false);
    expect(component.find(LoginSplash)).toHaveLength(1);
});