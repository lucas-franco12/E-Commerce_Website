import React from 'react'
import products from '../products'
import ProductCard from './ProductCard'

export default function ProductCatalog(){
    // const [productList, setProductList] = React.useState(products);
    const productList = products;

    const productListElements = productList.map((product) => {
        return <ProductCard key={product.id} product={product} />;
    });

    return(
        <div>
            {productListElements}
        </div>
    );
}