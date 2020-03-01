import IMusicPlaybackController from "./IMusicPlaybackController";
import IAuthenticationService from "./IAuthenticationService";

export default class DefaultPlaybackController implements IMusicPlaybackController {
    constructor(
        private authService: IAuthenticationService
    ) { }
    
    public startPlayback(songId: string, albumId: string): void {
        throw new Error("Method not implemented.");
    }
}