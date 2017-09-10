// an array with all of our cart items
var cart = [];

var source = $('#store-template').html();
var template = Handlebars.compile(source);

var updateCart = function() {
    $('.cart-list').empty();

    var totalPoints = 0;
    for (i = 0; i < cart.length; i++) {
        var HTML = template(cart[i]);
        $('.cart-list').append(HTML);

        totalPoints += cart[i].price;
    }
    $('.total').empty();
    $('.total').append(totalPoints);

}

var addItem = function(item) {
    cart.push(item);
}

var clearCart = function() {
    cart = [];
    updateCart();

    // cart.length = 0;
}

$('.view-cart').on('click', function() {

    var shoppingCart = $('.shopping-cart');
    shoppingCart.toggle();
});

$('.shopping-cart-table').on('click', '.add-to-cart', function() {
    // TODO: get the "item" object from the page

    var item = $(this).closest('.card').data();

    console.log(item);

    addItem(item);
    updateCart();
});

$('.clear-cart').on('click', function() {

    clearCart();
});

// update the cart as soon as the page loads!
updateCart();