import styles from "./Home.module.css"
import SectionTittle from "../../../Section-Tittle/Section-tittle"
import Dashboard from "./Dashboard/Dashboard"
function Home(){
    return(
        <>
            <SectionTittle text={"Dashboard"}/>
            <section className={styles.sectionHome}>
                <Dashboard />
            </section>
        </>
    )
}
export default Home