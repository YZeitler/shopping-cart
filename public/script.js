// an array with all of our cart items
var cart = [];

var source = $('#store-template').html();
var template = Handlebars.compile(source);

var updateCart = function() {
    $('.cart-list').empty();

    var totalPrice = 0;
    for (i = 0; i < cart.length; i++) {
        var HTML = template(cart[i]);
        $('.cart-list').append(HTML);
        totalPrice += cart[i].price * cart[i].quantity;
    }
    $('.total').html(totalPrice);
}

var addItem = function(item) {
    var itemExists = false;
    for (i = 0; i < cart.length; i++) {
        if (cart[i].name === item.name) {
            itemExists = true;
            break;
        }
    }
    if (itemExists) {
        cart[i].quantity++
    } else {
        item.quantity = 1;
        cart.push(item);
    }
}

var removeItem = function(itemIndex) {
    cart.splice(itemIndex, 1);
    updateCart();
}

var clearCart = function() {
    cart = [];
    updateCart();

}

$('.view-cart').on('click', function() {

    var shoppingCart = $('.shopping-cart');
    shoppingCart.toggle();
});

$('.shopping-cart-table').on('click', '.add-to-cart', function() {
    // TODO: get the "item" object from the page

    var item = $(this).closest('.card').data();

    addItem(item);
    updateCart();
});

$('.clear-cart').on('click', function() {
    clearCart();
});

// // update the cart as soon as the page loads!
updateCart();

$('.cart-list').on('click', '.remove', function() {
    var itemIndex = $(this).closest('p').index(); // get item's index
    removeItem(itemIndex);
});