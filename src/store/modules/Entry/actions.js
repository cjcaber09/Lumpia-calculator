import axios from "axios";
import config from "../config";

const PostNewEntry = ({commit},payload)=>{
    axios.post(config.BackendUrl+'entry',payload).then(res=>{
        if (res.status == 200) {
            console.log(res);
            return true
        }
    })
}
const FetchEntries = ({commit},payload)=>{
    axios.get(config.BackendUrl+'entry',{params:payload}).then((res)=>{
        if (res.status == 200) {
            commit('SetEntries',res.data)
            return true
        }
    })
}
const MakePayment = ({commit},payload)=>{
    axios.patch(config.BackendUrl+`entry/${payload.id}`,payload.values).then((res)=>{
        if (res.status == 200) {
            return true
        }
    })
}
const MakeMultiPayment = ({commit},payload)=>{
    axios.post(config.BackendUrl+'entry/multi',payload).then((res)=>{
        console.log(res);
    })
}
const DeleteEntry = ({commit},payload)=>{
    return new Promise((resolve,reject)=>{
        axios.delete(config.BackendUrl+'entry/'+payload._id).then((res)=>{
            if (res.status == 200) {
                resolve(true)
            }
            reject(false)
        })
    })
}
const ArchiveEntry = ({commit},payload)=>{
    return new Promise((resolve,reject)=>{
        axios.patch(config.BackendUrl+'entry/'+payload._id,payload).then((res)=>{
            res.status == 200 ? resolve(true) : reject(false)
        })
    })
}
export default {
    PostNewEntry,
    FetchEntries,
    MakePayment,
    MakeMultiPayment,
    DeleteEntry,
    ArchiveEntry
}