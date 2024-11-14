import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Badge } from 'antd';
import { useLocation } from 'react-router-dom';

const { Header } = Layout;

function Navbar() {
    const location = useLocation();

    // Example state for storing the number of items in the Watch List
    const [watchListCount, setWatchListCount] = useState(0);

    useEffect(() => {
        setWatchListCount(5); // Simulated number of items in watchlist
    }, []);

    const menuItems = [
        { label: 'Movies', path: '/movies' },
        { label: 'Watch List', path: '/watchlist' }, // Label without count
        { label: 'History', path: '/history' },
        { label: <i className="bi bi-person-circle h3"></i>, path: '/changepass' },
        { label: 'Logout', path: '/' },
    ];

    return (
        // , position: 'fixed',zIndex:'1000',width:'100%'
        <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#262626' }}>
            <div className="logo" style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
                <Link to="/movies" style={{ color: 'inherit', textDecoration: 'none' }}>MyApp</Link>
            </div>
            <Menu theme="dark" mode="horizontal" style={{ flex: 'auto', justifyContent: 'flex-end', backgroundColor: '#262626' }}>
                {menuItems.map((item) => (
                    <Menu.Item
                        key={item.path}
                        className={location.pathname === item.path || location.pathname.includes('movie') ? 'active-item' : ''}
                    >
                        <Link className="text-decoration-none text-reset" to={item.path} style={{ display: 'flex', alignItems: 'center' }}>
                            {item.label === 'Watch List' ? (
                                <span style={{ display: 'flex', alignItems: 'center' }}>
                                    {item.label}
                                    <Badge count={watchListCount} style={{ backgroundColor: '#52c41a', marginLeft: '5px' }} />
                                </span>
                            ) : (
                                item.label
                            )}
                        </Link>
                    </Menu.Item>
                ))}
            </Menu>
        </Header>
    );
}

export default Navbar;
