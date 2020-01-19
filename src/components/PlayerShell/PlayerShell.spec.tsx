import { mock, instance } from "ts-mockito"

import * as React from "react";
import { shallow } from "enzyme";

import PlayerShell from "./PlayerShell"
import ProfileFragment from "./ProfileFragment"

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