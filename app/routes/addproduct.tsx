import { ActionFunction, json, redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import React, { useState, ChangeEvent } from 'react';
import { createProduct } from '~/utils/product.server';

interface FormData {
  pname: string;
  sku: string;
  price: string;
  color: string;
  size: string;
  status: string;
}


export const action: ActionFunction = async ({ request }) => {

  const form = await request.formData()

  const pname = form.get('pname')
  const sku = form.get('sku')
  const price = form.get('price')
  const color = form.get('color')
  const size = form.get('size')
  const status = form.get('status')

  if (
    typeof pname !== 'string' ||
    typeof sku !== 'string' ||
    typeof price !== 'string' ||
    typeof color !== 'string' ||
    typeof size !== 'string' ||
    typeof status !== 'string'
  ) {
    return json({ error: `Invalid Form Data` }, { status: 400 })
  }

  await createProduct(pname, sku, price, color, size, status);
1
  return redirect('/listproduct')
}

const AddProduct: React.FC = () => {

  const [formData, setFormData] = useState<FormData>({
    pname: '',
    sku: '',
    price: '',
    color: '',
    size: 'S',
    status: 'Enable',
  });


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'sku') {
      const alphanumericRegex = /^[a-zA-Z0-9]*$/;
      if (!alphanumericRegex.test(value)) {
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container">
      <h2 className="form-heading">Add Product</h2>
      <Form method="post">
        <div className="form-group">
          <label htmlFor="pname">Product Name</label>
          <input
            className="inputfield"
            type="text"
            id="pname"
            name="pname"
            placeholder="Enter product name"
            required
            value={formData.pname}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sku">SKU</label>
          <input
            className="inputfield"
            type="text"
            id="sku"
            name="sku"
            placeholder="Enter SKU"
            required
            value={formData.sku}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            className="inputfield"
            type="number"
            id="price"
            name="price"
            step="0.01"
            placeholder="Enter price"
            required
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input type="color" id="color" name="color" value={formData.color} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="size">Size</label>
          <select
            id="size" 
            name="size"
            className="form-select"
            value={formData.size}
            onChange={handleChange}
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
            className="form-select"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Enable">Enable</option>
            <option value="Disable">Disable</option>
          </select>
        </div>
        <button type="submit" className="button">
          Submit
        </button>
      </Form>
    </div>
  );
};

export default AddProduct;
