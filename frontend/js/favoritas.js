window.onload = async () => {
    const app = document.getElementById('root');
    const container = document.createElement('div');
    container.setAttribute('class', 'container');
    app.appendChild(container);

    const fav = JSON.parse(localStorage.getItem('fav')) || [];

    // Aqui debemos agregar nuestro fetch
    if (fav.length > 0) {
        try {
            const response = await fetch('http://localhost:3031/api/movies');
            const { meta, data } = await response.json();

            const pelisFav = data.filter((movie) =>
                fav.includes(movie.id.toString())
            );

            pelisFav.forEach((movie) => {
                const card = document.createElement('div');
                card.setAttribute('class', 'card');

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
            });
        } catch (error) {
            console.log(error);
        }
    } else {
        const message = document.createElement('p');
        message.textContent = 'Sin películas favoritas';
        container.appendChild(message);
    }
};
