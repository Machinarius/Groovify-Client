import IMusicLibraryRepository from "./IMusicLibraryRepository";

import { Album } from "../models/Album";

export default class GroovifyAPIMusicLibraryRepository implements IMusicLibraryRepository {
    getAllAlbumsAsync(): Promise<Album[]> {
        return new Promise(resolve => resolve([{
            id: "1",
            title: "Monstercat 020 - Altitude",
            artists: "Monstercat",
            coverUrl: "https://f4.bcbits.com/img/a3172578080_16.jpg",
            songs: [{
                id: "1",
                artists: "Vicetone",
                title: "What I've Waited For (feat. D. Brown)",
                lengthInSeconds: 221
            },
            {
                id: "2",
                artists: "Tristam",
                title: "My Friend",
                lengthInSeconds: 262
            },
            {
                id: "3",
                artists: "Aero Chord",
                title: "Break Them (feat. Anna Yvette)",
                lengthInSeconds: 259
            },
            {
                id: "4",
                artists: "Pegboard Nerds",
                title: "Here It Comes (Snavs & Toby Green Remix)",
                lengthInSeconds: 198
            },
            {
                id: "5",
                artists: "Au5",
                title: "Crossroad (feat. Danyka Nadeau)",
                lengthInSeconds: 417
            },
            {
                id: "6",
                artists: "Sound Remedy & Nitro Fun",
                title: "Turbo Penguin",
                lengthInSeconds: 211
            },
            {
                id: "7",
                artists: "Grant Bowtie",
                title: "Clockwork",
                lengthInSeconds: 195
            },
            {
                id: "8",
                artists: "Hellberg & Rich Edwards",
                title: "Ashes (Burn Your Love) (feat. Danyka Nadeau)",
                lengthInSeconds: 307
            },
            {
                id: "9",
                artists: "Mr FijiWiji",
                title: "Believe Her (feat. Meron Ryan)",
                lengthInSeconds: 276
            },
            {
                id: "10",
                artists: "Favright",
                title: "Taking Over (feat. Cassandra Kay) (Grabbitz Remix)",
                lengthInSeconds: 209
            },
            {
                id: "11",
                artists: "Astronaut",
                title: "Feronia (feat. Danyka Nadeau)",
                lengthInSeconds: 268
            },
            {
                id: "12",
                artists: "LVTHER",
                title: "One Look (feat. Mammals)",
                lengthInSeconds: 236
            },
            {
                id: "13",
                artists: "Rameses B",
                title: "We Love",
                lengthInSeconds: 272
            },
            {
                id: "14",
                artists: "Laszlo",
                title: "Messiah",
                lengthInSeconds: 249
            },
            {
                id: "15",
                artists: "Tut Tut Child",
                title: "Breathe (feat. Danyka Nadeau)",
                lengthInSeconds: 275
            },
            {
                id: "16",
                artists: "Muzzy",
                title: "Lost Metropolis",
                lengthInSeconds: 302
            },
            {
                id: "17",
                artists: "Puppet",
                title: "Scribble (feat. The Eden Project)",
                lengthInSeconds: 196
            },
            {
                id: "18",
                artists: "Droptek",
                title: "Killing Time (feat. Isabel Higuero)",
                lengthInSeconds: 263
            },
            {
                id: "19",
                artists: "Stephen Walking",
                title: "Top of the World 2",
                lengthInSeconds: 212
            },
            {
                id: "20",
                artists: "Hellberg",
                title: "I'm Not Over (feat. Tash)",
                lengthInSeconds: 276
            },
            {
                id: "21",
                artists: "PIXL",
                title: "The Escape",
                lengthInSeconds: 303
            },
            {
                id: "22",
                artists: "Going Quantum",
                title: "Raw",
                lengthInSeconds: 229
            },
            {
                id: "23",
                artists: "Nitro Fun",
                title: "Safe & Sound (feat. Danyka Nadeau)",
                lengthInSeconds: 245
            },
            {
                id: "24",
                artists: "Rich Edwards",
                title: "Sweetest Addiction (feat. We Ghosts)",
                lengthInSeconds: 288
            },
            {
                id: "25",
                artists: "Laszlo",
                title: "Supernova",
                lengthInSeconds: 326
            },
            {
                id: "26",
                artists: "Bustre",
                title: "Everything's Different",
                lengthInSeconds: 319
            },
            {
                id: "27",
                artists: "Rootkit",
                title: "Carry Me Away",
                lengthInSeconds: 251
            },
            {
                id: "28",
                artists: "Varien",
                title: "Whispers in the Mist (feat. Aloma Steele)",
                lengthInSeconds: 255
            },
            {
                id: "29",
                artists: "Fractal",
                title: "Contact",
                lengthInSeconds: 327
            },
            {
                id: "30",
                artists: "Direct",
                title: "Tranquility",
                lengthInSeconds: 219
            }]
        }]));
    }
}