import React, {useEffect, useState} from 'react';
import '../../assets/styles/skeletonLoading.scss';

const SkeletonLoading = ({
                             type = 'normal',
                             width = '100%',
                             height,
                             borderRadius,
                             margin,
                             display,
                             totalRepeat = 10
                         }) => {
    const [repeatArray, setRepeatArray] = useState([]);

    useEffect(() => {
        setRepeatArray(new Array(totalRepeat).fill(null));
    }, [totalRepeat]);

    const createStyles = () => ({
        width,
        height,
        borderRadius,
        margin,
        display
    });

    return (
        <>
            {type === 'table' ? (
                <div>
                    {repeatArray.map((_, index) => (
                        <div key={index} className="loading-on-element-custom loading-table"
                             style={createStyles()}></div>
                    ))}
                </div>
            ) : (
                <div className="loading-on-element-custom" style={createStyles()}></div>
            )}
        </>
    );
};

export default SkeletonLoading;
