import { mock, instance, when } from "ts-mockito"

import * as React from "react";
import * as testRenderer from "react-test-renderer";
import { shallow } from "enzyme";

import PlayerShell from "./PlayerShell";
import ProfileFragment from "./ProfileFragment";
import LibraryFragment from "./LibraryFragment";
import NowPlayingFragment from "./NowPlayingFragment";

import IAuthenticationService from "../../services/IAuthenticationService";
import UserProfile from "../../models/UserProfile";

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

test("Must display all child components with correct CSS classes", () => {
    let fakeProfile: UserProfile = {
        name: "Germán Valencia",
        pictureUrl: "https://giphy.com/gifs/Px8HAmJdeiiIw/html5"
    };

    let fakeProfilePromise = new Promise<UserProfile>(resolve => resolve(fakeProfile));
    let mockAuthService = mock<IAuthenticationService>();
    when(mockAuthService.getProfileAsync()).thenReturn(fakeProfilePromise);

    let authService = instance(mockAuthService);
    let component = testRenderer.create(
        <PlayerShell authService={authService} />
    );

    expect(component.toJSON()).toMatchSnapshot();
});