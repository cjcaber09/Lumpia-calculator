import vue from "vue"
import vuex from "vuex"

import Prices from './modules/prices'
import LaborFee from './modules/laborFee'
import FlourPrice from './modules/FlourPrice'
import Entry from './modules/Entry'
import Fattening from './modules/NewFattening'
vue.use(vuex)

 export const store = new vuex.Store({
    modules:{
        Prices,
        LaborFee,
        FlourPrice,
        Entry,
        Fattening
    }
});