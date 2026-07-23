import styles from "./Dashboard.module.css"
import SectionTittle from "../../../../Section-Tittle/Section-tittle"
function Dashboard(){
    return(
        <section>
            <SectionTittle text={"Dashboard"}/>
            <div className={styles.containerDashboard}>
                <div className={styles.rowCard}>
                    <div className={styles.CardDashboard}>
                        <div className={styles.cardTittlecontainer}>
                            <span className={styles.cardTittle}>Vendas dia</span>
                            <i className={`${styles.icon} fa-solid fa-arrow-trend-up`}></i>
                        </div>
                        <span className={styles.cardValue}>30</span>
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
                        <span className={styles.cardValue}>1303</span>
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
                        <span className={styles.cardValue}> 1.200.000</span>
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