import axios from 'axios';

export const fetchPassengers = async (page) => {
    const res = await axios.get(`https://api.instantwebtools.net/v1/passenger`, {
        params: {
            page,
            size: 15
        }
    })
    return res?.data
}

export const fetchPassengerByID = async (id) => {
    const res = await axios.get(`https://api.instantwebtools.net/v1/passenger/${id}`)
    return res?.data
}