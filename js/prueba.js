function mostrar(){
let acumular = '';
    for (let i = 0; i < cart.length; i++){
        let template = `
        <tr><td>${cart[i].id}</td>
        <td>${cart[i].productName}</td>
        <td>${cart[i].price}</td>
        <td><button class= "btn btn-primary"
         data-id=${cart[i].id}
        data-name=${cart[i].productName}
        data-price=${cart[i].price}
        </tr>
        `;
}
}