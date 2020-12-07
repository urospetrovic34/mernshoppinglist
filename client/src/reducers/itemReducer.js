//import {v1 as uuid} from 'uuid'
import {GET_ITEMS,ADD_ITEM,DELETE_ITEM,ITEMS_LOADING} from '../actions/types'

//ceo initialState se podrazumeva pod item u komponentama i elsewhere
const initialState = {
    items:[],
    loading:false
}

//action parametar se odnosi na objekat iz fajla itemActions.js u kom je naveden i tip akcije
//kada se podaci ucitaju pomocu loading i kada se dohvate pomocu get, loading vrednost se postavlja ponovo na false
export default function(state = initialState,action) {
    switch(action.type){
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item=>item._id!==action.payload)
            }
        case ADD_ITEM:
            //items: [action.payload,...state.items] ubacuje ceo item iz payload-a u state-items
            return{
                ...state,
                items: [action.payload,...state.items]
            }
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}