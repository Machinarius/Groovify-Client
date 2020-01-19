/**
 * @jest-environment jsdom
 */

import { mock, when, instance, verify } from "ts-mockito";
import JestMockPromise from "jest-mock-promise";

import * as React from "react";
import { shallow } from "enzyme";

import { Subject, Observable } from "rxjs";

import AppContainer from "./AppContainer"
import LoginSplash from "./LoginSplash/LoginSplash"
import PlayerShell from "./PlayerShell/PlayerShell";

import IAuthenticationService from "../services/IAuthenticationService";

test("Must show a Loading message while the Authentication Service initializes", async () => {
    let fakeInitPromise = new JestMockPromise();
    let mockAuthService = mock<IAuthenticationService>();
    when(mockAuthService.initAsync()).thenReturn(fakeInitPromise as any);
    when(mockAuthService.isUserAuthenticated()).thenReturn(false);
    when(mockAuthService.authStateChanges()).thenReturn(new Observable<boolean>());

    let component = shallow(
        <AppContainer _authService={instance(mockAuthService)} />
    );
    expect(component.find("#loading-message")).toHaveLength(1);
    verify(mockAuthService.initAsync()).once();

    fakeInitPromise.resolve();
    await fakeInitPromise; // This await forces the Promise to finish flushing?

    expect(component.find(LoginSplash)).toHaveLength(1);
    verify(mockAuthService.isUserAuthenticated()).once();
});

test("Must show the LoginSplash component when there's no user logged in", async () => {
    let fakeInitPromise = new Promise((resolve) => { resolve(); });
    let mockAuthService = mock<IAuthenticationService>();
    when(mockAuthService.initAsync()).thenReturn(fakeInitPromise);
    when(mockAuthService.isUserAuthenticated()).thenReturn(false);
    when(mockAuthService.authStateChanges()).thenReturn(new Observable<boolean>());

    let component = shallow(
        <AppContainer _authService={instance(mockAuthService)} />
    );

    await fakeInitPromise;
    expect(component.find(LoginSplash)).toHaveLength(1);
    verify(mockAuthService.isUserAuthenticated()).once();
});

test("Must show the PlayerShell component when ther user is logged in", async () => {
    let fakeInitPromise = new Promise((resolve) => { resolve(); });
    let mockAuthService = mock<IAuthenticationService>();
    when(mockAuthService.initAsync()).thenReturn(fakeInitPromise);
    when(mockAuthService.isUserAuthenticated()).thenReturn(true);
    when(mockAuthService.authStateChanges()).thenReturn(new Observable<boolean>());

    let component = shallow(
        <AppContainer _authService={instance(mockAuthService)} />
    );

    await fakeInitPromise;
    expect(component.find(PlayerShell)).toHaveLength(1);
    verify(mockAuthService.isUserAuthenticated()).once();
});

test("Must update the UI when the Authentication state changes", async () => {
    let fakeInitPromise = new Promise((resolve) => { resolve(); });
    let fakeAuthStateSubject = new Subject<boolean>();

    let mockAuthService = mock<IAuthenticationService>();
    when(mockAuthService.initAsync()).thenReturn(fakeInitPromise);
    when(mockAuthService.isUserAuthenticated()).thenReturn(false);
    when(mockAuthService.authStateChanges()).thenReturn(fakeAuthStateSubject);

    let component = shallow(
        <AppContainer _authService={instance(mockAuthService)} />
    );
    
    await fakeInitPromise;
    expect(component.find(LoginSplash)).toHaveLength(1);

    fakeAuthStateSubject.next(true);
    expect(component.find(PlayerShell)).toHaveLength(1);
    
    fakeAuthStateSubject.next(false);
    expect(component.find(LoginSplash)).toHaveLength(1);
});

test("Must flow the initialized Authentication Service into the LoginSplash child component", async () => {
    let fakeInitPromise = new Promise((resolve) => { resolve(); });
    let mockAuthService = mock<IAuthenticationService>();
    when(mockAuthService.initAsync()).thenReturn(fakeInitPromise);
    when(mockAuthService.isUserAuthenticated()).thenReturn(false);
    when(mockAuthService.authStateChanges()).thenReturn(new Observable<boolean>());

    let authService = instance(mockAuthService);
    let component = shallow(
        <AppContainer _authService={authService} />
    );

    await fakeInitPromise;
    
    let loginSplashComponent = component.find(LoginSplash);
    expect(loginSplashComponent.prop('authService')).toBe(authService);
});