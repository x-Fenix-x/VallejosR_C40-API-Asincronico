window.onload = async () => {
    const app = document.getElementById('root');
    const container = document.createElement('div');
    container.setAttribute('class', 'container');
    app.appendChild(container);

    // Aqui agregar nuestro fetch

    try {
        const response = await fetch('http://localhost:3031/api/movies');
        const { meta, data } = await response.json();

        data.forEach((movie) => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            const h1 = document.createElement('h1');
            h1.textContent = movie.title;

            const p = document.createElement('p');
            p.textContent = `Rating: ${movie.rating}`;

            const duracion = document.createElement('p');
            duracion.textContent = `Duración: ${movie.length}`;

            const link = document.createElement('a');
            link.textContent = 'ver más';
            link.setAttribute(
                'href',
                `formulario.html?movie=${movie.id}`
            );

            container.appendChild(card);
            card.appendChild(h1);
            card.appendChild(p);
            if (movie.genre !== null) {
                const genero = document.createElement('p');
                genero.textContent = `Genero: ${movie.genre.name}`;
                card.appendChild(genero);
            }
            card.appendChild(duracion);
            card.appendChild(link);
        });
    } catch (error) {
        console.log(error);
    }
};
