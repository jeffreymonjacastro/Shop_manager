const BACKEND_URL = 'http://192.168.0.220:5000'

// POST Product
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

// GET Products
/* This function connects to the localhost to get all the products
  * @returns {Array} - An array of products
*/
export const getProducts = async () => {
  const res = await fetch(`${BACKEND_URL}/products`)
  const data = await res.json()
  return data
}

// GET product by id
/* This function connects to the localhost to get a product by id
  * @param {Number} - The id of the product
  * @returns {Object} - The product
*/
export const getProductById = async (id: number) => {
  const res = await fetch(`${BACKEND_URL}/products/${id}`)
  const data = await res.json()
  return data
}

// DELETE product by id
/* This function connects to the localhost to delete a product by id
  * @param {Number} - The id of the product
  * @returns {Object} - The product deleted
*/
export const deleteProductById = async (id: number) => {
  const res = await fetch(`${BACKEND_URL}/products/${id}`, {
    method: 'DELETE'
  })
  const data = await res.json()
  return data
}

// PUT product by id
/* This function connects to the localhost to update a product by id
  * @param {Number} - The id of the product
  * @param {Form} - The form with the product information
  * @returns {Object} - The product updated
*/
export const updateProductById = async (id: number, form: FormData) => {
  const res = await fetch(`${BACKEND_URL}/products/${id}`, {
    method: 'PUT',
    body: form
  })
  const data = await res.json()
  return data
}