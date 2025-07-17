import React, { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import * as TablerIcons from '@tabler/icons-react';

export default function Customizer() {    
       

    // Customizer ACtion
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Customizer Variable
    const [theme, setTheme] = useState('light'); // light | dark
    const [sidebarTheme, setSidebarTheme] = useState('light'); // light | dark
    const [sidebarType, setSidebarType] = useState('full'); // full | compact

    // Handle sidebar theme toggle
    // const toggleSidebarTheme = () => {
    //     setSidebarTheme(prevSidebarTheme => prevSidebarTheme === 'dark' ? 'light' : 'dark');       
    // };

    // Handle sidebar type toggle
    const toggleSidebarType = (type) => {
        setSidebarType(type);
    };
    // Apply theme classes
    useEffect(() => {
        document.body.setAttribute('data-bs-theme', theme);
    }, [theme]);
    // Apply sidebar theme classes
    useEffect(() => {
        document.body.setAttribute('data-sidebar-theme', sidebarTheme);
    }, [sidebarTheme]);

    // Apply sidebar type classes
    useEffect(() => {
        if (window.innerWidth > 1200 && sidebarType === 'compact') {
        document.body.setAttribute('data-bs-sidebar', 'compact');
        } else {
        document.body.setAttribute('data-bs-sidebar', sidebarType);
        }
    }, [sidebarType]);    
      
    return (
        <>
            <span onClick={handleShow} className='customizer-action'>
                <TablerIcons.IconSettings />
            </span>
            <Offcanvas show={show} placement="end" onHide={handleClose} className="theme-cutomizer">
                <Offcanvas.Header closeButton className='border-bottom'>
                    <Offcanvas.Title>Theme Settings</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='customizer-body'>
                    <div className="cutomize-group">
                        <h6 className="customizer-title">Sidebar Mode</h6>
                        <ul className="customizeoption-list sidebarmode-list">
                            <li className={sidebarTheme === 'light' ? 'active-mode' : ''} onClick={() => setSidebarTheme('light')}>                                
                                <TablerIcons.IconSun />
                                light
                            </li>
                            <li className={sidebarTheme === 'dark' ? 'active-mode' : ''} onClick={() => setSidebarTheme('dark')}>
                                <TablerIcons.IconMoon />
                                dark
                            </li>
                        </ul>
                    </div>
                    <div className="cutomize-group">
                        <h6 className="customizer-title">Sidebar Type</h6>
                        <ul className="customizeoption-list sidebartype-list">
                            <li className={sidebarType === 'full' ? 'active-mode' : ''} onClick={() => toggleSidebarType('full')}>                               
                                <TablerIcons.IconLayoutSidebarRight />
                                Full
                            </li>
                            <li className={sidebarType === 'compact' ? 'active-mode' : ''} onClick={() => toggleSidebarType('compact')}>
                                <i className="ti ti-layout-sidebar"></i>
                                <TablerIcons.IconLayoutSidebar />
                                Collapce
                            </li>
                        </ul>
                    </div>
                    <div className="cutomize-group mb-0">
                        <h6 className="customizer-title">Layout mode</h6>
                        <ul className="customizeoption-list layoutmode-list">
                            <li className={theme === 'light' ? 'active-mode' : ''} onClick={() => setTheme('light')}>  
                                <TablerIcons.IconSun />
                                light
                            </li>
                            <li  className={theme === 'dark' ? 'active-mode' : ''} onClick={() => setTheme('dark')}>
                                <TablerIcons.IconLayoutSidebar />
                                dark
                            </li>
                        </ul>
                    </div>                   
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
