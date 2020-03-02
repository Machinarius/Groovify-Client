import { Observable, Subject } from "rxjs";

import IMusicPlaybackController from "./IMusicPlaybackController";
import IAuthenticationService from "./IAuthenticationService";

import { PlaybackStatus } from "../models/PlaybackStatus";
import { PlayerState } from "../models/PlayerState";

import GroovifyAPIMusicLibraryRepository from "./GroovifyAPIMusicLibraryRepository";

export default class DefaultPlaybackController implements IMusicPlaybackController {
    private changes: Subject<PlayerState>;
    private libRepo: GroovifyAPIMusicLibraryRepository;

    private currentState: PlayerState;

    constructor(
        private authService: IAuthenticationService
    ) { 
        this.changes = new Subject<PlayerState>();
        this.libRepo = new GroovifyAPIMusicLibraryRepository();

        this.currentState = {
            status: PlaybackStatus.Stopped,
            currentAlbum: null,
            currentSong: null,
            canSkipToNext: false,
            canSkipToPrevious: false,
            playbackPositionInSeconds: 0
        };
    }
    
    public startPlayback(songId: string, albumId: string): void {
        this.libRepo.getAllAlbumsAsync()
            .then(albums => {
                let album = albums.find(_album => _album.id == albumId);
                let song = album.songs.find(_song => _song.id == songId);

                this.currentState.currentAlbum = album;
                this.currentState.currentSong = song;
                this.currentState.status = PlaybackStatus.Playing;
                this.changes.next(this.currentState);
            });
    }
    
    playerStateChanges(): Observable<PlayerState> {
        return this.changes;
    }

    getCurrentPlayerState(): PlayerState {
        return this.currentState;
    }
}