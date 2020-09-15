import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import './App.css';

export default () => {

    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);//featuredData só ira aparecer quando ele estiver preenchido
    const [blackHeader, setBlackHeader] = useState(false);

    useEffect(()=>{
        const loadAll = async () => {
            // Pegando a lista total
            let list = await Tmdb.getHomeList();
            setMovieList(list);

            // Pegando o Featured (filme em destaque da netflix)
            let originals = list.filter(i=>i.slug === 'originals');//aqui fizemos um filtro para pegar apenas filmes em destaque que são da lista de originais da netflix
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));//aqui estamos gerando um número aleatorio pra pegar um filme aleatorio e mostrar em destaque
            let chosen = originals[0].items.results[randomChosen];//aqui estamos pegando o número aleatorio que foi gerado na acima
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');//pegando id (informações adicionais do filme, quantidade de temporadas etc) do filme
            setFeaturedData(chosenInfo);//jogando nosso filme no featuredData
        }

    loadAll();
    }, []);

    useEffect(()=>{//este useEffect foi criado para adicionar um evento de monitoramento da propria pagina
        const scrollListener = () => {
            if (window.scrollY > 10) {//quando o scrollY(vertical) estiver maior que 10
                setBlackHeader(true);
            } else {
                setBlackHeader(false);
            }
        }

        window.addEventListener('scroll', scrollListener);//aqui significa o seguinte quando na tela tiver qualquer evento de scroll ele vai rodar a função scrollListener
        return () => {
            window.removeEventListener('scroll', scrollListener);//aqui estamos removendo este evento quando sairmos da pagina
        }
    }, []);

    return (
        <div className="page">
            
            <Header black={blackHeader} />

            {featuredData &&//se existir algum filme na featuredData ele mostra o destaque
                    <FeaturedMovie item={featuredData} />
            }
            
            <section className="lists">
                {movieList.map((item, key)=>(
                    <MovieRow key={key} title={item.title} items={item.items} />
                ))}
            </section>

            <footer>
                Feito com <span className="footer--heart" role="img" aria-label="coração">&#x2764;</span> pelo Victor<br/>
                Direitos de imagem para Netflix<br/>
                Dados pegos do site Themoviedb.org
            </footer>

            {movieList.length <= 0 &&//se o movieList não tem nada, significa que ainda não carregamos os filmes então o loading aparece
                <div className="loading">
                    <img src="https://www.filmelier.com/pt/br/news/wp-content/uploads/2020/03/netflix-loading.gif" alt="Carregando"/>
                </div>
            }
        </div>
    );
}