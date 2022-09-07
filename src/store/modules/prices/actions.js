import Axios from 'axios'
import Config from '../config'

const FetchPricesHistory = ()=>{
    Axios.get(Config.BackendUrl+'prices').then(res=>{
        console.log(res);
    })
}   
const FetchLatestPrice = ({commit},payload)=>{
    Axios.get(Config.BackendUrl+'prices/latest').then(res=>{
        if (res.status == 200) {
            commit('SetLatestPrice',res.data)
            return true
        }
    })
}   
const CreateNewProductPrice = ({commit},payload)=>{
    Axios.post(Config.BackendUrl+'prices',{price:payload}).then(res=>{
        if (res.status == 200) {
            return true
        }
        return false
    })
}
export default {
    FetchPricesHistory,
    CreateNewProductPrice,
    FetchLatestPrice
}