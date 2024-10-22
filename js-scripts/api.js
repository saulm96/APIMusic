// FUNCION PARA OBTENER EL TOKEN DE ACCESO DE SPOTIFY
const clientId = '640d0adb70754d648f7a86d85a4f2dee';
const clientSecret = '5f9d1521f5be464b861e41889e3bc833';

async function obtenerToken() {
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
    const data = await result.json();
    token = data.access_token;
    return token;
}

//FUNCION PARA OBTENER LA URL DE BUSQUEDA DE LA API
const BASE_URL = 'https://api.spotify.com/v1/';

async function fetchData(route, searchParams = {},) {
    try {
        const token = await obtenerToken();
        const url = new URL(BASE_URL + route);
        for (const key of Object.keys(searchParams)) {
            url.searchParams.append(key, searchParams[key]);
        }
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.log(error);
        return { error: error }
    }
}



function artistInformation(resultArtistInformation) {
    let image;
    if (resultArtistInformation.images && resultArtistInformation.images.length > 0) {
        image = resultArtistInformation.images[0].url;
    } else {
        image = 'images/logos/faviconweb.png';
    }
    return {
        genres: resultArtistInformation.genres,
        artistId: resultArtistInformation.id,
        name: resultArtistInformation.name,
        image: image,
    }
}
async function getArtistInformation(id) {
    const resultArtistInformation = await fetchData('artists/' + id);
    const artistInfo = artistInformation(resultArtistInformation);
    return artistInfo;
}



//FUNCIONES PARA LA PAGINA DE CADA ARTISTA

function artistAlbums(resultArtistAlbums) {
    const result = resultArtistAlbums.items.map(album => {
        let image;
        if (album.images && album.images.length > 0) {
            image = album.images[0].url;
        } else {
            image = 'images/logos/faviconweb.png';
        }
        return {
            id: album.id,
            name: album.name,
            totalTracks: album.total_tracks,
            releaseDate: album.release_date,
            artists: album.artists.map(artist => artist.name),
            artistsId: album.artists.map(artist => artist.id),
            image: image,
            type: album.album_group, //podemos aplicar un filtro: album/single/appears_on/compilation
        }
    });
    return result;
}
async function getArtistAlbums(id) {
    const resultArtistAlbums = await fetchData('artists/' + id + '/albums?offset=0&limit=50&locale=es-ES,es;q%3D0.9&include_groups=album,single,compilation,appears_on');
    const albums = artistAlbums(resultArtistAlbums);
    return albums;
}

function artistTopTracks(resultArtistTopTracks) {
    const result = resultArtistTopTracks.tracks.map(track => {
        let image;
        if (track.album.images && track.album.images.length > 0) {
            image = track.album.images[0].url;
        } else {
            image = 'images/logos/faviconweb.png';
        }
        return {
            popularity: track.popularity,
            duration: track.duration_ms,
            id: track.id,
            name: track.name,
            preview: track.preview_url,
            image: image,
        }
    });
    return result;
}
async function getArtistTopTracks(id) {
    const resultArtistTopTracks = await fetchData('artists/' + id + '/top-tracks');
    const topTracks = artistTopTracks(resultArtistTopTracks);
    return topTracks;
}

function artistRelatedArtists(resultRelatedArtists) {
    const result = resultRelatedArtists.artists.map(artist => {
        let image;
        if (artist.images && artist.images.length > 0) {
            image = artist.images[0].url;
        } else {
            image = 'images/logos/faviconweb.png';
        }
        return {
            name: artist.name,
            id: artist.id,
            image: image,
        }
    });
    return result;
}
async function getArtistRelatedArtists(id) {
    const resultRelatedArtists = await fetchData('artists/' + id + '/related-artists');
    const relatedArtists = artistRelatedArtists(resultRelatedArtists);
    return relatedArtists;
}



//FUNCION PARA MOSTRAR EL ALBUM Y SU TRACKLIST

function albumInformation(resultAlbumInformation) {
    const trackList = resultAlbumInformation.tracks.items.map(track => {
        return {
            number: track.track_number,
            name: track.name,
            duration: track.duration_ms,
            explicit: track.explicit,
            id: track.id,
            preview: track.preview_url,
            artists: track.artists.map(artist => artist.name),
            artistsId: track.artists.map(artist => artist.id),
        }
    });
    let image;
    if (resultAlbumInformation.images && resultAlbumInformation.images.length > 0) {
        image = resultAlbumInformation.images[0].url;
    } else {
        image = 'images/logos/faviconweb.png';
    }
    return {
        totalTracks: resultAlbumInformation.total_tracks,
        name: resultAlbumInformation.name,
        releaseDate: resultAlbumInformation.release_date,
        image: image,
        copyright: resultAlbumInformation.copyrights[0].text,
        artist: resultAlbumInformation.artists.map(artist => artist.name),
        artistId: resultAlbumInformation.artists.map(artist => artist.id),
        trackList,
    }
};
async function getAlbumInformation(id) {
    const resultAlbumInformation = await fetchData('albums/' + id);
    const albumInfo = albumInformation(resultAlbumInformation);
    return albumInfo;
}



//FUNCION PARA MOSTRAR LA CANCION

function trackInformation(resultTrackInformation) {
    let image;
    if (resultTrackInformation.images && resultTrackInformation.images.length > 0) {
        image = resultTrackInformation.images[0].url;
    } else {
        image = 'images/logos/faviconweb.png';
    }
    return {
        image: image,
        preview: resultTrackInformation.preview_url,
        name: resultTrackInformation.name,
        duration: resultTrackInformation.duration_ms,
        explicit: resultTrackInformation.explicit,
        artist: resultTrackInformation.artists.map(artist => artist.name),
        artistId: resultTrackInformation.artists.map(artist => artist.id),
        album: resultTrackInformation.album.name,
        albumId: resultTrackInformation.album.id,
        releaseDate: resultTrackInformation.album.release_date,
    }
}
async function getTrackInformation(id) {
    const resultTrackInformation = await fetchData('tracks/' + id);
    const trackInfo = trackInformation(resultTrackInformation);
    return trackInfo;
}




//FUNCION PARA EL CARRUSEL DE NOVEDADES

function newReleases(resultNewReleases) {
    const result = resultNewReleases.albums.items.map(track => {
        let image;
        if (track.images && track.images.length > 0) {
            image = track.images[0].url;
        } else {
            image = 'images/logos/faviconweb.png';
        } return {
            image: image,
            name: track.name,
            id: track.id,
            artist: track.artists.map(artist => artist.name),
            artistId: track.artists.map(artist => artist.id),
        }
    });
    return result;
}
async function getNewReleases() {
    const resultNewReleases = await fetchData('browse/new-releases?offset=0&limit=50&locale=es-ES,es;q%3D0.9/');
    const novedades = newReleases(resultNewReleases);

    return novedades;
}



//FUNCIONES PARA LA BARRA DE BUSQUEDA GENERAL

function tracksOnSpotify(resultsearchTrackOnSpotify) {
    const resultTracks = resultsearchTrackOnSpotify.tracks.items.map(track => {
        let image;
        if (track.album.images && track.album.images.length > 0) {
            image = track.album.images[0].url;
        } else {
            image = 'images/logos/faviconweb.png';
        }
        return {
            popularity: track.popularity,
            trackNumber: track.track_number,
            trackName: track.name,
            trackDuration: track.duration_ms,
            explicit: track.explicit,
            album: track.album.name,
            artists: track.artists.map(artist => artist.name),
            albumId: track.album.id,
            artistsId: track.artists.map(artist => artist.id),
            trackId: track.id,
            image: image,
            trackPreview: track.preview_url,
        }
    });
    return resultTracks;
}
async function searchTracksOnSpotify(query) {
    const resultsearchTrackOnSpotify = await fetchData('search?query=' + query + '&type=track&locale=es-ES%2Ces%3Bq%3D0.9&offset=0&limit=50');
    const tracks = tracksOnSpotify(resultsearchTrackOnSpotify);
    return tracks;
}


function albumsOnSpotify(resultsearchAlbumsOnSpotify) {
    const resultAlbums = resultsearchAlbumsOnSpotify.albums.items.map(album => {
        let image;
        if (album.images && album.images.length > 0) {
            image = album.images[0].url;
        } else {
            image = 'images/logos/faviconweb.png';
        }
        return {
            name: album.name,
            artists: album.artists.map(artist => artist.name),
            albumId: album.id,
            releaseDate: album.release_date,
            image: image,
        }
    });
    return resultAlbums;
}
async function searchAlbumsOnSpotify(query) {
    const resultsearchAlbumsOnSpotify = await fetchData('search?query=' + query + '&type=album&locale=es-ES%2Ces%3Bq%3D0.9&offset=0&limit=50');
    const albums = albumsOnSpotify(resultsearchAlbumsOnSpotify);
    return albums;
}


function artistsOnSpotify(resultsearchArtistsOnSpotify) {
    const result = resultsearchArtistsOnSpotify.artists.items.map(artist => {
        let image;
        if (artist.images && artist.images.length > 0) {
            image = artist.images[0].url;
        } else {
            image = 'images/logos/faviconweb.png';
        }
        return {
            name: artist.name,
            artistId: artist.id,
            image: image,
        }
    });
    return result;
}
async function searchArtistsOnSpotify(query) {
    const resultsearchArtistsOnSpotify = await fetchData('search?query=' + query + '&type=artist&locale=es-ES%2Ces%3Bq%3D0.9&offset=0&limit=50');
    const artists = artistsOnSpotify(resultsearchArtistsOnSpotify);
    return artists;
}

// FUNCION DE LA BARRA DE BUSQUEDA. INCLUYE TODAS LAS FUNCIONES DE BUSQUEDA GENERAL
async function searchOnSpotify(query) {
    const spotifyArtists = await searchArtistsOnSpotify(query);
    const spotifyAlbums = await searchAlbumsOnSpotify(query);
    const spotifyTracks = await searchTracksOnSpotify(query);
    console.log(spotifyArtists, spotifyAlbums, spotifyTracks);
    return spotifyArtists, spotifyAlbums, spotifyTracks;
}
