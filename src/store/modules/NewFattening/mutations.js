const SetFattening = (state,payload)=>{
    state.Entries = [];
    state.Entries = payload
}
const SetActiveFattening = (state,payload)=>{
    state.ActiveFattening = payload
}
export default {
    SetFattening,
    SetActiveFattening
}