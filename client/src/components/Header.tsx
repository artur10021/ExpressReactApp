import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div>
                <Link to={"/"}>Dashboard</Link>
            </div>
            <div>
                <Link to={"/departments"}>Departments</Link>
            </div>
            <div>
                <Link to={"/employees"}>Employees</Link>
            </div>
        </header>
    );
};

export default Header;
