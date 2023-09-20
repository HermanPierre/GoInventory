import React from 'react';

interface SemiBoldTitle {
    title: string
}

const SemiBoldTitle = ({title}: SemiBoldTitle) => {
    return (
        <h2 className={'text-l font-semibold'}>{title}</h2>
    );
};

export default SemiBoldTitle;
