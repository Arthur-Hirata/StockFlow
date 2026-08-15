import { Outlet, useOutletContext } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import styles from "./Layout.module.css"
function Layout(){
    const user = useOutletContext()
    const { id, nome, role } = user ?? {};
    return (
        <div className={styles.layout}>
            <Sidebar  id={id} nome={nome} role={role}/>
            <main>
                <Outlet />
            </main>
        </div>
    )
}
export default Layout