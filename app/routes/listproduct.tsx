import { LoaderFunction, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { getProducts } from "~/utils/product.server"
import { Link } from "@remix-run/react";

interface Product {
  id : string;
  pname: string;
  sku: string;
  price: number;
  color: string;
  size: string;
  status: string;
}
      
export const loader: LoaderFunction = async () => {
  const products = await getProducts()
  return json({products})
}

export default function Products() {

  const { products } = useLoaderData<{ products: Product[] }>();

  return (
    <>
   <div className="addproduct">
   <button className="button">   <Link to={`/addproduct`}>Add Product</Link></button>
   </div>

    <table>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>SKU</th>
          <th>Price</th>
          <th>Color</th>
          <th>Size</th>
          <th>Status</th>
          <th>Actions</th> 
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td>{product.pname}</td>
            <td>{product.sku}</td>
            <td>{product.price}</td>
            <td>{product.color}</td>
            <td>{product.size}</td>
            <td>{product.status}</td>
            <td className="button-center">
              
                <button className="button">   <Link to={`/productupdate/${product.id}`}>Update Product</Link></button>
                <button className="button">   <Link to={`/deleteproduct/${product.id}`}>Delete Product</Link></button>
                <button className="button">   <Link to={`/viewproduct/${product.id}`}>view Product</Link></button>

              </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
    
   
  )
}