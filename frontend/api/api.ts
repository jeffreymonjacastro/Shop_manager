const BACKEND_URL = 'http://192.168.0.220:5000'

// New Product
/* This function connects to the localhost to upload a new product
  * @param {Form} - The form with the product information
  * @returns {Object} - The product uploaded
*/
export const newProduct = async (form: FormData) => {
  const res = await fetch(`${BACKEND_URL}/products`, {
    method: 'POST',
    body: form
  })

  const data = await res.json()
  return data
}

// Get Products
/* This function connects to the localhost to get all the products
  * @returns {Array} - An array of products
*/
export const getProducts = async () => {
  const res = await fetch(`${BACKEND_URL}/products`)
  const data = await res.json()
  return data
}