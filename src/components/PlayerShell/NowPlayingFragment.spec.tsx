/**
 * @jest-environment jsdom
 */

import { mock, when, instance } from "ts-mockito";

import * as React from "react";
import { shallow } from "enzyme";
import { Subject } from "rxjs";

import NowPlayingFragment from "./NowPlayingFragment";

import IMusicPlaybackController from "../../services/IMusicPlaybackController";

import { PlaybackStatus } from "../../models/PlaybackStatus";
import { PlayerState } from "../../models/PlayerState";
import { Album } from "../../models/Album";
import Song from "../../models/Song";

const fakeSong: Song = {
   id: "3",
   title: "A Masterclass in F1 Engine Reliability",
   artists: "Cyril Abiteboul",
   lengthInSeconds: 100
};

const fakeAlbum: Album = {
   id: "1",
   title: "Renault F1",
   artists: "Daniel Ricciardo; Nico Hülkenberg",
   coverUrl: "https://giphy.com/gifs/Ln9GC8yBgHJmxTQkOR/html5",
   songs: [fakeSong]
};

var fakePlayerState: PlayerState;
var fakeController: IMusicPlaybackController;
var stateSubject: Subject<PlayerState>;

beforeEach(() => {
   fakePlayerState = {
      status: PlaybackStatus.Stopped,
      canSkipToNext: false,
      canSkipToPrevious: false,
      currentAlbum: null,
      currentSong: null,
      playbackPositionInSeconds: 0
   };

   stateSubject = new Subject<PlayerState>();

   fakeController = mock<IMusicPlaybackController>();
   when(fakeController.getCurrentPlayerState()).thenReturn(fakePlayerState);
   when(fakeController.playerStateChanges()).thenReturn(stateSubject);
 });

 test("Must show a disabled UI when the PlaybackStatus is Stopped", () => {
   let component = shallow(
      <NowPlayingFragment playbackController={instance(fakeController)} />
   );

   expect(component.find(".playback-button.play.disabled")).toHaveLength(1);
   expect(component.find(".next-button.disabled")).toHaveLength(1);
   expect(component.find(".previous-button.disabled")).toHaveLength(1);
   expect(component.find(".playback-progress.disabled")).toHaveLength(1);
   expect(component.find(".playback-position").text()).toEqual("0:00");
   expect(component.find(".playback-length").text()).toEqual("0:00");
   expect(component.find(".current-title")).toHaveLength(0);
   expect(component.find(".current-artist")).toHaveLength(0);
   expect(component.find("img.current-cover")).toHaveLength(0);
 });

 test("Must show an enabled UI when the PlaybackStatus is Playing", () => {
   fakePlayerState.status = PlaybackStatus.Playing;
   fakePlayerState.currentAlbum = fakeAlbum;
   fakePlayerState.currentSong = fakeSong;
   fakePlayerState.playbackPositionInSeconds = 34;

   let component = shallow(
      <NowPlayingFragment playbackController={instance(fakeController)} />
   );

   expect(component.find(".playback-button.pause")).toHaveLength(1);
   expect(component.find(".next-button.disabled")).toHaveLength(1);
   expect(component.find(".previous-button.disabled")).toHaveLength(1);
   expect(component.find(".playback-progress").getElement().props["value"]).toEqual(fakePlayerState.playbackPositionInSeconds);
   expect(component.find(".playback-position").text()).toEqual("0:34");
   expect(component.find(".playback-length").text()).toEqual("1:40");
   expect(component.find(".current-title").text()).toEqual(fakeSong.title);
   expect(component.find(".current-artists").text()).toEqual(fakeSong.artists);
   expect(component.find("img.current-cover").getElement().props["src"]).toEqual(fakeAlbum.coverUrl);
 });

 test("Must update it's state to reflect the player state updates", () => {
   let component = shallow(
      <NowPlayingFragment playbackController={instance(fakeController)} />
   );

   expect(component.find(".playback-button.play.disabled")).toHaveLength(1);
   
   fakePlayerState.status = PlaybackStatus.Playing;
   fakePlayerState.currentAlbum = fakeAlbum;
   fakePlayerState.currentSong = fakeSong;
   fakePlayerState.playbackPositionInSeconds = 34;
   
   stateSubject.next(fakePlayerState);
   component.update();

   expect(component.find(".playback-button.pause")).toHaveLength(1);
 });
