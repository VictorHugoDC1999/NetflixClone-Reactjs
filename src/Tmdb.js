const API_KEY = '9de3c3c7a2f36f5f686bc01135d3c598';
const API_BASE = 'https://api.themoviedb.org/3';

/* Categorias
- originais da netflix
- recomendados (trending)
- em alta (top rated)
- ação
- comédia
- terror
- romance
- documentario
*/

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

export default {
    getHomeList: async () => {//função asincrona
        return [//retorna um array que contem objetos...
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },

            {
                slug: 'trending',
                title: 'Recomendados para Você',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },

            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_rated?&language=pt-BR&api_key=${API_KEY}`)
            },

            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },

            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },

            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },

            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },

            {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            },
        ];
    },

    getMovieInfo: async (movieId, type) => {//função que pega informações de um filme
        let info = {};

        if (movieId) {//se existir/mandou um id(filme, todos os filmes tem um id)

            switch (type) {
                case 'movie'://caso o type seja movie(filme) vou fazer a requisição para filme especifico
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
                case 'tv'://caso o type seja tv(serie) vou fazer a requisição para um seriado
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
                default:
                    info = null;
                break;
               
            }

        }

        return info;
    }
}