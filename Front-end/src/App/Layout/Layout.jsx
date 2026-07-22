import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import styles from "./Layout.module.css"
function Layout(){
    return (
        <div className={styles.layout}>
            <Sidebar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}
export default Layout