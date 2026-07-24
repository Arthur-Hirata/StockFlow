import styles from "./Users.module.css"
import SectionTittle from "../../../Section-Tittle/Section-tittle"
function Users(){
    return(
        <section>
            <SectionTittle text={"Usuários"} />
            <div className={styles.containerUsers}>
                
            </div>

        </section>
    )
}
export default Users