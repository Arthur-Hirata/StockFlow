import styles from "./Logs.module.css"
import SectionTittle from "../../../../Components/Section-Tittle/Section-tittle"
function Logs(){
    return(
        <section >
            < SectionTittle text={"Logs"} />
            <div className={styles.containerLogs}></div>
        </section>
    )
}
export default Logs