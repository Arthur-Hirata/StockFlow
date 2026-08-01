import styles from "./Saidas.module.css"
import { useState } from "react"
import Button from "../../../../../Components/Button/button"
function Saidas({products}){
    const [selectedProduct, setSelectedProduct] = useState("")
    const [quantity, setQuantity] = useState("")
    const [confirmQuantity,setConfirmQuantity] = useState("")
    const [reason, setReason] = useState("")


    return (
        <div className={styles.userAction}>
        <select name="" value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
            <option value="">Selecione um produto</option>
            {products.map((product)=>(
            <option key={product.id} value={product.id}>{product.nome}</option>))}              
        </select>
        <span className={styles.inputRequest}>Digite a quantidade do produto</span>
        <input type="text" placeholder="Insira um quantidade" value={quantity} onChange={(e)=> setQuantity(e.target.value)} />
        <span className={styles.inputRequest}>Confirme essa quantidade</span>
        <input type="text" placeholder="Insira um quantidade" value={confirmQuantity} onChange={(e)=> setConfirmQuantity(e.target.value)} />
        <span className={styles.inputRequest}>Motivo da saída do produto</span>
        <input type="text" placeholder="Insira um motivo"  value={reason} onChange={(e)=> setReason(e.target.value)} />
        <Button
            text={"Remover"}
            color={"--red"}
                
        />
        </div>
    )
}
export default Saidas