import moment from 'moment';
import "moment/dist/locale/es";
moment.locale("es");

const ctrl = {}

ctrl.formatDate = (date) => {
    if (!date) return;
    let format = moment(date).format("L");
    return format
}



ctrl.test = () => {
    return 'hola'
}


export default ctrl;