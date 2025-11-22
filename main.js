let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let btndelete = document.getElementById('deleteAll');

function gettotal()
{
    if(price.value != '')
    {
        let result = (+price.value + +taxes.value + +ads.value ) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }
    else{
        total.innerHTML = '';
        total.style.background = 'rgba(245, 3, 3, 1)';
    }
}

//create
let datapro ;
if(localStorage.product != null)
{
    datapro = JSON.parse(localStorage.product)
}
else{
    datapro = [] ;
}

submit.onclick = function()
{
    let newpro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
    datapro.push(newpro)
    // save Data
    localStorage.setItem('product', JSON.stringify(datapro))

    clearData()
    showData()
    
}

    
//clear data
 function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

//Read

 function showData() {
  let table = '';
  for (let i = 0; i < datapro.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr>
    `;
  }
  
  document.getElementById('tbody').innerHTML = table;
  
  if(datapro.length > 0)
  {
    btndelete.innerHTML = `
    <button onclick ="deleteAll()">deleteAll</button> `;
  }else{
    btndelete.innerHTML = '';
  }
}
showData()


function deleteData(i){
datapro.splice(i,1);
localStorage.product =JSON.stringify(datapro);
showData()
}

function deleteAll(){
    localStorage.clear();
    datapro.splice(0);
    showData()
}