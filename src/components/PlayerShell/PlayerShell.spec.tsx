import { mock, instance } from "ts-mockito"

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

    let npPlaybackController = component.find(NowPlayingFragment).prop('playbackController');
    let libraryPlaybackController = component.find(LibraryFragment).prop('playbackController');

    expect(npPlaybackController).toBeDefined();
    expect(libraryPlaybackController).toBeDefined();
    expect(libraryPlaybackController).toStrictEqual(npPlaybackController);
});