const precios = document.querySelectorAll("main article .precio span");
const cantidades = document.querySelectorAll("main article input.quantity");
const precioFinal = document.getElementById("precioFinal");
const botones = document.querySelectorAll(".number-input button")

precioUnitario =[]
precios.forEach((p,i)=>
precioUnitario.push((Number(p.innerText)/cantidades[i].value).toFixed(2)));

calcularTotal();

botones.forEach(b => {
    b.addEventListener("click",calcularTotal);
})

function calcularTotal() {
    let total = 0
    precioUnitario.forEach((precio,i) => {
        total = total + precio* cantidades[i].value
        precios[i].innerText = (precio* cantidades[i].value).toFixed(2)
    });

    precioFinal.innerText = total.toFixed(2);
}