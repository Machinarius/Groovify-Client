import { Album } from "../models/Album";

export default interface IMusicLibraryRepository {
    getAllAlbumsAsync(): Promise<[Album]>;
}