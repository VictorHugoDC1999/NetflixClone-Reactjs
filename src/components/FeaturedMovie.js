import React from 'react';
import './FeaturedMovie.css';

export default ({item}) => {

    let firstDate = new Date(item.first_air_date);//aqui estamos pegando a data da api e jogando dentro de um date do js. Agora temos a data separada...
    let genres = [];
    for (let i in item.genres) {
        genres.push( item.genres[i].name );//estamos jogando apenas os nomes (dentro da api eles vem com id...) dos generos dentro de um array(genres) vazio
    }

    let description = item.overview;

    return (
        <section className="featured" style={{/*aqui estamos inserindo o imagem de fundo do filme em destaque*/
            backgroundSize: 'cover',//aqui estamos fazendo com que a imagem dependendo do tamanho do monitor do usuario aumenta ou diminua de forma que ela apareça o maximo possivel
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`//definindo url da nossa imagem de fundo(backdrop_path é a imagem de trás do nosso filme)
        }}>
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">{item.original_name}</div>
                    <div className="featured--info">
                        <div className="featured--points">{item.vote_average} pontos</div>
                        <div className="featured--year">{firstDate.getFullYear()}</div>
                        <div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : '' /*se o numero de temporadas for diferente de 1, então será acrescentado o s, caso contrario não será acrescentando nada*/}</div>
                    </div>
                    <div className="featured--description">{item.overview}</div>
                    <div className="featured--buttons">
                        <a href={`/watch/${item.id}`} className="featured--watchbutton">▸ Assistir</a>
                        <a href={`/list/add/${item.id}`} className="featured--mylistbutton">+ Minha Lista</a>
                    </div>
                    <div className="featured--genres"><strong>Gêneros:</strong> {genres.join(', ')}</div>
                </div>
            </div>
        </section>
   );
}