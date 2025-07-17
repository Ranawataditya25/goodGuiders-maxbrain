import React, { useState, useEffect } from 'react';

export default function Loader() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <>
            {loading ? (
                <div className="codex-loader">
                    <div className="loader-item">
                        <svg className="spinner-pulse" version="1.2" height="210" width="550" xmlns="http://www.w3.org/2000/svg" viewport="0 0 60 60" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <path className="spinnersub-pulse" fill="none" strokeWidth  ="3" strokeLinejoin="round" d="M0,90L250,90Q257,60 262,87T267,95 270,88 273,92t6,35 7,-60T290,127 297,107s2,-11 10,-10 1,1 8,-10T319,95c6,4 8,-6 10,-17s2,10 9,11h210"></path>
                        </svg>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>

    )
}
