const jwt = require('jsonwebtoken');
const Product = require('../models/Product');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if(err) res.status(403).json("Expired token!");
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        } else {
            res.status(403).json("You are not allowed to do that!");
        }
    });
}

const verifyTokenAndSellerAuthorization = (req, res, next) => {
    verifyToken(req, res, async () => {
        try {
            const product = await Product.findById(req.params.id);
            if (req.user.id === product.createdBy.toString() || req.user.isAdmin) {
                next();
            } else {
                res.status(403).json("You are not allowed to do that!");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    });
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            next();
        } else {
            res.status(403).json("You are not allowed to do that!");
        }
    });
}

const verifyTokenAndAdminOrSeller = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin || req.user.isSeller){
            next();
        } else {
            res.status(403).json("You are not allowed to do that!");
        }
    });
}

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdminOrSeller, verifyTokenAndAdmin, verifyTokenAndSellerAuthorization};