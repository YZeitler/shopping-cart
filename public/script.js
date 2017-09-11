// Local Storage Init
var STORAGE_ID = 'shopping-cart';
var saveToLocalStorage = function() {
    localStorage.setItem(STORAGE_ID, JSON.stringify(cart));
};
var getFromLocalStorage = function() {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
};

// an array with all of our cart items
var cart = [];

var source = $('#store-template').html();
var template = Handlebars.compile(source);

var updateCart = function() {
    $('.cart-list').empty();

    // Update cart from local storage
    cart = getFromLocalStorage();

    var totalPrice = 0;
    for (i = 0; i < cart.length; i++) {
        var HTML = template(cart[i]);
        $('.cart-list').append(HTML);
        totalPrice += cart[i].price * cart[i].quantity;
        // Set quantity dropdown position on current quantity
        $('.cart-list').find('select').last().val(cart[i].quantity);
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
    // Update Local Storage
    saveToLocalStorage();
}

var removeItem = function(itemIndex) {
    cart.splice(itemIndex, 1);
    // Update Local Storage
    saveToLocalStorage();

    updateCart();
}

var clearCart = function() {
    cart = [];
    // Update Local Storage
    saveToLocalStorage();

    updateCart();
}

var changeQuantity = function(cartIndex, newQuantity) {
    cart[cartIndex].quantity = newQuantity;
    saveToLocalStorage();
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

$('.cart-list').on('click', '.remove', function() {
    var itemIndex = $(this).closest('.cart-item').index(); // get item's index
    removeItem(itemIndex);
});

$('.shopping-cart').on('change', 'select', function() {
    var index = $(this).closest('.cart-item').index();
    var value = $(this)[0].value;
    changeQuantity(index, value);
});

// update the cart as soon as the page loads!
updateCart();