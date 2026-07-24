import styles from "./Cadastro.module.css"
import SectionTittle from "../../../Section-Tittle/Section-tittle"
function Cadastro(){
    return(
        <section >
            <SectionTittle text={"Cadastro"} />
            <div className={styles.containerCadastro}>

            </div>
        </section>
    )
}
export default Cadastro