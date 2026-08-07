import styles from "./Home.module.css"
import SectionTittle from "../../../../Components/Section-Tittle/Section-tittle"
import Dashboard from "./Dashboard/Dashboard"
function Home(){
    return(
        <section>
        <SectionTittle text={"Dashboard"}/>
        <section className={styles.sectionHome}>
            <Dashboard />
        </section>
        </section>
    )
}
export default Home