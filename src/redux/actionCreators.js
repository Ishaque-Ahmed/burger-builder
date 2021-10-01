import * as actionTypes from './actionTypes'
import axios from 'axios'

export const addIngredient = igType => {
    return ({
        type: actionTypes.ADD_INGREDIENT,
        payload: igType,
    })
}

export const removeIngredient = igType => {
    return ({
        type: actionTypes.REMOVE_INGREDIENT,
        payload: igType

    })
}

export const updatePurchasable = () => {
    return ({
        type: actionTypes.UPDATE_PURCHASABLE,

    })
}

export const resetIngredients = () => {
    return ({
        type: actionTypes.RESET_INGREDIENTS,
    })
}

export const loadOrders = orders => {
    return ({
        type: actionTypes.LOAD_ORDERS,
        payload: orders,
    })
}

export const orderLoadFailed = () => {
    return ({
        type: actionTypes.ORDER_LOAD_FAILED,
    })
}

export const fetchOrders = (token, userId) => dispatch => {
    const queryParam = '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('https://burger-builder-21020-default-rtdb.firebaseio.com/order.json?auth='
        + token + queryParam)
        .then(response => dispatch(loadOrders(response.data)))
        .catch(error => dispatch(orderLoadFailed()));

}