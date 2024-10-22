class Track {
    constructor(popularity, trackNumber, trackName, trackDuration, explicit, album, albumId, artists, artistsId, trackId, image, trackPreview) {
        this.popularity = popularity;
        this.trackNumber = trackNumber;
        this.trackName = trackName;
        this.trackDuration = trackDuration;
        this.explicit = explicit;
        this.album = album;
        this.albumId = albumId;
        this.artists = artists;
        this.artistsId = artistsId;
        this.trackId = trackId;
        this.image = image;
        this.trackPreview = trackPreview;
    }
    render() {
        const section = document.createElement("section");
        const image = document.createElement("img");
        const trackName = document.createElement("h2");
        const artists = document.createElement("h3");
        const album = document.createElement("h3");
        const duration = document.createElement("p");
        const play = document.createElement("audio");
        const explicit = document.createElement('p');
        if (this.explicit == true) {
            explicit.innerText = 'E';
            explicit.classList.add('explicit-icon');
        }

        section.classList.add("track-card");
        image.src = this.image;
        trackName.innerText = this.trackName;
        artists.innerText = this.artists, this.artistsId;
        album.innerText = this.album, this.albumId;
        duration.innerText = `${Math.floor(this.trackDuration / 60000)}:${Math.floor((this.trackDuration % 60000) / 1000)}`
        /* const durationDate = new Date(this.trackDuration);
        duration.innerText = durationDate.getMinutes() + ':' + durationDate.getSeconds(); */
        play.src = this.trackPreview;
        play.controls = true;

        section.append(image, trackName, artists, album, duration, explicit, play);
        return section;
    }
}

export default Track;
