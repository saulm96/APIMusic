import createArtistCards from "./artistCards.js";
import createAlbumCards from "./albumCards.js";
import createTrackCards from "./trackCards.js";

async function createAllCards(query) {
    const artists = createArtistCards(query);
    const albums = createAlbumCards(query);
    const tracks = createTrackCards(query);
    return artists, albums, tracks;   
}

export default createAllCards;