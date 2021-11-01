const path = require('path');
const fs = require('fs');
const res = require('express/lib/response');

let jsonProducts = fs.readFileSync(path.resolve(__dirname, '../db/products.json'), 'utf-8');
let products = JSON.parse(jsonProducts); 

const nuevoId = () => {
    let ultimo = 0;
    products.forEach(product => {
        if (product.id > ultimo) {
            ultimo = product.id;
        }
    });
    return ultimo + 1;
}


module.exports = {

    productDetail: (req, res) => {
        let id = req.params.id;
        let productoDetalle = products.find(product => {
            return product.id == id;
        })
        res.render('product', { product: productoDetalle });
    },

    addProduct: (req, res) => {
        res.render('addProduct');
    },

    store (req, res) {
        let images = [ req.files[0].filename, req.files[1].filename]
        let newProduct = {
            id: nuevoId(),
            ...req.body,
             image: images || 'default-image.png',
        }
     
        products.push(newProduct);
    
        let jsonDeProducts = JSON.stringify(products, null, 4);
        fs.writeFileSync(path.resolve(__dirname, '../db/products.json'), jsonDeProducts);
    
        res.redirect('/');
    },
    
    editProduct: function (req, res)  {
        let productoEditar = products.find(product => {
            return product.id == req.params.id;
        })
        res.render('product/editProduct', { product: productoEditar });
    },

    update (req, res) {
        
        products.forEach(product => {
            if (product.id == req.params.id) {
                product.name == req.body.name;
                product.detail == req.body.detail;
                product.price == req.body.price;
                product.artistname == req.body.artistname;
                product.artistbio == req.body.artistbio;
                product.artistcode == req.body.artistcode;
                product.image == 'default-image.png';
            }
        })
        let productToEdit = products.find(product => {
            return product.id == req.params.id;
        })
        productToEdit.name = req.body.name;

        let jsonDeProducts = JSON.stringify(productosRestantes, null, 4);
        fs.writeFileSync(path.resolve(__dirname, '../db/products.json'), jsonDeProducts);
        
        res.redirect('/product');
    },

    listOfProducts: (req, res) => {
        res.render('listOfProducts', { products })
    },
   
    delete (req, res) {
        let productosRestantes = products.filter(product => {
            return product.id != req.params.id;
        })

        let jsonDeProducts = JSON.stringify(productosRestantes, null, 4);
        fs.writeFileSync(path.resolve(__dirname, '../db/products.json'), jsonDeProducts);
    
        res.redirect('/');
    }
    

}
