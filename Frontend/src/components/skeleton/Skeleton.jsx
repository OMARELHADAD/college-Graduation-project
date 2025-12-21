import React from 'react';
import './Skeleton.scss';

const Skeleton = ({ type, width, height, borderRadius, className = '' }) => {
    const style = {
        width,
        height,
        borderRadius,
    };

    return <div className={`skeleton ${type} ${className}`} style={style}></div>;
};

export default Skeleton;
