let addButton = document.getElementsByClassName('add-button');
addButton[0].addEventListener('click', addOrder);

let drinksCount = 1;


function addOrder() {
    drinksCount++;
    let fieldSet=document.getElementsByClassName('beverage')[0].cloneNode(true);
    fieldSet.getElementsByClassName('beverage-count')[0].textContent = `Напиток № ${drinksCount}`;
    // let cross =  fieldSet.getElementsByClassName('deleteField')[0];
    // cross.addEventListener('click', deleteOrder);
    let inputs = fieldSet.getElementsByClassName('milkField')[0].getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].name = `milk ${drinksCount}`;
    }
    let order=document.getElementById('orderList');
    order.appendChild(fieldSet);
}


// function deleteOrder() {
//     drinksCount--;
// }