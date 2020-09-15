import React, { useState } from 'react';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import './MovieRow.css';

export default ({title, items}) => {
    const [scrollX, setScrollX] = useState(0);

    const handleLeftArrow = () => {//estamos fazendo uma função para que quando clique no icone a lista vá para a esquerda
        let x = scrollX + Math.round(window.innerWidth / 2);//aqui estamos fazendo a soma do scroll mais a soma da tela do monitor. Math.roun... a partir dai estamos pegando a largura da tela do monitor
        if (x > 0 ) {//aqui estamos fazendo o seguinte quando o scrollx chegar no 0(lembrando que o scroll já ja começa com -400) ele vai parar de somar(150) para não somar sem que tenha filme aparecendo
            x = 0;
        }
        setScrollX(x);
    }

    const handleRightArrow = () => {//estamos fazendo uma função para que quando clique no icone a lista vá para a direita
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = items.results.length * 150;//calculando largura dos itens
        if ((window.innerWidth - listW) > x) {
            x = (window.innerWidth - listW) - 60;
        }
        setScrollX(x);
    }

    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{fontSize: 50}} />
            </div>
            <div className="movieRow--right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{fontSize: 50}} />
            </div>
            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                marginLeft: scrollX,
                width: items.results.length * 150//estamos colocando largura da nossa lista dinamicamente
            }}>
                    {items.results.length > 0 && items.results.map((item, key)=>(
                        <div key={key} className="movieRow--item">
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
                        </div>
                ))}
                </div>
            </div>
        </div>
    );
}