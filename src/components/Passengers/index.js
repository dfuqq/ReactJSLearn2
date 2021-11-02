import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchPassengers } from './../../services/api';

import './styles.css';

function Passengers() {
    const [page, setPage] = useState(0);

    const { isLoading, error, data, isSuccess } = useQuery(
        ['passengers', page],
        () => fetchPassengers(page),
        { keepPreviousData: false }
    )

    return (
        <div className="table-container">
            <h1>All Passengers</h1>
            <div>
                {isSuccess && <table className="passengers-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Count Trips</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data.map((passenger) => 
                            <tr key={passenger?._id}>
                                <td>{passenger?._id}</td>
                                <td>{passenger?.name}</td>
                                <td>{passenger?.trips}</td>
                            </tr>
                        )}
                    </tbody>
                </table>}
                {isLoading && <p>Loading...</p>}
                {error && <p>Error</p>}
                <div className="table-controls">
                    <p className="table-controls__pages">Страница: {page}/{data?.totalPages - 1}</p>
                    <div>
                        <button className="table-controls__btn" onClick={() => setPage((old) => Math.max(0, old - 1))}>
                            Назад
                        </button>
                        <button className="table-controls__btn" onClick={() => setPage((old) => old + 1)}>
                            Вперёд
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Passengers;