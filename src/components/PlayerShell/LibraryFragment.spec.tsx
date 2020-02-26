/**
 * @jest-environment jsdom
 */

import { mock, when, instance, verify } from "ts-mockito";
import JestMockPromise from "jest-mock-promise";

import * as React from "react";
import { shallow } from "enzyme";

import IAuthenticationService from "../../services/IAuthenticationService";
import IMusicPlayerController from "../../services/IMusicPlayerController";
import IMusicLibraryRepository from "../../services/IMusicLibraryRepository";

import LibraryFragment from "./LibraryFragment";

test("Must show a loading message while the repo loads all albums", async () => {
    let mockAuth = mock<IAuthenticationService>();
    let mockPlayerController = mock<IMusicPlayerController>();
    let mockLibRepo = mock<IMusicLibraryRepository>();

    let fakeAlbumsPromise = new JestMockPromise();
    when(mockLibRepo.getAllAlbumsAsync()).thenReturn(fakeAlbumsPromise as any);

    let libFragment = shallow(
        <LibraryFragment 
            authService={instance(mockAuth)} 
            playerController={instance(mockPlayerController)}
            overrideLibraryRepo={instance(mockLibRepo)} />
    );

    expect(libFragment.find('p.loading-text').text()).toEqual("Loading albums...");

    fakeAlbumsPromise.resolve([]);
    await fakeAlbumsPromise;

    expect(libFragment.find('h1.loading-text').text())
        .toEqual("No albums have been added to our library yet, please check back later!");
});