import moment from 'moment'

export const GeneralMixin ={
  
    methods: {
        toMoneyForm(a){
            var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'PHP',
              
                // These options are needed to round to whole numbers if that's what you want.
                minimumFractionDigits: 2, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
                //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
              });
              
            var Money = formatter.format(a);

              return Money
        },
        toNumberForm(value){
          // let number = Number(value.replace(/[^0-9.-]+/g,""));
          // return number
        },
        formatDate(a){
          return moment(a).format( "MMM/DD/YYYY")
        }
    },
    
    
}