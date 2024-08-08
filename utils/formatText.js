import moment from 'moment';
import "moment/locale/es";
moment.locale("es");

const ctrl = {}

ctrl.formatDate = (date) => {
    console.log(date)
    if (!date) return;
    let format = moment.utc(date).format("L");
    console.log(format)
    return format
}

ctrl.test = () => {
    return 'hola'
}


export default ctrl;