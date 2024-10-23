class Album {
    constructor(name, albumId, artists, artistsId, image, releaseDate) {
        this.name = name;
        this.albumId = albumId;
        this.artists = artists;
        this.artistsId = artistsId;
        this.image = image;
        this.releaseDate = releaseDate;
    }
    render() {
        const section = document.createElement("section");
        const image = document.createElement("img");
        const albumName = document.createElement("h2");
        const artists = document.createElement("h3");
        const releaseDate = document.createElement('p');
        

        section.classList.add("artist-card");
        image.src = this.image;
        albumName.innerText = this.name, this.albumId;
        artists.innerText = this.artists, this.artistsId;
        releaseDate.innerText = this.releaseDate.split("-")[0];
        

        section.append(image, albumName, artists, releaseDate);
        return section;
    }
}

export default Album;
