import { searchArtistsOnSpotify } from "./api.js";
import Artist from "./classes/artists.js";

async function createArtistCards(query) {
    const artistsSection = document.getElementById("search-results")
    const artists = await searchArtistsOnSpotify(query);
    artistsSection.innerHTML = ''; 
    //tracks.sort(((a, b) => b.popularity - a.popularity));

    artists.forEach(artist => {
        const singer = new Artist(artist.name, artist.artistId, artist.image)
        artistsSection.appendChild(singer.render());
    });
}

export default createArtistCards;