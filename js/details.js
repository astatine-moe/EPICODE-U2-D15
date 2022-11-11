const urlParams = new URLSearchParams(window.location.search);
const _id = urlParams.get("_id");
const genre = urlParams.get("genre");
$(function () {
    request
        .get(uri + genre)
        .then((data) => {
            console.log(data);
            if (!data) {
                window.location.href = "index.html";
            } else {
                const movie = data.find((item) => {
                    return item._id === _id;
                });
                $("#movie-holder img").attr("src", movie.imageUrl);
                $("[data-replace='movieName']").text(movie.name);
                $("[data-replace='movieDesc']").text(movie.description);
                $("#movie-holder").css({
                    background: `url(${movie.imageUrl}) no-repeat center center fixed`,
                    "background-size": "contain",
                    color: "black",
                });

                $("#name").val(movie.name);
                $("#description").val(movie.description);
                $("#category").val(movie.category);
                $("#imageurl").val(movie.imageUrl);

                $("#deleteMovie").data("_id", _id);
            }
        })
        .catch((err) => {
            window.location.href = "index.html";
        });
});

$("#editMovieForm").on("submit", function (e) {
    e.preventDefault(); //prevent form from submitting

    const inputs = $("#editMovieForm");

    const name = inputs.find("#name").val().trim();
    const desc = inputs.find("#description").val().trim();
    const imageURL = inputs.find("#imageurl").val().trim();
    const category = inputs.find("#category").find(":selected").val();

    const data = {
        name,
        description: desc,
        category,
        imageUrl: imageURL,
    };

    request
        .put(uri + _id, data)
        .then((data) => {
            window.location.reload();
        })
        .catch((err) => {
            alert("Error editing movie");
            console.log(err);
        });
});

$("#deleteMovie").on("click", function (e) {
    let sure = confirm("Are you sure?");
    let id = $(this).data("_id");
    console.log(id);
    if (sure) {
        request
            .delete(uri + id)
            .then((data) => {
                alert("Successfully deleted movie!");
                window.location.href = "index.html";
            })
            .catch((err) => {
                alert("Failed to delete movie, check console!");
                console.error(err);
            });
    }
});
