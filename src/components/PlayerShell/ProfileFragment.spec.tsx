import { mock, instance, when, verify } from "ts-mockito"

import * as React from "react";
import { shallow } from "enzyme";

import ProfileFragment from "./ProfileFragment"

import IAuthenticationService from "../../services/IAuthenticationService";
import UserProfile from "../../models/UserProfile";

test("Must immediately load and display the user profile data", async () => {
    let fakeProfile: UserProfile = {
        name: "Germán Valencia",
        pictureUrl: "https://giphy.com/gifs/Px8HAmJdeiiIw/html5"
    };

    let fakeProfilePromise = new Promise<UserProfile>(resolve => resolve(fakeProfile));
    let mockAuthService = mock<IAuthenticationService>();
    when(mockAuthService.getProfileAsync()).thenReturn(fakeProfilePromise);

    let component = shallow(
        <ProfileFragment authService={instance(mockAuthService)} />
    );
    expect(component.find("p.loading-message").text()).toEqual("Loading data...");

    await fakeProfilePromise;
    expect(component.find("p.profile-name").text()).toEqual("Welcome, " + fakeProfile.name);
    expect(component.find("img.profile-picture").prop("src")).toEqual(fakeProfile.pictureUrl);
});

test("Must call logOut on the Auth Service instance when the user clicks 'Log Out'", async () => {
    let fakeProfile: UserProfile = {
        name: "Germán Valencia",
        pictureUrl: "https://giphy.com/gifs/Px8HAmJdeiiIw/html5"
    };

    let fakeProfilePromise = new Promise<UserProfile>(resolve => resolve(fakeProfile));
    let mockAuthService = mock<IAuthenticationService>();
    when(mockAuthService.getProfileAsync()).thenReturn(fakeProfilePromise);
    when(mockAuthService.logOut()).thenReturn();

    let component = shallow(
        <ProfileFragment authService={instance(mockAuthService)} />
    );
    await fakeProfilePromise;
    
    expect(component.find("button.logout-button").text()).toEqual("Log Out");
    component.find("button.logout-button").simulate('click');

    verify(mockAuthService.logOut()).once();
});