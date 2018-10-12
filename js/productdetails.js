initialize();

$(function () {

})


function initialize(){
    loadShoes();
}

function loadShoes(){
    var id = document.URL.split('=')[1];
    console.log(id);
    $.ajax({
        dataType: 'json',
        url: `https://cheetahshoes.azurewebsites.net/api/shoes/${id}`,
        success: shoe => {
            onLoadPage(shoe);
        }
    });
}

function onLoadPage(shoe){
    var html = '';
        html += createShoeHTML(shoe);
    $("#product_area_detail").append(html)

}

function createShoeHTML(shoe){
    return `
                <div id="product_detail">
                <div class="product_img_detail"><img src="${shoe.picture}"></div>
                <div class="product_title_detail"><h1>${shoe.model}</h1></div>
                <div class="product_desc_detail"><p>${shoe.description}</p></div>
                <div class="product_price_detail">DKK ${shoe.price},-</div>
                <div class="product_shop_buy_detail"><a href="cart.html?id=${shoe.id}">PREORDER</a></div>
            </div>
    `
}