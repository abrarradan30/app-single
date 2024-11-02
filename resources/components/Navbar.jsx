import React, { useState, useEffect} from "react";
import { Link } from "@inertiajs/inertia-react";

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState('home')

    useEffect(() => {
        const currentPath = window.location.pathname;
        setActiveMenu(currentPath.replace('/', ''));
    }, [])
    return (
        <nav className="navbar navbar-expand-md bg-primary navbar-dark">
            <div className="container container-fluid">
                <a className="navbar-brand" href="#">
                    Navbar
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link href='/' className={`nav-link ${activeMenu === 'home' ? 'active' : ''}`}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link href='/mahasiswa' className={`nav-link ${activeMenu === 'mahasiswa' ? 'active' : ''}`}>Mahasiswa</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${activeMenu === 'dosen' ? 'active' : ''}`}>Dosen</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${activeMenu === 'matakuliah' ? 'active' : ''}`}>MataKuliah</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
