import axios from '../helpers/axios';
import { categoryConstansts } from './constants';

/* eslint-disable no-use-before-define */
export const getAllCategory = () => {
    return async dispatch => {

        dispatch({ type: categoryConstansts.GET_ALL_CATEGORIES_REQUEST });
        const res = await axios.get(`category/getcategory`);
        console.log(res);

        if (res.status === 200) {

            const { categoryList } = res.data;

            dispatch({
                type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: categoryList }
            });
        } else {
            dispatch({
                type: categoryConstansts.GET_ALL_CATEGORIES_FAILURE,
                payload: { error: res.data.error }
            });
        }

    }
}

export const addCategory = (form) => {
    return async dispatch => {
        dispatch({ type: categoryConstansts.ADD_NEW_CATEGORY_REQUEST });
        try {
            const res = await axios.post(`/category/create`, form);
            if (res.status === 201) {
                dispatch({
                    type: categoryConstansts.ADD_NEW_CATEGORY_SUCCESS,
                    payload: { category: res.data.category }
                });
            } else {
                dispatch({
                    type: categoryConstansts.ADD_NEW_CATEGORY_FAILURE,
                    payload: res.data.error
                });
            }
        } catch (error) {
            console.log(error.response);
        }

    }
}

export const updateCategories = (form) => {
    return async dispatch => {
        try {
            const res = await axios.post(`/category/update`, form);
            if (res.status === 201) {
                return true;
                // eslint-disable-next-line no-unreachable
                console.log("🚀 ~ file: category.action.js ~ line 58 ~ updateCategory ~ res", res)

            } else {
                console.log("🚀 ~ file: category.action.js ~ line 61 ~ updateCategory ~ res", res)
            }
        } catch (error) {
            console.log(error.response);
        }

    }
}

export const deleteCategories = (ids) => {
    return async dispatch => {
        /* dispatch({ type: categoryConstansts.DELETE_CATEGORIES_REQUEST }); */
        const res = await axios.post(`/category/delete`, {
            payload: {
                ids
            }
        });
        console.log("🚀 ~ file: category.action.js ~ line 80 ~ deleteCategories ~ res", res)

        // eslint-disable-next-line eqeqeq
        if(res.status == 201) {
            return true;
        } else {
            return false;
        }

        
        // eslint-disable-next-line eqeqeq
/*         if (res.status == 201) {
            dispatch(getAllCategory());
            dispatch({ type: categoryConstansts.DELETE_CATEGORIES_SUCCESS });
        } else {
            const { error } = res.data;
            dispatch({
                type: categoryConstansts.DELETE_CATEGORIES_FAILURE,
                payload: { error }
            });
        } */
    }
}