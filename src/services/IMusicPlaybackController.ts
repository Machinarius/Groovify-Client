export default interface IMusicPlaybackController {
    startPlayback(songId: string, albumId: string): void;
}