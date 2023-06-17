import React, { useContext } from 'react';
// import useSetTitle from '../../../Hooks/useSetTitle';
import WelcomeMessage from './WelcomeMessage';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';


const Dashboard = () => {
    const { user } = useContext(AuthContext);
    // useSetTitle('Dashboard')
    return (
        <main>
            <section className='py-5 px-5 rounded bg-slate-50' data-aos='fade-up' data-aos-duration='1000'>
                <h3 className='text-lg md:text-2xl lg:text-3xl font-bold mb-1'>Welcome, {user?.displayName}. 👋</h3>
                <p className='text-base'>Here is what’s happening with your product.</p>
            </section> 
        </main>
    );
};

export default Dashboard;