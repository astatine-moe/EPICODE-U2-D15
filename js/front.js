const $genres = $("#genres");

$(function () {
    request.get(uri).then(async (genres) => {
        if (genres.length) {
            let html = ``;
            console.log(genres);
            for (const genre of genres) {
                html += `<div class="movie-gallery m-2">
                    <h5 class="text-light mt-2 mb-2">${genre}</h5>
                    
                    <div id="${genre}" class="carousel-slide" data-bs-ride="carousel">
                        <div class="carousel-inner">`;

                const movies = await request.get(uri + genre);

                html += `<div class="carousel-item active">
                    <div class="movie-row">
                    <div class="row">`;
                for (const { imageUrl, name, _id } of movies) {
                    html += `<div class="col-md-2">
                        <a href="details.html?_id=${_id}&genre=${genre}" target="_blank">
                            <img src="${imageUrl}" class="movie-cover" />
                        </a>
                    </div>`;
                }
                html += `</div></div><button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#trending-now"
                data-bs-slide="prev"
            >
                <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#trending-now"
                data-bs-slide="next"
            >
                <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
            </button></div></div></div>`;
            }
            $genres.html(html);
        } else {
            $genres.html("No genres found");
        }
    });
});
