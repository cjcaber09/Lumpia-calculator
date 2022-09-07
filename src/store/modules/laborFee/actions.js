const { default: axios } = require("axios")
const { default: config } = require("../config")

const FetchLatestLaborFee = ({commit},payload)=>{
axios.get(config.BackendUrl+'laborfee/latest').then(res=>{
    if (res.status == 200) {
        commit('SetLatestLaborFee',res.data)
        return true
    }
})
}
const CreateNewLaborFee = ({commit},payload)=>{
    axios.post(config.BackendUrl+'laborfee',payload).then((res)=>{
        if (res == 200) {
            return true
        }
        return false
    })
}
export default{
    FetchLatestLaborFee,CreateNewLaborFee
}