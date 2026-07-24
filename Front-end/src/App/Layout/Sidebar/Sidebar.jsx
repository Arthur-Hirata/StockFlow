import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css"



function Sidebar(){
   const navigate = useNavigate()

    return (
       <aside>
         <div className={styles.merchan}>
            <i className={`${styles.icon} fa-solid fa-box`}></i>
            <span className={styles.name}>StockFlow</span>
         </div>
         <div className={styles.containerRoutes}>
               <div className={styles.route}>
                  <span className={styles.routeName} onClick={()=> navigate('/')}>Home</span>
               </div>
                 <div className={styles.route}>
                  <span className={styles.routeName} onClick={()=> navigate('/Products')}>Produtos</span>
               </div>
                 <div className={styles.route}>
                  <span className={styles.routeName} onClick={()=> navigate('/Movimentacoes')}>Movimentações</span>
               </div>
               <div className={styles.route}>
                  <span className={styles.routeName} onClick={()=> navigate('/Cadastros')}>Cadastro</span>
               </div>
               <div className={styles.route}>
                  <span className={styles.routeName} onClick={()=> navigate('/Logs')}>Logs</span>
               </div>
         </div>
       </aside>
    )
}
export default Sidebar