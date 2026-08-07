import styles from "./Dashboard.module.css"
import { useState } from "react"
import { useEffect } from "react"
function Dashboard(){
    const [daySales, setDaySales] = useState("")
    const [monthSales, setMonthSales] = useState("")
    const [monthRevenue, setMonthRevenue] = useState("")
    useEffect(()=>{
        async function getDashboard(){
            const response = await fetch("http://127.0.0.1:5000/getDashboard", {
                method : "GET",
                headers: {"Content-Type": "application/json"}
            })
            const data = await response.json()
            if (response.ok){
                setDaySales(data.daily_sales)
                setMonthSales(data.month_sales)
                setMonthRevenue(data.month_revenue)
            }
        }

        getDashboard()
    }, [])
    

    return(
        <section>
            <div className={styles.containerDashboard}>
                <div className={styles.rowCard}>
                    <div className={styles.CardDashboard}>
                        <div className={styles.cardTittlecontainer}>
                            <span className={styles.cardTittle}>Vendas dia</span>
                            <i className={`${styles.icon} fa-solid fa-arrow-trend-up`}></i>
                        </div>
                        <span className={styles.cardValue}>{daySales}</span>
                        <div className={styles.dataRow}>
                            <span className={styles.dataValue}> <i className="fa-solid fa-arrow-trend-up"></i></span>
                            <span>Mais que no dia anterior</span>
                        </div>
                    </div>
                    <div className={styles.CardDashboard}>
                        <div className={styles.cardTittlecontainer}>
                            <span className={styles.cardTittle}>Vendas mês</span>
                            <i className={`${styles.icon} fa-solid fa-arrow-trend-up`}></i>
                            
                        </div>
                        <span className={styles.cardValue}>{monthSales}</span>
                        <div className={styles.dataRow}>
                            <span className={styles.dataValue}> <i className="fa-solid fa-arrow-trend-up"></i></span>
                            <span>Mais que no mês anterior</span>
                        </div>

                    </div>
                    <div className={styles.CardDashboard}>
                        <div className={styles.cardTittlecontainer}>
                            <span className={styles.cardTittle}>Faturamento mês</span>
                            <i className={`${styles.icon} fa-solid fa-file-invoice-dollar`}></i>
                        </div>
                        <span className={styles.cardValue}>R${monthRevenue}</span>
                        <div className={styles.dataRow}>
                            <span className={styles.dataValue}> <i className="fa-solid fa-arrow-trend-up"></i></span>
                            <span>Mais que no mês anterior</span>
                        </div>

                    </div>
                </div>
                <div className={styles.containerRowGraph}>
                    <div className={styles.graph}>
                        <span className={styles.graphTittle}>Gráfico de Vendas</span>
                    </div>
                    <div className={styles.menu}>
                        <span className={styles.menuTittle}>Mais vendas</span>
                    </div>
                </div>
            </div>

        </section>
        
        
    )
}

export default Dashboard