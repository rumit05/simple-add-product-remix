import { prisma } from "./prisma.server";


// crate product
export const createProduct = async (
    pname: string,
    sku: string,
    price: string,
    color: string,
    size: string,
    status: string
) => {
    await prisma.product.create({
        data:{
            pname,
            sku,
            price,
            color,
            size,
            status
        },
    });
};

// get  product data 
export const getProducts = async () => {
    return await prisma.product.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
};






// upadate  function 
export const updateProduct = async (productId: string, newData: any) => {
    await prisma.product.update({
        where: {
            id: productId,
          },
        data: newData
    })
}
//  getproduct id 
export const getProductById = async (productId: string ) => {
    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
      })
      return product;
}



//delete product
export default async function productdelete(productId: string) {
    const deleteproduct = await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    return deleteproduct;
  }
