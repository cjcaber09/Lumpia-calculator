import Axios from 'axios'
import Config from '../config'

const FetchLatestFlourPrice = ({commit},payload)=>{
    Axios.get(Config.BackendUrl+'flourprice/latest').then(res=>{
        if (res.status == 200) {
            commit('SetLatestFlourPrice',res.data)
            return true
        }
    })

}
const CreateNewFlourPrice = ({commit},payload)=>{
    Axios.post(Config.BackendUrl+'flourprice',payload).then((res)=>{
        if (res.status == 200) {
            return true
        }
    })
}

export default{
    FetchLatestFlourPrice,
    CreateNewFlourPrice
}