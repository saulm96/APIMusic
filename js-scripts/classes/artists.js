class Artist {
    constructor(name, artistId, image) {
        this.name = name;
        this.artistId = artistId;
        this.image = image;
    }
    render() {
        const section = document.createElement("section");
        const image = document.createElement("img");
        const artist = document.createElement("h2");
        

        section.classList.add("artist-card");
        image.src = this.image;
        artist.innerText = this.name, this.artistId;

        section.append(image, artist);
        return section;
    }
}

export default Artist;
