$("#addBurger").on("Click",(event) => {
    event.preventDefault();

    let burger_Name = $("#burgerName").val().trim()

    let ingredients = $("#burgerIngreds").val().trim()

$.ajax({
    url:"/add",
    method:POST,
    data: {
        burger_name:burger_Name,
        burger_Ingred:ingredients
    }

}).then(displayBurger)
.catch(addBurgerFail);
});

const burgerTemplate = (burgerName,ingredients, id, devour, favorite) => {
    const burgerContainer = $('<div>').attr({
        class: 'burger_options',
        id: id
    });
    const img = $('<img>').attr('src', '/assets/img/BurgerPic.jpeg');
    const name = $('<h3>');
    const ingreds = $('<p>')
    const buttonDev = $('<button>').attr({
        'data-id': id,
        class: 'btn btn-info',
        'data-state': devour
    });
    const buttonFav = $('<button>').attr({
        'data-id': id,
        class: 'btn btn-info',
        'data-state': favorite
    });


    name.html(burgerName);
    ingreds.html(ingredients)
    buttonDev.html('Devour')
    buttonFav.html('add to favorite');

    burgerContainer.append(img, name, ingreds, buttonDev,buttonFav);
    return burgerContainer;
};


const displayBurger = (burger) => {
    const name = burger.burger_name;
    const ingred = burger.burger_Ingred
    const id = burger.id;
    const favorite = burger.favorite;
    const devour = burger.devoured
    const newBurger = burgerTemplate(name, ingred, id, devour,favorite);
    $('#burger_options').prepend(newBurger);
    $('input').val('').trim();
};

const addBurgerFail = (response) => {
    alert('Burger Failed');
};


// Favorite or Unfavorite burger
const addtoFavorite = (burger) => {
    const id = burger.id;
    $(`#${id}`).remove();
};

const addFavoriteFail = (response) => {
    alert('Fail adding it to Favorite');
};


$(document).on('click', '.favorites', function() {
    const id = $(this).attr('data-id');
    const value = $(this).attr('data-state');

    let condition = value === '0' ? false : true;

    $.ajax({
        url: `/${id}/${!condition}`,
        method: 'PUT'
    })
    .then(addtoFavorite)
    .catch(addFavoriteFail);
});


// Delete burger from favorites

const removeBurgerOnDelete = (burger) => {
    const id = burger.id;

    $(`.all-burgers .burger[data-id=${id}]`).remove();
};


const removeBurgerFailed = () => {
    alert('Fail deleting burger');
};

$('.all-burgers .burger button').on('click', function() {
    const id = $(this).attr('data-id');


    $.ajax({
        url: `/delete/${id}`,
        method: 'DELETE'
    })
    .then(removeBurgerOnDelete)
    .catch(removeBurgerFailed);
});