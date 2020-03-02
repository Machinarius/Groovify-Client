import { PlaybackStatus } from "./PlaybackStatus";
import { Album } from "./Album";
import Song from "./Song";

export interface PlayerState {
    status: PlaybackStatus;
    currentAlbum: Album;
    currentSong: Song;
    
    playbackPositionInSeconds: number;
    canSkipToPrevious: boolean;
    canSkipToNext: boolean;
}