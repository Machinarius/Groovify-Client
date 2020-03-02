import { PlayerState } from "../models/PlayerState";
import { Observable } from "rxjs";

export default interface IMusicPlaybackController {
    playerStateChanges(): Observable<PlayerState>;
    getCurrentPlayerState(): PlayerState;
    startPlayback(songId: string, albumId: string): void;
}