import styles from "./Logs.module.css"
import SectionTittle from "../../../../Components/Section-Tittle/Section-tittle"
import { useState } from "react"
import { useEffect } from "react"
import Table from "../../../../Components/Table/Table"
function Logs(){
    const [selected, setSelected] = useState("logs")

    useEffect(()=>{
        async function loadData(){
            const response = await fetch(`http://127.0.0.1:5000/getData/${selected}`, {
                method : 'GET'
            })
            const data = await response.json()
            console.log(data)
        }
        loadData();
    }, [selected])
    const tables = {
        logs : {
            columns : ['id', 'ID usuário', 'ação', 'data']
        },
        users : {
            columns : ['id', 'nome', 'email', 'cargo', 'data']
        },
        produtos :{
            columns : ['id', 'nome', 'preço', 'quantidade', 'quantidade mínima', 'imagem']
        },
        vendas : {
            columns : ['id', 'preço total', 'vendedor', 'data']
        }

    }


    return(
        <section >
            < SectionTittle text={"Logs"} />
            <div className={styles.containerLogs}>
                <div className={styles.divBtns}>
                   <div className={`${styles.optionCard} ${selected === "logs" ? styles.selected : ""}`}onClick={() => setSelected("logs")}>
                        <span className={styles.optionIcon}>📋</span>
                        <span className={styles.optionTitle}>Logs</span>
                    </div>
                    <div className={`${styles.optionCard} ${selected === "users" ? styles.selected : ""}`}onClick={() => setSelected("users")}>
                        <span className={styles.optionIcon}>👤</span>
                        <span className={styles.optionTitle}>users</span>
                    </div>
                    <div className={`${styles.optionCard} ${selected === "produtos" ? styles.selected : ""}`}onClick={() => setSelected("produtos")}>
                        <span className={styles.optionIcon}>📦</span>
                        <span className={styles.optionTitle}>Produtos</span>
                    </div>
                    <div className={`${styles.optionCard} ${selected === "vendas" ? styles.selected : ""}`}onClick={() => setSelected("vendas")}>
                        <span className={styles.optionIcon}>🛒</span>
                        <span className={styles.optionTitle}>Vendas</span>
                    </div>
                </div>
                <Table 
                    columns={tables[selected].columns}
                
                
                />
            </div>
        </section>
    )
}
export default Logs