import {  LoaderFunction, json, redirect } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { getProductById } from '~/utils/product.server';
import { ChangeEvent, useEffect, useState } from 'react'


export const loader: LoaderFunction = async ({params}) => {
  const { productId } = params

  if (typeof productId !== 'string') {
    return redirect('/listproduct')
  }
  let product = await getProductById(productId)
  return json({ product, productId });
};

interface FormData {
  pname: string;
  sku: string;
  price: string;
  color: string;
  size: string;
  status: string;
}




const ViewProduct: React.FC = () => {

  const {product} = useLoaderData<typeof loader>()

  const [updateFormData, setUpdateFormData] = useState<FormData>({
    pname: '',
    sku: '',
    price: '',
    color: '',
    size: 'S',
    status: 'Enable',
  });

  useEffect(() => {
    setUpdateFormData(product);
  }, [product]);

  
  return (
    <div className="container">
      <h2 className="form-heading">View Product</h2>
      <form method="post">
        <div className="form-group">
          <label htmlFor="pname">Product Name</label>
          <input
            className="inputfield font-size"
            type="text"
            id="pname"
            name="pname"
            placeholder="Enter product name"
            required
            value={updateFormData.pname}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="sku">SKU</label>
          <input
            className="inputfield font-size"
            type="text"
            id="sku"
            name="sku"
            placeholder="Enter SKU"
            required
            value={updateFormData.sku}
            disabled
            
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            className="inputfield font-size"
            type="number"
            id="price"
            name="price"
            step="0.01"
            placeholder="Enter price"
            required
            value={updateFormData.price}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input type="color" id="color" name="color" value={updateFormData.color}  />
        </div>
        <div className="form-group">
          <label htmlFor="size">Size</label>
          <select
            id="size"
            name="size"
            className="form-select font-size"
            value={updateFormData.size}
            disabled
          >
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="size">Status</label>
          <select
            id="status"
            name="status"
            className="form-select font-size"
            value={updateFormData.status}
            disabled
          >
            <option value="Enable">Enable</option>
            <option value="Disable">Disable</option>
          </select>
        </div>
        
        <button className="button">
            <Link to={'/listproduct'}>Close</Link>
            </button>
      </form>
    </div>
  );
};

export default ViewProduct;
