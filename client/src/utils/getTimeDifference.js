import moment from 'moment';

const getTimeDifference = (timestamp) => {
    return moment(timestamp).fromNow();
}

export default getTimeDifference;