import React from "react";
import styles from "./styles/Header.module.scss";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <div className={styles.headWrapper}>
            <header className={styles.header}>
                <div className={styles.namePageBlock}>
                    <Link to={"/"}>Dashboard</Link>
                </div>
                <div className={styles.namePageBlock}>
                    <Link to={"/departments"}>Departments</Link>
                </div>
                <div className={styles.namePageBlock}>
                    <Link to={"/employees"}>Employees</Link>
                </div>
            </header>
        </div>
    );
};

export default Header;
