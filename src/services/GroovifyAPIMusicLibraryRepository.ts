import IMusicLibraryRepository from "./IMusicLibraryRepository";

import { Album } from "../models/Album";

export default class GroovifyAPIMusicLibraryRepository implements IMusicLibraryRepository {
    getAllAlbumsAsync(): Promise<[Album]> {
        throw new Error("Method not yet implemented.");
    }
}