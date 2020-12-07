import {GET_ITEMS,ADD_ITEM,DELETE_ITEM,ITEMS_LOADING} from './types'
import axios from 'axios'

export const getItems = () => dispatch => {
    //prethodni kod
    // return {
    //     type:GET_ITEMS
    // }
    //res.data su sada podaci koji se dohvate kada se pogodi /api/items ruta iz servera
    dispatch(setItemsLoading())
    axios.get('/api/items').then(res => dispatch({
        type:GET_ITEMS,
        payload:res.data
    }))
}

export const deleteItem = (id) => dispatch => {
    // return {
    //     type:DELETE_ITEM,
    //     payload:id
    // }
    axios.delete(`/api/items/${id}`).then(res => dispatch({
        type:DELETE_ITEM,
        payload:id
    }))
}

export const addItem = item  => dispatch => {
    // return {
    //     type:ADD_ITEM,
    //     payload:item
    // }
    //res.data je novi item koji je kreiran kad se pozove ruta post /api/items
    axios.post('/api/items',item).then(res => dispatch({
        type:ADD_ITEM,
        payload:res.data
    }))
}

export const setItemsLoading = () => {
    return {
        type:ITEMS_LOADING
    }
}