import {LoaderFunction, json, redirect } from "@remix-run/node"
import productdelete from "~/utils/product.server"

export const loader: LoaderFunction = async ({ params }) => {
  const { productId } = params
  if(typeof productId !== 'string'){
    return json({error: 'Invalid data'})
  }
  await productdelete(productId)
  return redirect('/listproduct')
}
