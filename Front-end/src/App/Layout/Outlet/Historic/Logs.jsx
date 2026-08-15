import styles from "./Logs.module.css"
import SectionTittle from "../../../../Components/Section-Tittle/Section-tittle"
import { useState } from "react"
import { useEffect } from "react"
import Table from "../../../../Components/Table/Table"
function Logs(){
    const [selected, setSelected] = useState("logs")
    const [tableData, setTableData] = useState([])
    useEffect(()=>{
        async function loadData(){
            const userToken = localStorage.getItem("token")
            const response = await fetch(`http://127.0.0.1:5000/getData/${selected}`, {
                method : 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                }
            })
            const data = await response.json()
            setTableData(data.tabela || data.table || [])
        }
        loadData();
    }, [selected])
    const tables = {
        logs : {
            columns : [
                { title: "ID", field: "id" },
                { title: "ID user", field: "user_id" },
                { title: "Ação", field: "action" },
                { title: "Data", field: "created_at" }
            ]
        },
        users : {
            columns : [
                { title: "ID", field: "id" },
                { title: "Nome", field: "nome" },
                { title: "Email", field: "email" },
                { title: "Cargo", field: "role" }
            ]
        },
        products :{
            columns : [ 
                { title: "ID", field: "id" },
                { title: "Nome", field: "name" },
                { title: "Preço", field: "price" },
                { title: "Quantidade", field: "amount" },
                { title: "Quantidade Miníma", field: "low_amount" },
            ]
        },
        sales : {
            columns : [
                { title: "ID", field: "id" },
                { title: "Preço Total", field: "total_price" },
                { title: "ID Vendedor", field: "seller_id" },
                { title: "Data", field: "created_at" }
            ]
        }

    }
    return(
        <div className={styles.logsPage}>
                < SectionTittle text={"Logs"} />
                <div className={styles.containerLogs}>
                    <div className={styles.divBtns}>
                       <div className={`${styles.optionCard} ${selected === "logs" ? styles.selected : ""}`}onClick={() => setSelected("logs")}>
                            <span className={styles.optionIcon}>📋</span>
                            <span className={styles.optionTitle}>Logs</span>
                        </div>
                        <div className={`${styles.optionCard} ${selected === "users" ? styles.selected : ""}`}onClick={() => setSelected("users")}>
                            <span className={styles.optionIcon}>👤</span>
                            <span className={styles.optionTitle}>Users</span>
                        </div>
                        <div className={`${styles.optionCard} ${selected === "products" ? styles.selected : ""}`}onClick={() => setSelected("products")}>
                            <span className={styles.optionIcon}>📦</span>
                            <span className={styles.optionTitle}>Produtos</span>
                        </div>
                        <div className={`${styles.optionCard} ${selected === "sales" ? styles.selected : ""}`}onClick={() => setSelected("sales")}>
                            <span className={styles.optionIcon}>🛒</span>
                            <span className={styles.optionTitle}>Vendas</span>
                        </div>
                    </div>
                </div>
                    <Table 
                        columns={tables[selected].columns}
                        tableData={tableData}
                    />
            </div>
                
    )
}
export default Logs