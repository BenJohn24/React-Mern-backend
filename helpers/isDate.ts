// const moment = require('moment');
import moment  from 'moment';

export const isDate = ( value: string ) => {

   if( !value ){
    return false;
   }

   const fecha = moment( value );
   if( fecha.isValid() ){
    return true;
   }else{
    return false;
   }

}

// module.exports = { isDate }