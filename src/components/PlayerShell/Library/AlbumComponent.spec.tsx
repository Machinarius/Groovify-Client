import * as React from "react";

import { shallow } from "enzyme";

import { Album } from "../../../models/Album";

import AlbumComponent from "./AlbumComponent";
import SongComponent from "./SongComponent";

test("Must show the title and the cover of the album object", () => {
    let fakeAlbum: Album = {
        id: "1",
        artists: "Max Verstappen; Alex Albon",
        coverUrl: "https://giphy.com/gifs/gLLGj2bYYm2mm6nwVT/html5",
        songs: [],
        title: "AstonMartin RedBull Racing Honda"
    };

    let component = shallow(
        <AlbumComponent albumObject={fakeAlbum} onPlaybackRequested={jest.fn()} />
    );

    expect(component.find(".album-title").text()).toEqual(fakeAlbum.title);
    expect(component.find(".album-artists").text()).toEqual(fakeAlbum.artists);
    expect(component.find("img.album-cover").getElement().props["src"]).toEqual(fakeAlbum.coverUrl);
    expect(component.find(".album-no-songs").text()).toEqual("This Album has no songs.");
});

test("Must show a SongComponent for each song in the album", () => {
    let fakeAlbum: Album = {
        id: "1",
        artists: "Sergio Perez; Lance Stroll",
        coverUrl: "https://giphy.com/gifs/H6t9FUcjJBRiDICHdb/html5",
        songs: [{
            id: "1",
            title: "Standing on the shoulders of Giants; Literally",
            artists: "Lawrence Stroll",
            lengthInSeconds: 101
        }],
        title: "BWT Racing Point MercedesAMG"
    };

    let component = shallow(
        <AlbumComponent albumObject={fakeAlbum} onPlaybackRequested={jest.fn()} />
    );

    expect(component.find(SongComponent).prop("songObject")).toBe(fakeAlbum.songs[0]);
});

test("Must fire the playbackRequested callback when a SongComponent child is clicked twice", () => {
    let fakeAlbum: Album = {
        id: "5",
        artists: "Romain Grosjean; Kevin Magnussen",
        coverUrl: "https://giphy.com/gifs/1NQADhT7xoKzxYmjso/html5",
        songs: [{
            id: "13",
            title: "Hard Times",
            artists: "Romain Grosjean",
            lengthInSeconds: 10
        }],
        title: "Haas F1 Ferrari"
    };

    let playbackRequestedHandler = jest.fn();
    let component = shallow(
        <AlbumComponent albumObject={fakeAlbum} onPlaybackRequested={playbackRequestedHandler} />
    );
    component.find(SongComponent).prop("onPlaybackRequested")(fakeAlbum.songs[0].id);

    expect(playbackRequestedHandler).toHaveBeenCalledWith(
        fakeAlbum.songs[0].id,
        fakeAlbum.id
    );
    expect(playbackRequestedHandler).toHaveBeenCalledTimes(1);
});
