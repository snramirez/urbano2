import moment from 'moment';
import "moment/locale/es";
moment.locale("es");

const ctrl = {}

ctrl.formatDate = (date) => {
    if (!date) return;
    let format = moment.utc(date).format("L");
    return format
}



ctrl.test = () => {
    return 'hola'
}


export default ctrl;