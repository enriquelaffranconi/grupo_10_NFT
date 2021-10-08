const path = require('path');


module.exports = {
    home: (req, res) => {
        res.sendFile(path.resolve('src/views/home.html'));
    },
    cart: (req, res) => {
        res.sendFile(path.resolve('src/views/cart.html'));
    }
}