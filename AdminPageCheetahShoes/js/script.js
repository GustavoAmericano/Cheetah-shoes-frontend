var page = 1; // Current page
var ipp = 4; // Items per page


$(function () {

    $("#loadAllShoes-button").click(() =>{
        loadAllShoes();
    })
    $("#createShoe-button").click(() => {
        createNewShoe();
    })

    $("#editShoe-button").click(() => {
        editShoe($("#editID").val());
    })

    $("#prev-button").click(() => {
        changePage("prev");
    })

    $("#next-button").click(() => {
        changePage("next");
    })

})

function createNewShoe(){
    $.ajax({
        dataType: 'json',
        url: 'https://cheetahshoes.azurewebsites.net/api/shoes',
        contentType: 'application/json',
        type: 'post',
        data: JSON.stringify( {
            "brand" : $("#cBrand").val(),
            "model" : $("#cModel").val(),
            "price" : $("#cPrice").val(),
            "description" : $("#cDescription").val(),
            "gender" : $("#cGender").val(),
            "picture" : $("#cURL").val()
        }),
        processData: false,
        success: data =>{
            postSingleShoe(data)
            $("#cBrand").val("Cheetah Shoes")
            $("#cModel").val("")
            $("#cPrice").val("")
            $("#cDescription").val("")
            $("#cURL").val("")
        },
        error: http => alert(`${http.responseText}`)
    })
}

function postSingleShoe(shoe){
    $('#shoe-table tbody').append(createTableRow(shoe));
}

function updateSingleShoe(shoe){
    $(`#shoe-table tbody #tr${shoe.id}`).replaceWith(createTableRow(shoe));
}
function loadAllShoes(){
    $.ajax({
        dataType: 'json',
        url: `https://cheetahshoes.azurewebsites.net/api/shoes/?CurrentPage=${page}&ItemsPerPage=${ipp}&Terms=ALL`,
        success: shoes => {
            postListSuccess(shoes)
        }
    })
}

function postListSuccess(shoes){
    $('#shoe-table tbody').html('');
    $.each(shoes, (index,shoe) => {
        $('#shoe-table tbody').append(createTableRow(shoe))
    })
}

function createTableRow(shoe){
    var row = `<tr id="tr${shoe.id}">
  <td>${shoe.id}</td>
  <td>${shoe.brand}</td>
  <td>${shoe.model}</td>
  <td>${shoe.price}</td>
  <td>${shoe.gender}</td>
  <td>${shoe.description}</td>
  <td>N/A</td>
  <td>
  <button onclick="deleteShoe(${shoe.id})">DELETE</button>
  </td>

  </tr>`
    return row

    //   <button onclick="editShoeLoad(${shoe.id})">EDIT</button>
}

function deleteShoe(id){
    $.ajax({
        dataType: 'json',
        url: `https://cheetahshoes.azurewebsites.net/api/shoes/${id}`,
        type: 'delete',
        success: $(`#shoe-table tbody #tr${id}`).html('')
    })


}

function editShoe(id){
    loadShoeOnId(id);
}

function loadShoeOnId(id){
    $.ajax({
        dataType: 'json',
        url: `https://cheetahshoes.azurewebsites.net/api/shoes/${id}`,
        //success: shoe => makeRowEditable(shoe)
        success: shoe => createEditFields(shoe)
    })
}

function createEditFields(shoe){
    $("#editDiv").html('').append(`
                <label>Brand: <input id="eBrand" value="${shoe.brand}"></label>
                <label>Model: <input id="eModel" value="${shoe.model}"></label>
                <label>Price: <input id="ePrice" type="number" min="1" value="${shoe.price}"></label>
                <label>Description: <input id="eDescription" value="${shoe.description}"></label>
                <label>Gender: <select id="eGender" value="${shoe.gender}">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select></label>
                <label>URL:<input id="eURL" value="${shoe.picture}"></label>
                <br>
                <button onclick="saveShoe(${shoe.id})">SAVE</button>
    `)
}

function changePage(val){
    if(val == "prev"){
        if(page <= 1) return;
        page = page-1;
    }else if (val == "next"){
        if(page >= 9999) return;
        page = page+1;
    }
    loadAllShoes();
}

function saveShoe(id){
    $.ajax({
        dataType: 'json',
        url: `https://cheetahshoes.azurewebsites.net/api/shoes/${id}`,
        contentType: 'application/json',
        type: 'put',
        data: JSON.stringify( {
            "id" : id,
            "brand" : $("#eBrand").val(),
            "model" : $("#eModel").val(),
            "price" : $("#ePrice").val(),
            "description" : $("#eDescription").val(),
            "gender" : $("#eGender").val(),
            "picture" : $("#eURL").val()
        }),
        processData: false,
        success: data =>{
            updateSingleShoe(data)
            $("#editDiv").html('')
        },
        error: http => alert(`${http.responseText}`)
    })
}
/*function getSizes(shoe){

    var sizeRows = '';

    $.each(shoe.sizes, (index, size) => {
        sizeRows += `
        <tr> 
            <td>${size.size.sizeNumber}</td>
            <td>${size.stock}</td>
         </tr>
        `
    })

    return  ` 
                        <table id="size-table-${shoe.id}" class="table">
                            <thead>
                            <tr>
                                <tr>Size</tr>
                                <tr>Stock</tr>
                            </tr>
                            </thead>
                            <tbody>
                                ${sizeRows}
                            </tbody>
                        </table>
                    `

}*/
/*function editShoeLoad(id){
    makeRowEditable(loadShoeOnId(id))
}*/
/*function makeRowEditable(shoe){
    $(`#tr${shoe.id}`).html('').append(`
        <td>${shoe.id}</td>
        <td><input id = "eBrand" value="${shoe.brand}"></td>
        <td><input id = "eModel" value="${shoe.model}"></td>
        <td><input id = "ePrice" value="${shoe.price}"></td>
        <td><input id = "eGender" value="${shoe.gender}"></td>
        <td><input id = "eDescription" value="${shoe.description}"></td>
        <td>TO BE IMPL</td>
        <td><button>SAVE</button></td>
    `);
}*/






