var itemTemplate = Handlebars.compile($('#item-template').html());

$('.btn-submit-item').click(function() {
    if (itemlength % 3 === 0) {
        addRow();
    }
    var $lastRow = $('.shopping-cart-table').find('.row').last();

    var newItem = newItemObj();
    itemlength++

    $('.shopping-cart-table').find('.row').last().append(itemTemplate(newItem));
});

function addRow() {
    $('.shopping-cart-table').append('<div class="row"></div>');
}

function newItemObj() {
    var itemObj = {
        name: $('#new-item-name').val(),
        price: $('#new-item-price').val(),
        picture: $('#new-item-pic').val()
    }
    return itemObj;
}