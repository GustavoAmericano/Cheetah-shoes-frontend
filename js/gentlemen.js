initialize();
initialize();

$(function () {

})


function initialize(){
    loadShoes();
}

function loadShoes(){
    $.ajax({
        dataType: 'json',
        url: `https://cheetahshoes.azurewebsites.net/api/shoes/?CurrentPage=1&ItemsPerPage=6&Terms=MALE`,
        success: shoes => {
            onLoadPage(shoes);
        }
    });
}

function onLoadPage(shoes){
    var html = '';
    $.each(shoes, (index,shoe) => {
        html += createShoeHTML(shoe);
    })
    $("#product_area").append(html)

}

function createShoeHTML(shoe){
    return `
                <div id="product"><a href="product-details.html?id=${shoe.id}">
                <div class="product_img"><img src="${shoe.picture}"></div>
                <div class="product_title"><a href="product-details.html?id=${shoe.id}"><h1>${shoe.model}</h1></a></div>
                <div class="product_price">DKK ${shoe.price},-</div>
                <div class="product_shop_buy"><a href="cart.html?id=${shoe.id}">PREORDER</a></div>
                </div>
    `
}