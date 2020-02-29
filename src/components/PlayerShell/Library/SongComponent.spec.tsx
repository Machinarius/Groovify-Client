import * as React from "react";
import { shallow } from "enzyme";

import Song from "../../../models/Song";

import SongComponent from "./SongComponent";

test("Must show the title, artist and length of the song", () => {
    let fakeSong: Song = {
        id: "1",
        title: "Singaporean Forced Induction",
        artists: "Sebastian Vettel; Mattia Binotto",
        lengthInSeconds: 7113
        // https://giphy.com/gifs/iJDLBX5GY8niCpZYkR/html5
    };

    let component = shallow(
        <SongComponent songObject={fakeSong} onPlaybackRequested={(id) => {}} />
    );

    expect(component.find(".song-title").text()).toEqual(fakeSong.title);
    expect(component.find(".song-artists").text()).toEqual(fakeSong.artists);
    expect(component.find(".song-length").text()).toEqual("1:58:33");
});

test("Must fire the playback requested callback when the user double-clicks the component", () => {
    let fakeSong: Song = {
        id: "1",
        title: "Singaporean Forced Induction",
        artists: "Sebastian Vettel; Mattia Binotto",
        lengthInSeconds: 7113
        // https://giphy.com/gifs/iJDLBX5GY8niCpZYkR/html5
    };

    let playbackRequestedHandler = jest.fn();
    let component = shallow(
        <SongComponent songObject={fakeSong} onPlaybackRequested={playbackRequestedHandler} />
    );

    component.simulate("doubleclick");
    expect(playbackRequestedHandler).toHaveBeenCalledWith(fakeSong.id);
    expect(playbackRequestedHandler.mock.calls.length).toBe(1);
});