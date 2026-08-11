import styles from "./Dashboard.module.css"
import { useState } from "react"
import { useEffect } from "react"
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

function Dashboard(){
    const [daySales, setDaySales] = useState("")
    const [monthSales, setMonthSales] = useState("")
    const [monthRevenue, setMonthRevenue] = useState("")
    const [dayPercentage, setDayPercentage] = useState("")
    const [topProducts, setTopProducts] = useState([])
    const [topUsers, setTopUsers] = useState([])
    const pieColors = ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0", "#F44336", "#00BCD4", "#FFC107"]

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
                setTopProducts(data.top_products)
                setTopUsers(data.top_users)
                setDayPercentage(data.daily_precentage)
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
                            <span>{dayPercentage} Mais que no dia anterior</span>
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
                        <PieChart width={800} height={300}>
                            <Pie
                                data={topProducts}
                                dataKey="quantidade"
                                nameKey="nome"
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                {topProducts.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </div>
                    <div className={styles.menu}>
                        <span className={styles.menuTittle}>Mais vendas</span>
                        <div className={styles.topList}>
                            {topUsers.map((user) => (
                                <div key={user.id} className={styles.containerUser}>
                                    <span>{user.nome}</span>
                                    <span className={styles.spanValor}>R${user.valor}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </section>
        
        
    )
}

export default Dashboard