function MovieList() {
    const movies = [
        {
            id: 1,
            director: "Uberto Pasolini",
            titulo: "The Return",
            año: 2024
        },
        {
            id: 2,
            director: "Santiago Segura",
            titulo: "Torrente 1",
            año: 1998
        },
        {
            id: 3,
            director: "Howard J. Ford",
            titulo: "El abismo",
            año: 2022
        },
    ]

    const HTMLMovies = movies.map((movie) => {
        return (
            <li key={movie.id}>
                <h3>{movie.titulo}</h3>
            </li>
        )
    })

    return (
        <section>
            <h2>Peliculas</h2>
            <ul>
                {HTMLMovies}
            </ul>
        </section>
    )
}

export default MovieList