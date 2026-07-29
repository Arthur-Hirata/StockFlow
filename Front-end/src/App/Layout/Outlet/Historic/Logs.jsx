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
                    <button onClick={()=> setSelected("logs")}  className={selected=== "logs" ? styles.selected : ""}>Logs</button>
                    <button onClick={()=> setSelected("users")} className={selected=== "users" ? styles.selected : ""}>Users</button>
                    <button onClick={()=> setSelected("produtos")} className={selected=== "produtos" ? styles.selected : ""}>Produtos</button>
                    <button onClick={()=> setSelected("vendas")} className={selected=== "vendas" ? styles.selected : ""}>Vendas</button>
                </div>
                <Table 
                    columns={tables[selected].columns}
                
                
                />
            </div>
        </section>
    )
}
export default Logs