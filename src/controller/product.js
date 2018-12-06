import mongoose from 'mongoose';
import { Router } from 'express';
import Product from '../model/product';
import Review from '../model/review';
import { authenticate } from '../middleware/authMiddleware'

export default ({ config, db}) => {
	let api = Router();

    // CRUD


	// Create : '/v1/product/add'
	api.post('/add', authenticate, (req, res) => {
		let newProduct = new Product();
		newProduct.name = req.body.name;
        newProduct.ptype = req.body.ptype;
        newProduct.price = req.body.price;
        newProduct.img = req.body.img;


 
		newProduct.save(err => {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'Product saved successfully'});
		});
	});




    // Read : '/v1/product'
    api.get('/', (req, res) => {
        Product.find({}, (err, products) => {
        	if (err) {
        		res.send(err);
        	}
            res.json(products);
        });
    });
    // Read 1 : '/v1/product/:id'
    api.get('/:id', (req, res) => {
    	Product.findById(req.params.id, (err, product) => {
    		if (err) {
    			res.send(err);
    		}
    		res.json(product);
    	});
    });


    

    // Update 1 : '/v1/product/:id'
    api.put('/:id', (req, res) => {
    	Product.findById(req.params.id, (err, product) => {
    		if (err) {
    			res.send(err);
    		}
    		product.name = req.body.name;
    		product.save(err => {
    			if (err) {
    				res.send(err);
    			}
    			res.json({ message: "Product info updated"});
    		});
    	});
    });


    // Delete 1 : '/v1/product/:id'
    api.delete('/:id', (req, res) => {
    	Product.remove({
    		_id: req.params.id
    	}, (err, product) => {
            if (err) {
            	res.send(err);
            }
            res.json({ message: "Product successfully Removed"});
    	});
    });
    

    // add review for a specific product id
    // '/v1/product/reviews/add/:id'
    api.post('/reviews/add/:id', (req, res) => {
        Product.findById(req.params.id, (err, product) =>{
            if (err) {
                res.send(err);
            }
            let newReview = new Review();
            newReview.title = req.body.title;
            newReview.text = req.body.text;
            newReview.product = product._id;
            newReview.save((err, review) => {
                if (err) {
                    res.send(err);
                }
                product.reviews.push(newReview);
                product.save(err => {
                    if (err) {
                        res.send(err);
                    }
                    res.json({ message: 'Product review saved'});    
                });
            });

        });
    });


      // get reviews for a specific product
     // Read 1 : '/v1/product/reviews/:id'
    api.get('/reviews/:id', (req, res) => {
       Review.find({product: req.params.id}, (err, reviews) => {
           if (err) {
            res.send(err);
           }
           res.json(reviews);
       });
    });



	return api;
}