import axios from '../helpers/axios';

export const addProduct = (form) => {
    return async dispatch => {
      
        const res = await axios.post(`product/create`, form);
        console.log("🚀 ~ file: product.action.js ~ line 8 ~ return ~ resProduct", res)

    };
  };