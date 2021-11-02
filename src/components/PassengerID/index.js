import { useState } from 'react';
import { useQuery } from 'react-query';
import { useFormik } from 'formik';

import { fetchPassengerByID } from '../../services/api';

import './styles.css';

function PassengerID() {
    const [id, setID] = useState('');
    const formik = useFormik({
        initialValues: {
            _id: '',
        },
        onSubmit: (values) => {
            setID(values._id);
        }
    });

    const { isLoading, error, data } = useQuery(
        ['passengerID', id],
        () => id && fetchPassengerByID(id),
        { retry: false }
    )

    return (
        <div className="passengers-container">
            <h1>Find by ID</h1>
            <form onSubmit={formik.handleSubmit}>
                <input
                    id="_id"
                    name="_id"
                    type="text"
                    className="passengers-input"
                    onChange={formik.handleChange}
                />
            </form>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error</p>}
            {data && <div className="passenger-card">
                <span>Name: {data?.name}</span>
                <span>Count: {data?.trips} trips</span>
                <span className="passenger-card__id">{data?._id}</span>
            </div>}
        </div>
    )

}

export default PassengerID;