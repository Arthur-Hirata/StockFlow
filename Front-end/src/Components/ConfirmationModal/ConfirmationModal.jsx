import styles from "./ConfirmationModal.module.css"
import Button from "../Button/button"
function ConfirmartionModal({onClose,onConfirm,content, text, color1,color2} ){
    return(
        <div className={styles.overlayModal}>
            <div className={styles.containerModal}>
                <span className={styles.modalTittle}>Cuidado!</span>
                <span className={styles.modalContent}>Você tem certeza que deseja {content}</span>
                <div className={styles.divBtns}>
                    <Button 
                        text={text}
                        color={color1}
                        onClick={onConfirm}
                    />
                    <Button 
                        text={"Fechar"}
                        color={color2}
                        onClick={onClose}
                    
                    />
                </div>
                
            </div>

        </div>
    )
}
export default ConfirmartionModal