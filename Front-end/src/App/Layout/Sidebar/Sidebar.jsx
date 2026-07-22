import styles from "./Sidebar.module.css"


function Sidebar(){
    return (
       <aside>
         <div className={styles.merchan}>
            <i className={`${styles.icon} fa-solid fa-box`}></i>
            <span className={styles.name}>StockFlow</span>
         </div>
         <div className={styles.routes}>
                <span className={styles.route}>Produtos</span>
                <span>Produtos</span>
                <span>Produtos</span>
                <span>Produtos</span>
                <span>Produtos</span>
                <span>Produtos</span>







         </div>
       </aside>
    )
}
export default Sidebar