import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';

const Layout = ({ children }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <header className="text-center">
                <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                    <div className="container-fluid d-flex justify-content-between align-items-center">
                        <div className="text-center">
                            <h1 className="navbar-brand text-light" style={{ fontSize: '2em' }}>Todo Board</h1>
                        </div>
                        <div>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav ms-auto">
                                    <li className="nav-item">
                                        <Link to="/logout" className="nav-link text-light">Logout</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <main style={{ flex: 1 }}>{children}</main>

            <footer className="footer mt-auto py-3 bg-dark text-light">
                <div className="container text-center">
                    <span className="d-block">© 2023 ToDo App</span>
                </div>
            </footer>
        </div>
    );
};

export default Layout;