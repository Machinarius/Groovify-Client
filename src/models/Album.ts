import Song from "./Song";

export interface Album {
    id: string,
    coverUrl: string,
    title: string,
    artists: string
    songs: Song[]
}