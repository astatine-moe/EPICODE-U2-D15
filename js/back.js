$("#movie-form").on("submit", (e) => {
    e.preventDefault(); //prevent form from submitting

    const inputs = $("#movie-form");

    const name = inputs.find("#name").val().trim();
    const desc = inputs.find("#description").val().trim();
    const imageURL = inputs.find("#imageurl").val().trim();
    const category = inputs.find("#category").find(":selected").val();

    //.trim() removes whitespace on either send of a trim so "  hi  ".trim() becomes  "hi"

    const data = {
        name,
        description: desc,
        category,
        imageUrl: imageURL,
    };

    request
        .post(uri, data)
        .then((data) => {
            console.log(data);
            alert("Created movie successfully!");
            window.location.reload(); //reload page
        })
        .catch((err) => {
            alert("Error creating movie");
            console.log(err);
        });
});
