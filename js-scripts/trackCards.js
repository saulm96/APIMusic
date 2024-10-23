import { searchTracksOnSpotify } from "./api.js";
import Track from "./classes/tracks.js";

async function createTrackCards(query) {
    const tracksSection = document.getElementById("tracks-results")
    const tracks = await searchTracksOnSpotify(query);
    //tracks.sort(((a, b) => b.popularity - a.popularity));

    tracks.forEach(track => {
        const song = new Track(track.popularity, track.trackNumber, track.trackName, track.trackDuration, track.explicit, track.album, track.albumId, track.artists, track.artistsId, track.trackId, track.image, track.trackPreview)
        tracksSection.appendChild(song.render());
    });
}

export default createTrackCards;