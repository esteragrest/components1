import moment from 'moment/moment';

export function dateFormat(date) {
	return moment(date).format('DD.MM.YYYY, h:mm:ss');
}
