async function getProducts(){
    const response = await fetch('http://localhost:3000/productos');
    const data = await response.json();
    return data;
}

async function addProduct(producto){
    const response = await fetch('http://localhost:3000/productos', {
        method: 'POST',
        body: JSON.stringify(producto),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}

async function deleteProduct(id){
    const response = await fetch(`http://localhost:3000/productos/${id}`, {
        method: 'DELETE'
    });
    return response;
}

export { getProducts, addProduct, deleteProduct };
