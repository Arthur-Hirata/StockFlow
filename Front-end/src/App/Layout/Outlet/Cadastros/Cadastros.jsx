
import styles from "./Cadastros.module.css"
import SectionTittle from "../../../../Components/Section-Tittle/Section-tittle"
import CadastroProd from "./CadastroProd/cadastroProd"
import CadastroUser from "./CadastroUser/cadastroUser"

function Cadastros(){
    
    return(
        <section>
            
            <SectionTittle text={"Cadastros"} />
            <div className={styles.containerCadastro}>
                <div className={styles.userAction}>
                    <CadastroProd/>
                    <CadastroUser />

                </div>
            </div>
            
        </section>
    )
}
export default Cadastros