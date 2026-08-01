import styles from "./Saidas.module.css"
import { useState } from "react"
import Button from "../../../../../Components/Button/button"
import ConfirmartionModal from "../../../../../Components/ConfirmationModal/ConfirmationModal"
import AlertOverlay from "../../../../../Components/alertOvelay/alertOvelay"



function Saidas({products}){
    const [alertOverlay, setAlertOverlay] = useState(null)
    const [confirmModal, setConfirmModal] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState("")
    const [quantity, setQuantity] = useState("")
    const [confirmQuantity,setConfirmQuantity] = useState("")
    const [reason, setReason] = useState("")
    const [quantityError, setQuantityError] = useState("")
    const [confirmQuantityError, setConfirmQuantityError] = useState("")
    const [reasonError, setReasonError] = useState("")
    const [fieldError, setFieldError] = useState("")

    function onRemove(){
        let valid = true

        setFieldError("")
        setQuantityError("")
        setConfirmQuantityError("")
        setReasonError("")

        if (selectedProduct === "" || selectedProduct === "none"){
            valid = false
            setFieldError("Selecione um produto")
        }
       if (quantity.trim() === "") {
            valid = false;
            setQuantityError("Informe a quantidade");
        }

        if (confirmQuantity.trim() === "") {
            valid = false;
            setConfirmQuantityError("Confirme a quantidade");
            }   

        if (Number(quantity) <= 0) {
            valid = false;
            setQuantityError("A quantidade deve ser maior que 0");
        }

        if (quantity !== confirmQuantity) {
            valid = false;
            setQuantityError("As quantidades não coincidem");
            setConfirmQuantityError("As quantidades não coincidem");
        }
        if (reason.trim() === ""){
            valid = false
            setReasonError("Informe um motivo para a remoção")
        }
        if (!valid){
            return
        }
        
        



    }
    return (
        <div className={styles.userAction}>
        {alertOverlay && (
            <AlertOverlay 
                text={alertOverlay.text}
                color={alertOverlay.color}
        />
        )}
        <select name="" value={selectedProduct} onChange={(e) => {setSelectedProduct(e.target.value);setFieldError("")}} className={fieldError ? styles.error : ""}> 
            <option value="none">Selecione um produto</option>
            {products.map((product)=>(
            <option key={product.id} value={product.id}>{product.nome}</option>))}              
        </select>
        {fieldError && <span className={styles.spanErro}>{fieldError}</span>}
        <span className={styles.inputRequest}>Digite a quantidade do produto</span>
        <input type="number" placeholder="Insira um quantidade" value={quantity} onChange={(e)=> {setQuantity(e.target.value);setQuantityError("")}} className={quantityError ? styles.error : ""} /> {quantityError && <span className={styles.spanErro}>{quantityError}</span>}
        <span className={styles.inputRequest}>Confirme essa quantidade</span>
        <input type="number" placeholder="Insira um quantidade" value={confirmQuantity} onChange={(e)=> {setConfirmQuantity(e.target.value);setConfirmQuantityError("")}}  className={confirmQuantityError ? styles.error : ""}/> {confirmQuantityError && <span className={styles.spanErro}>{confirmQuantityError}</span>}
        <span className={styles.inputRequest}>Motivo da saída do produto</span>
        <input type="text" placeholder="Insira um motivo"  value={reason} onChange={(e)=> {setReason(e.target.value); setReasonError("")}}  className={reasonError ? styles.error : ""}/> {reasonError && <span className={styles.spanErro}>{reasonError}</span>}
        <Button
            text={"Remover"}
            color={"--red"}
            onClick={onRemove}
        />
        {confirmModal && <ConfirmartionModal onClose={()=>setConfirmModal(null)} 
            onConfirm={confirmModal.onConfirm}
            content={confirmModal.content} 
            color1={confirmModal.color1} 
            color2={confirmModal.color2}   
            text={confirmModal.text}   
        />}
        </div>
    )
}
export default Saidas