import styles from "./AccessDenied.module.css"
import Button from "../Button/button"
function AccessDenied({onClose}){
    return(
        <div className={styles.overlayModal}>
            <div className={styles.containerModal}>
                <span className={styles.modalTittle}>Cuidado!</span>
                <span className={styles.modalContent}>Apenas admins tem acesso a essa página</span>
                <div className={styles.divBtns}>
                    <Button
                        text={"Fechar"}
                        color={"--red"}
                        onClick={onClose}
                    />
                </div>
                
            </div>
        </div>
    )
}
export default AccessDenied