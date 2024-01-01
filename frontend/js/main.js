const $ = (id) => document.getElementById(id);

window.onload = async () => {
    const app = document.getElementById('root');
    const container = document.createElement('div');
    container.setAttribute('class', 'container');
    app.appendChild(container);

    const fav = JSON.parse(localStorage.getItem('fav')) || [];

    const bannerFav = () => {
        const bannerFavElement = $('bannerFav');

        if (fav.length > 0) {
            bannerFavElement.style.display = 'block';
        } else {
            bannerFavElement.style.display = 'none';
        }
    };

    bannerFav();

    const iconHeart = (movieId, heart) => {
        if (fav.includes(movieId)) {
            heart.classList.remove('fa-solid', 'fa-heart');
            heart.classList.add('fa-regular', 'fa-heart');
            fav.splice(fav.indexOf(movieId), 1);
        } else {
            heart.classList.add('fa-solid', 'fa-heart');
            fav.push(movieId);
        }

        localStorage.setItem('fav', JSON.stringify(fav));
    };

    try {
        const response = await fetch('http://localhost:3031/api/movies');
        const { meta, data } = await response.json();

        data.forEach((movie) => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
            card.style.textAlign = 'center';
            card.style.paddingBottom = '10px';

            const h1 = document.createElement('h1');
            h1.textContent = movie.title;
            h1.style.fontSize = '1rem';

            const p = document.createElement('p');
            p.textContent = `Rating: ${movie.rating}`;
            p.style.paddingBottom = '1rem';

            const duracion = document.createElement('p');
            duracion.textContent = `Duración: ${
                movie.length !== null ? movie.length + ' min' : 'Sin datos'
            }`;
            duracion.style.paddingBottom = '1rem';

            const link = document.createElement('a');
            link.textContent = 'VER MÁS';
            link.style.textDecoration = 'none';
            link.style.fontWeight = '600';
            link.style.padding = '5px';
            link.style.backgroundColor = 'pink';
            link.style.borderRadius = '5px';
            link.setAttribute('href', `formulario.html?movie=${movie.id}`);
            link.classList.add('botonAgregar');

            const heart = document.createElement('i');
            heart.classList.add('fa-regular', 'fa-heart');
            heart.style.cursor = 'pointer';

            if (fav.includes(movie.id.toString())) {
                heart.classList.add('fa-solid', 'fa-heart');
            }

            heart.addEventListener('click', () => {
                iconHeart(movie.id.toString(), heart);
                bannerFav();
            });

            container.appendChild(card);
            card.appendChild(h1);
            card.appendChild(p);
            if (movie.genre !== null) {
                const genero = document.createElement('p');
                genero.style.paddingBottom = '1rem';
                genero.textContent = `Genero: ${movie.genre.name}`;
                card.appendChild(genero);
            } else {
                const genero = document.createElement('p');
                genero.textContent = 'Género: Sin especificar';
                genero.style.paddingBottom = '1rem';
                card.appendChild(genero);
            }
            card.appendChild(duracion);
            card.appendChild(link);
            card.appendChild(heart);
        });
    } catch (error) {
        console.log(error);
    }
};
