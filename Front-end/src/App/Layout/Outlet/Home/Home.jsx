import styles from "./Home.module.css"

import Dashboard from "./Dashboard/Dashboard"
function Home(){
    return(
        <section className={styles.sectionHome}>
            <Dashboard />
        </section>
    )
}
export default Home