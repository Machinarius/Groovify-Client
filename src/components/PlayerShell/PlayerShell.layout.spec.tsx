jest.mock("./LibraryFragment");
jest.mock("./ProfileFragment");
jest.mock("./PlayerShell");

import { mock, instance, when } from "ts-mockito"

import * as React from "react";
import * as testRenderer from "react-test-renderer";

import IAuthenticationService from "../../services/IAuthenticationService";

import UserProfile from "../../models/UserProfile";

import PlayerShell from "./PlayerShell";

test("Must display all child components with correct CSS classes", () => {
    let fakeProfile: UserProfile = {
        name: "Germán Valencia",
        pictureUrl: "https://giphy.com/gifs/Px8HAmJdeiiIw/html5"
    };

    // TODO: Use enzyme shallow rendering with snapshots to avoid having to setup this promise
    // https://stackoverflow.com/questions/55341289/configure-enzyme-to-json-with-jest
    let fakeProfilePromise = new Promise<UserProfile>(resolve => resolve(fakeProfile));
    let mockAuthService = mock<IAuthenticationService>();
    when(mockAuthService.getProfileAsync()).thenReturn(fakeProfilePromise);

    let authService = instance(mockAuthService);
    let component = testRenderer.create(
        <PlayerShell authService={authService} />
    );

    expect(component.toJSON()).toMatchSnapshot();
});