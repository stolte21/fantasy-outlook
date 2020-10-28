import React, { useEffect, useState, useCallback } from 'react';
import { useMediaQuery } from '@material-ui/core';
import { debounce } from 'lodash';
import StatsList from './StatsList';
import StatsTable from './StatsTable';
import StatsLoadingSpinner from './StatsLoadingSpinner';
import { RUSHING, RECEIVING, RUSHING_AND_RECEIVING } from '../constants/statCategories';
import { NAME, YARDS_RUSHING, YARDS_RECEIVING, TOTAL_YARDS } from '../constants/statAttributes';

const getDefaultSort = (category) => {
    let sortBy = NAME;
    let sortDirection = 'desc';

    if (category === RUSHING) {
        sortBy = YARDS_RUSHING;
    } else if (category === RECEIVING) {
        sortBy = YARDS_RECEIVING;
    } else if (category === RUSHING_AND_RECEIVING) {
        sortBy = TOTAL_YARDS
    }

    return {
        sortBy,
        sortDirection
    };
};

const DataDisplay = ({ category, data, attributes, searchTerm, loading, ...props }) => {

    const [sort, setSort] = useState(() => {
        return getDefaultSort(category);
    });
    const [sortedData, setSortedData] = useState(data);
    const [filteredData, setFilteredData] = useState(sortedData);
    const isMobile =  useMediaQuery(theme => theme.breakpoints.down('sm'));

    const handleFiltering = useCallback(
        debounce((sortedData, searchTerm) => {
            setFilteredData(sortedData.filter(row => searchTerm === '' || row[NAME].toUpperCase().includes(searchTerm.toUpperCase())));
        }, 50),
        []
    );

    useEffect(() => {
        const { sortBy, sortDirection } = sort;
        
        const sorted = data.sortBy(row => row[sortBy]);
        setSortedData(sortDirection === 'asc' ? sorted : sorted.reverse());
    }, [sort, data, attributes]);

    useEffect(() => {
        setSort(getDefaultSort(category));
    }, [category]);

    useEffect(() => {
        handleFiltering(sortedData, searchTerm);
    }, [handleFiltering, sortedData, searchTerm]);

    const handleSort = useCallback(
        (property) => {
            const { sortBy, sortDirection } = sort;
            const isDesc = sortBy === property && sortDirection === 'desc';
            
            setSort({
                sortBy: property,
                sortDirection: isDesc ? 'asc' : 'desc'
            });
        },
        [sort]
    );

    const filtering = !searchTerm && !data.isEmpty() && filteredData.isEmpty();

    if (loading || filtering) {
        return <StatsLoadingSpinner />;
    }

    return isMobile ? (
        <StatsList
            category={category}
            data={filteredData}
            attributes={attributes}
            sort={sort}
            onSort={handleSort}
            {...props}
        />
    ) : (
        <StatsTable
            data={filteredData}
            attributes={attributes}
            sort={sort}
            onSort={handleSort}
            {...props} 
        />
    );
};

export default DataDisplay;