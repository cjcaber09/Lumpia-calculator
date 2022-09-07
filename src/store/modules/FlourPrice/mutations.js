const SetLatestFlourPrice = (state,payload)=>{
    console.log(payload);
    state.LatestFlourPrice = payload
}

export default{
    SetLatestFlourPrice
}