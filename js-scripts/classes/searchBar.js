import { searchOnSpotify, searchAlbumsOnSpotify } from "../api.js";
import createTrackCards from "../trackCards.js";
import createArtistCards from "../artistCards.js";
import createAlbumCards from "../albumCards.js";
import createAllCards from "../allCards.js";


const FILTERS = {
    todos: createAllCards,
    artistas: createArtistCards,
    albumes: createAlbumCards,
    canciones: createTrackCards,
}

class SearchBar {
    constructor(divId = "search") {
        this.searchSection = document.getElementById(divId);
        this.currentFilter = 'todos';
        this.createSearchBar();

        this.buttonsContainer = document.createElement('div');
        this.buttonsContainer.classList.add('buttons-container', 'hidden');

        this.createAllOptionsButton();
        this.createArtistsButton();
        this.createTracksButton();
        this.createAlbumsButton();
        this.timeout = null;

        this.searchSection.appendChild(this.buttonsContainer);
    }
    createSearchBar() {
        const searchLabel = document.createElement('label');
        searchLabel.innerText = 'Barra de búsqueda';

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = ' Escribe aquí...';
        searchInput.classList.add('search-input');

        searchInput.addEventListener('input', (e) => {
            this.query = e.target.value;
            this.handleSearch();
        });

        this.searchSection.appendChild(searchInput);
    }

    changeFilter(newFilter) {
        if (newFilter === this.currentFilter) {
            return;
        }
        this.currentFilter = newFilter;
        this.handleSearch();
    }

    createAlbumsButton() {
        const button = document.createElement('button');
        button.innerText = 'Álbumes';
        button.classList.add('filter-button');

        button.addEventListener('click', () => this.changeFilter('albumes'));
    
        this.buttonsContainer.appendChild(button);
    }

    createArtistsButton() {
        const button = document.createElement('button');
        button.innerText = 'Artistas';
        button.classList.add('filter-button');

        button.addEventListener('click', () => this.changeFilter('artistas'));

        this.buttonsContainer.appendChild(button);
    }

    createTracksButton() {
        const button = document.createElement('button');
        button.innerText = 'Canciones';
        button.classList.add('filter-button');

        button.addEventListener('click', () => this.changeFilter('canciones'));

        this.buttonsContainer.appendChild(button);
    }

    createAllOptionsButton() {
        const button = document.createElement('button');
        button.innerText = 'Todo';
        button.classList.add('filter-button');

        button.addEventListener('click', () => this.changeFilter('todos'));

        this.buttonsContainer.appendChild(button);
    }

    async handleSearch() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout= setTimeout(async () => {
            document.getElementById('tracks-results').innerHTML = '';
            document.getElementById('albums-results').innerHTML = '';
            document.getElementById('artists-results').innerHTML = '';
            if (this.query.trim().length > 0) {
                this.buttonsContainer.classList.remove('hidden');
                const searchFunction = FILTERS[this.currentFilter];
                const result = await searchFunction(this.query);
                return result;
            } else {
                this.buttonsContainer.classList.add('hidden');
            }
        }, 500);
    }
}

const searchBar = new SearchBar();
