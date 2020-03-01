/**
 * @jest-environment jsdom
 */

import { mock, when, instance, verify } from "ts-mockito";
import JestMockPromise from "jest-mock-promise";

import * as React from "react";
import { shallow } from "enzyme";

import IAuthenticationService from "../../services/IAuthenticationService";
import IMusicPlaybackController from "../../services/IMusicPlaybackController";
import IMusicLibraryRepository from "../../services/IMusicLibraryRepository";

import LibraryFragment from "./LibraryFragment";
import { Album } from "../../models/Album";
import AlbumComponent from "./Library/AlbumComponent";

test("Must show a loading message while the repo loads all albums", async () => {
    let mockAuth = mock<IAuthenticationService>();
    let mockPlayerController = mock<IMusicPlaybackController>();
    let mockLibRepo = mock<IMusicLibraryRepository>();

    let fakeAlbumsPromise = new JestMockPromise();
    when(mockLibRepo.getAllAlbumsAsync()).thenReturn(fakeAlbumsPromise as any);

    let libFragment = shallow(
        <LibraryFragment 
            authService={instance(mockAuth)} 
            playbackController={instance(mockPlayerController)}
            overrideLibraryRepo={instance(mockLibRepo)} />
    );

    expect(libFragment.find('p.loading-text').text()).toEqual("Loading albums...");

    fakeAlbumsPromise.resolve([]);
    await fakeAlbumsPromise;

    expect(libFragment.find('h1.loading-text').text())
        .toEqual("No albums have been added to our library yet, please check back later!");
});

test("Must create an Album component for each album returned by the repo", async () => {
    let mockAuth = mock<IAuthenticationService>();
    let mockPlayerController = mock<IMusicPlaybackController>();
    let mockLibRepo = mock<IMusicLibraryRepository>();

    let fakeAlbums: Album[] = [{
        id: "1",
        artists: "Max Verstappen; Alex Albon",
        coverUrl: "https://giphy.com/gifs/gLLGj2bYYm2mm6nwVT/html5",
        songs: [],
        title: "AstonMartin RedBull Racing Honda"
    }, {
        id: "2",
        artists: "Pierre Gasly; Daniil Kvyat",
        coverUrl: "https://giphy.com/gifs/J135X4eddLifucdrrs/html5",
        songs: [],
        title: "ToroRosso Honda"
    }];
    let fakeAlbumsPromise = new Promise<Album[]>(resolve => resolve(fakeAlbums));
    when(mockLibRepo.getAllAlbumsAsync()).thenReturn(fakeAlbumsPromise);

    let libFragment = shallow(
        <LibraryFragment 
            authService={instance(mockAuth)} 
            playbackController={instance(mockPlayerController)}
            overrideLibraryRepo={instance(mockLibRepo)} />
    );

    await fakeAlbumsPromise;

    let albumComponents = libFragment.find(AlbumComponent);
    expect(albumComponents).toHaveLength(2);

    let redBullAlbum = albumComponents.at(0);
    expect(redBullAlbum.prop("albumObject")).toEqual(fakeAlbums[0]);

    let toroRossoAlbum = albumComponents.at(1);
    expect(toroRossoAlbum.prop("albumObject")).toEqual(fakeAlbums[1]);
});

test("Must forward the playbackRequested event to the playback Controller", async () => {
    let mockAuth = mock<IAuthenticationService>();
    let mockPlayerController = mock<IMusicPlaybackController>();
    let mockLibRepo = mock<IMusicLibraryRepository>();

    let fakeAlbums: Album[] = [{
        id: "17",
        artists: "Sebastian Vettel; Charles Leclerc",
        coverUrl: "https://giphy.com/gifs/mRoCaQMjS6xvgabiho/html5",
        songs: [{
            id: "48",
            artists: "Sebastial Vettel",
            title: "The top spin",
            lengthInSeconds: 10
        }],
        title: "Scuderia Ferrari"
    }];

    let fakeAlbumsPromise = new Promise(resolve => resolve(fakeAlbums));
    when(mockLibRepo.getAllAlbumsAsync()).thenReturn(fakeAlbumsPromise as any);

    let libFragment = shallow(
        <LibraryFragment 
            authService={instance(mockAuth)} 
            playbackController={instance(mockPlayerController)}
            overrideLibraryRepo={instance(mockLibRepo)} />
    );
    await fakeAlbumsPromise;

    libFragment.find(AlbumComponent).prop("onPlaybackRequested")(fakeAlbums[0].songs[0].id, fakeAlbums[0].id);
    verify(mockPlayerController.startPlayback(fakeAlbums[0].songs[0].id, fakeAlbums[0].id)).once();
});