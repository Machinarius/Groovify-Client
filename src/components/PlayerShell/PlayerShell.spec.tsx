import { mock, instance, when } from "ts-mockito"

import * as React from "react";
import { shallow } from "enzyme";

import PlayerShell from "./PlayerShell";
import ProfileFragment from "./ProfileFragment";
import LibraryFragment from "./LibraryFragment";
import NowPlayingFragment from "./NowPlayingFragment";

import IAuthenticationService from "../../services/IAuthenticationService";

test("Must show a Profile Fragment", () => {
    let mockAuthService = mock<IAuthenticationService>();
    let authService = instance(mockAuthService);
    let component = shallow(
        <PlayerShell authService={authService} />
    );

    expect(component.find(ProfileFragment)).toHaveLength(1);
    expect(component.find(ProfileFragment).prop('authService')).toBe(authService);
});

test("Must show a Library Fragment", () => {
    let mockAuthService = mock<IAuthenticationService>();
    let authService = instance(mockAuthService);
    let component = shallow(
        <PlayerShell authService={authService} />
    );

    expect(component.find(LibraryFragment)).toHaveLength(1);
    expect(component.find(LibraryFragment).prop('authService')).toBe(authService);
});

test("Must show a NowPlaying Fragment", () => {
    let mockAuthService = mock<IAuthenticationService>();
    let authService = instance(mockAuthService);
    let component = shallow(
        <PlayerShell authService={authService} />
    );

    expect(component.find(NowPlayingFragment)).toHaveLength(1);
    expect(component.find(NowPlayingFragment).prop('authService')).toBe(authService);
});

test("Must create a music player controller and flow it to the library and now playing components", () => {
    let mockAuthService = mock<IAuthenticationService>();
    let authService = instance(mockAuthService);
    let component = shallow(
        <PlayerShell authService={authService} />
    );

    let npPlayerController = component.find(NowPlayingFragment).prop('playerController');
    let libraryPlayerController = component.find(LibraryFragment).prop('playerController');

    expect(npPlayerController).toBeDefined();
    expect(libraryPlayerController).toBeDefined();
    expect(libraryPlayerController).toStrictEqual(npPlayerController);
});