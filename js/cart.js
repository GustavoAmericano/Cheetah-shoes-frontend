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

    //Math.round(num * 100) / 100
    var html = '';
    html += createShoeTD(shoe);
    $("#tr-product").append(html)
    $("#pricenotax").append(`DKK ${Math.floor(shoe.price*.80)},-`)
    $("#taxprice").append(`DKK ${(Math.floor(shoe.price*0.20))}`)
    $("#pricetax").append(`DKK ${Math.floor(shoe.price)},-`)

}

function createShoeTD(shoe){
    return `
        <td class="tdthumb"><img class="thumb" src="${shoe.picture}"></td>
        <td>${shoe.model}</td>
        <td>DKK ${shoe.price},-</td>
        <td></td>
    `
}