$(function () {


    $(".createBurger-form").on("submit", function(event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#burgerName").val().trim(),
            burger_ingred: $("#burgerIngreds").val().trim(),
            devoured: 0,
            favorite: 0

        };

        $.ajax("/api/burgers", {
                type: 'POST',
                data: newBurger
            })
            .then(function() {
                    console.log("new burger created");

                    location.reload();
                }
            )
    });

    $(".devour").on("click", function(event){
        var id = $(this).data("id");
        var newDevour = $(this).data("devour");

        var newDevourState = {
            devoured: newDevour
        }

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevourState
        })
            .then(function(){
                console.log("changed devoured to", newDevour);

                location.reload();
            })
    });

    $(".savorite").on("click", function(event){
        const id = $(this).data("id");
        const value = $(this).data("state");
    
        let condition = value === '0' ? false : true;

        console.log(condition)

        var newFavState = {
            favorite: condition
        }


        $.ajax("/api/burgers/favorite/" + id, {
            type: "PUT",
            data: newFavState
        })
            .then(function(){
                console.log("changed favorite to", newFavState);

                location.reload();
            })
    });

    $(".unsavorite").on("click", function(event){
        const id = $(this).data("id");
        const value = $(this).data("state");
    
        let condition = value === '1' ? true : false;

        console.log(condition)

        var newFavState = {
            favorite: condition
        }


        $.ajax("/api/burgers/favorite/" + id, {
            type: "PUT",
            data: newFavState
        })
            .then(function(){
                console.log("changed favorite to", newFavState);

                location.reload();
            })
    });

   

    $(".delete-burger").on("click", function(event) {
        var id = $(this).data("id");
    
        // Send the DELETE request.
        $.ajax("/api/burgers/" + id, {
          type: "DELETE"
        }).then(
          function() {
            console.log("deleted burger", id);
            // Reload the page to get the updated list
            location.reload();
          }
        );
      });

});