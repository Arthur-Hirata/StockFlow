import styles from "./Movimentações.module.css"
import SectionTittle from "../../../../Components/Section-Tittle/Section-tittle"
import { useState } from "react"
function Movimentações(){
    const [selected, setSelected] = useState("entrada")



    return(
         <section >
            <SectionTittle text={"Movimentações"} />
            <div className={styles.containerCadastro}>
                <div className={styles.optionContainer}>
                    <div
                        className={`${styles.optionCard} ${
                         selected === "entrada" ? styles.selected : ""
                        }`}
                        onClick={() => setSelected("entrada")}
                        >
                        <span className={styles.optionIcon}>📦</span>
                        <span className={styles.optionTitle}>Entrada de Produtos</span>
                    </div>

                <div
                    className={`${styles.optionCard} ${
                    selected === "venda" ? styles.selected : ""
                    }`}
                    onClick={() => setSelected("venda")}
                    >
                    <span className={styles.optionIcon}>🛒</span>
                    <span className={styles.optionTitle}>Registrar Venda</span>
                </div>
                </div>
                {selected === "entrada" &&(
                    <>
                        <span>aojushdaobsd</span>
                    
                    </>
                )}
                {}






            </div>
        </section>
    )
}
export default Movimentações