import { getNewReleases } from './api.js';

class Carousel {
    constructor(releases) {
        this.container = document.getElementById('carousel-main');
        this.releases = releases;
        this.init();
    }

    init() {
        // Crear el wrapper y el track
        const wrapper = document.createElement('div');
        wrapper.className = 'carousel-wrapper';
        this.container.appendChild(wrapper);

        const track = document.createElement('div');
        track.className = 'carousel-track';
        wrapper.appendChild(track);

        // Crear el contenedor para slides
        const slidesContainer = document.createElement('div');
        slidesContainer.className = 'slides-container';
        track.appendChild(slidesContainer);

        // Crear slides y duplicar el contenido para lograr un bucle continuo
        const totalSets = 2;  
        for (let i = 0; i < totalSets; i++) {
            this.releases.forEach(release => {
                const slide = document.createElement('div');
                slide.className = 'carousel-slide';

                const imgContainer = document.createElement('div');
                imgContainer.className = 'image-container';

                const imgElement = document.createElement('img');
                imgElement.src = release.image;
                imgElement.alt = `${release.artist} - ${release.name}`;
                imgContainer.appendChild(imgElement);

                const artistElement = document.createElement('p');
                artistElement.textContent = Array.isArray(release.artist)
                    ? release.artist.join(', ')
                    : release.artist;

                const songElement = document.createElement('h3');
                songElement.textContent = release.name;

                slide.appendChild(imgContainer);
                slide.appendChild(songElement);
                slide.appendChild(artistElement);

                slidesContainer.appendChild(slide); // Añadir cada slide
            });
        }

        // Pausar la animación al hacer hover
        slidesContainer.addEventListener('mouseenter', () => {
            slidesContainer.style.animationPlayState = 'paused';
        });

        slidesContainer.addEventListener('mouseleave', () => {
            slidesContainer.style.animationPlayState = 'running';
        });
    }
}

// Obtener los datos de los lanzamientos y crear el carrusel
const releases = await getNewReleases();
new Carousel(releases);
