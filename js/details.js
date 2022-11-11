const urlParams = new URLSearchParams(window.location.search);
const _id = urlParams.get("_id");
const genre = urlParams.get("genre");

//url will look smth like details.html?_id=572837528752&genre=Horror

$(function () {
    request
        .get(uri + genre)
        .then((data) => {
            console.log(data);
            if (!data) {
                window.location.href = "index.html";
            } else {
                const movie = data.find((item) => {
                    return item._id === _id; //if movie id in the array equals the ID we want, return the movie
                }); //Find the movie in the array of movies.
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

                // Above i'm using jQuery to replace values & text in HTML. jQuery makes it easier cause I don't have to manually loop every element
            }
        })
        .catch((err) => {
            window.location.href = "index.html"; //redirect to index.html
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
            window.location.reload(); //reload page
        })
        .catch((err) => {
            alert("Error editing movie");
            console.log(err);
        });
});

$("#deleteMovie").on("click", function (e) {
    let sure = confirm("Are you sure?"); //Prompt user, if they say yes, sure = true
    let id = $(this).data("_id"); //get ID from button (data-_id)
    if (sure) {
        request
            .delete(uri + id)
            .then((data) => {
                alert("Successfully deleted movie!");
                window.location.href = "index.html"; // redirect to index.html
            })
            .catch((err) => {
                alert("Failed to delete movie, check console!");
                console.error(err); //log error in console
            });
    }
});
