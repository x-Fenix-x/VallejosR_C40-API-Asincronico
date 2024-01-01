const $ = (id) => document.getElementById(id);

window.onload = async () => {
    let query = new URLSearchParams(location.search);
    let movieId = query.get('movie');

    if (movieId) {
        try {
            const response = await fetch(
                `http://localhost:3031/api/movies/${movieId}`
            );
            const result = await response.json();
            console.log(result.data);

            $('title').value = result.data.title;
            $('rating').value = result.data.rating;
            $('awards').value = result.data.awards;
            $('release_date').value = new Date(result.data.release_date)
                .toISOString()
                .substring(0, 10);
            $('length').value = result.data.length;
            $('botonAgregar').style.display = 'none';
        } catch (error) {
            console.log(error);
        }
    } else {
        $('botonEditar').style.display = 'none';
        $('botonBorrar').style.display = 'none';
    }

    $('botonAgregar').addEventListener('click', async (e) => {
        e.preventDefault();

        try {
            const newMovieData = {
                title: $('title').value,
                rating: $('rating').value,
                awards: $('awards').value,
                release_date: $('release_date').value,
                length: $('length').value,
                genre_id: null,
            };

            const response = await fetch(
                `http://localhost:3031/api/movies/create`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newMovieData),
                }
            );

            const result = await response.json();
            const newMovieCreated = result.data;

            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: `Película '${newMovieCreated.title}' creada con éxito`,
                showConfirmButton: false,
                timer: 2500,
            });

            setTimeout(() => {
                window.location.href = 'home.html';
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    });

    $('botonEditar').addEventListener('click', async (e) => {
        e.preventDefault();

        try {
            const updatedMovieData = {
                title: $('title').value,
                rating: $('rating').value,
                awards: $('awards').value,
                release_date: $('release_date').value,
                length: $('length').value,
                genre_id: null,
            };

            const response = await fetch(
                `http://localhost:3031/api/movies/update/${movieId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedMovieData),
                }
            );

            const result = await response.json();
            console.log(result);

            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: `Película '${updatedMovieData.title}' editada con éxito`,
                showConfirmButton: false,
                timer: 2500,
            });

            setTimeout(() => {
                window.location.href = 'home.html';
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    });

    $('botonBorrar').addEventListener('click', async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:3031/api/movies/delete/${movieId}`,
                {
                    method: 'DELETE',
                }
            );

            const result = await response.json();
            console.log(result);

            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Película eliminada con éxito',
                showConfirmButton: false,
                timer: 2500,
            });

            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1600);
        } catch (error) {
            console.log(error);
        }
    });
};
