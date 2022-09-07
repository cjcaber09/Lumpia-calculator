import config from "../config";
import axios from "axios";

const PostFattening = ({commit},payload)=>{
    return new Promise ((resolve,reject)=>{
        axios.post(config.BackendUrl+'fattening',payload).then((res)=>{
            if (res.status == 200) {
                resolve(true)
            }else{
                reject(false)
            }
        })
    })
}
const FetchAllFattening = ({commit}, payload)=>{
    return new Promise((resolve,reject)=>{
        let Page = payload ? payload.page : 1;
        let FetchParams = {page :Page}
        axios.get(config.BackendUrl+'fattening',{params:FetchParams}).then((res)=>{
            if ( res.status ==200) {
                commit('SetFattening',res.data)
                resolve(true)
            } else {
                reject(false)
            }
        })
    })
}
const FetchOneById = ({commit},payload)=>{
    return new Promise ((resolve,reject)=>{
        axios.get(config.BackendUrl+'fattening/'+payload).then((res)=>{
            if (res.status == 200) {
                commit('SetActiveFattening',res.data)
                resolve(true)
            } else {
                reject(false)
            }
        })
    })
}
const AddExpenses = ({commit},payload)=>{
    return new Promise ((resolve,reject)=>{
        axios.post(config.BackendUrl+'expenses/add/'+payload.id,{params:{expenses:payload.expenses}}).then((res)=>{
            if(res.status){
                resolve(res)
            }
        })

    })
}
const DeleteRecord = ({dispatch},{id,type})=>{
    return new Promise((resolve,reject)=>{
        axios.delete(`${config.BackendUrl}fattening/${id}`,{params:{type}}).then((res)=>{
            if (res.status == 200) {
                resolve(res)
            }
        })
    })
}
const DeleteExpenseRecord = ({dispatch}, {fatteningId,id,type})=>{
    
}
export default {
    PostFattening,
    FetchAllFattening,
    FetchOneById,
    DeleteRecord,
    DeleteExpenseRecord,
    AddExpenses
}