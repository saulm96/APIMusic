import { searchAlbumsOnSpotify } from "./api.js";
import Album from "./classes/albums.js";

async function createAlbumCards(query) {
    const albumsSection = document.getElementById("albums-results")
    const albums = await searchAlbumsOnSpotify(query);
    //tracks.sort(((a, b) => b.popularity - a.popularity));

    albums.forEach(album => {
        const albume = new Album(album.name, album.albumId, album.artists, album.artistsId, album.image, album.releaseDate)
        albumsSection.appendChild(albume.render());
    });
}

export default createAlbumCards;