import { ActionFunction, LoaderFunction, json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getProductById, updateProduct } from '~/utils/product.server';
import { ChangeEvent, useEffect, useState } from 'react'


// first get data 
export const loader: LoaderFunction = async ({params}) => {
  const { productId } = params

  if (typeof productId !== 'string') {
    return redirect('/listproduct')
  }
  let product = await getProductById(productId)
  return json({ product, productId });
};
//   check data type
interface FormData {
  pname: string;
  sku: string;
  price: string;
  color: string;
  size: string;
  status: string;
}

//ActionFunction//ActionFunction//ActionFunction
export const action: ActionFunction = async ({ request, params }) => {

  const { productId } = params

  const form = await request.formData()

  const pname = form.get('pname')
  const sku = form.get('sku')
  const price = form.get('price')
  const color = form.get('color')
  const size = form.get('size')
  const status = form.get('status')

  if (
    typeof productId !== 'string' ||
    typeof pname !== 'string' ||
    typeof sku !== 'string' ||
    typeof price !== 'string' ||
    typeof color !== 'string' ||
    typeof size !== 'string' ||
    typeof status !== 'string'
  ) {
    return json({ error: `Invalid Form Data` }, { status: 400 })
  }

  await updateProduct(productId, {pname, sku, price, color, size, status});

  return redirect('/listproduct')
}
//ActionFunction//ActionFunction//ActionFunction

 

const UpdateProduct: React.FC = () => {

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

  
  // onchage data 
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  };
  
  return (
    <div className="container">
      <h2 className="form-heading">Update Product</h2>
      <form method="post">
        <div className="form-group">
          <label htmlFor="pname">Product Name</label>
          <input
            className="inputfield"
            type="text"
            id="pname"
            name="pname"
            placeholder="Enter product name"
            required
            value={updateFormData.pname}
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
            value={updateFormData.sku}
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
            value={updateFormData.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input type="color" id="color" name="color" value={updateFormData.color} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="size">Size</label>
          <select
            id="size"
            name="size"
            className="form-select"
            value={updateFormData.size}
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
          <label htmlFor="size">Size</label>
          <select
            id="status"
            name="status"
            className="form-select"
            value={updateFormData.status}
            onChange={handleChange}
          >
            <option value="Enable">Enable</option>
            <option value="Disable">Disable</option>
          </select>
        </div>
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
