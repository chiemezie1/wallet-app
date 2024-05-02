import React, { useState, useEffect } from 'react';
import { useUser } from '../../userContext/UserContext';
import Dashboard from './dashboards/dashboard';
import UnsetDashboard from './dashboards/unSetDashboard';

const Wallet = () => {
    const { userDetails } = useUser();
    const [isUnset, setIsUnset] = useState(true);

    useEffect(() => {
        if (userDetails.pinStatus === 'UNSET') {
            setIsUnset(true);
        } else {
            setIsUnset(false);
        }
    }, [userDetails.pinStatus]);

    return (
        <>
            {isUnset ?
                <UnsetDashboard />
                :
                <div className="bg-gray-100 min-h-screen flex justify-center items-center">
                    <div className="container mx-auto px-4 lg:px-8">
                        <Dashboard />
                    </div>
                </div>}
        </>
    );
};

export default Wallet;
