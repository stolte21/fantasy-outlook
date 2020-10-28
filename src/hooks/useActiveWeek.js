import { useEffect, useState } from 'react';
import outlookAPI from '../api/outlookAPI';

const useActiveWeek = () => {
    const [week, setWeek] = useState(0);

    useEffect(() => {
        outlookAPI.get('/week')
        .then(response => {
            setWeek(response.data.week);
        });
    }, [setWeek]);

    return [week, setWeek];
};

export default useActiveWeek;