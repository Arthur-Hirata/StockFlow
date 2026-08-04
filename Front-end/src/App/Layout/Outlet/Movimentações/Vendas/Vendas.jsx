import styles from "./Vendas.module.css"
import { useState } from "react";
import Button from "../../../../../Components/Button/button";
import ConfirmartionModal from "../../../../../Components/ConfirmationModal/ConfirmationModal"
import AlertOverlay from "../../../../../Components/alertOvelay/alertOvelay"
function Vendas({products}){
    const [alertOverlay, setAlertOverlay] = useState(null)
    const [confirmModal, setConfirmModal] = useState(null)


    let [itemList, setItemList] = useState([])
    const [selectedProduct, setSelectedProduct] = useState("none")
    const [quantity, setQuantity] = useState("")
    const [fieldError, setFieldError] = useState("")
    const [quantityError, setQuantityError] = useState("")
    const precoFinal = itemList.reduce((total, item) =>{
            return total + item.preco * item.quantity
        }, 0)

    function onAdicionar(){
        let valid = true
        if (selectedProduct == "none"){
            valid = false
            setFieldError("Selecione um produto")
        }
        if (quantity == 0){
            valid =false
            setQuantityError("Insira uma quantidade")
        }
        if (quantity.trim() === ""){
            setQuantityError("Insira uma quantidade")
        }
        if (!valid){
            return
        }
        setSelectedProduct("none")
        setQuantity("")
        setFieldError("")
        setQuantityError("")
        const product = products.find(
            p => p.id === Number(selectedProduct)
        )
        if (!product) return
        setItemList(prev =>{
            const existingItem = prev.find(
                item => Number(item.id) === Number(selectedProduct)
            )
            if (existingItem){
                return prev.map(item =>
                    Number(item.id) === Number(selectedProduct)
                        ? {
                            ...item,
                            quantity: Number(item.quantity) + Number(quantity)
                        }
                        : item
                )
            }
            return [
                ...prev,
                {
                    ...product,
                    quantity: Number(quantity)
                }
            ]

        })
    }
    function onRemover(id){
        setItemList(prev => prev.filter(item => Number(item.id) !== Number(id)))
    }

    function onVender(){
        if (precoFinal == 0){
            setAlertOverlay({
                text : "Erro, Não há itens informados",
                color : "--red"
            })
            setTimeout(() => {
                setAlertOverlay(null);
            }, 3000);
            return
        }
        setConfirmModal({
            content : "cadastrar essa venda",
            text : "Cadastrar",
            color1: "--green",
            color2: "--red",
            
            onConfirm : async () =>{
                const userToken = localStorage.getItem("token")
                const response = await fetch("http://127.0.0.1:5000/sale", {
                    method : 'POST',
                     headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userToken}`,
                    },
                    body: JSON.stringify({
                        sale_list : itemList
                    })
                })
                setItemList([])
                setConfirmModal(null)
                if (response.ok){
                    setAlertOverlay({
                        text : "Venda cadastrada com sucesso!",
                        color : "--green"
                    })
                    setTimeout(() => {
                        setAlertOverlay(null);
                    }, 3000);
                }
                else{
                    setAlertOverlay({
                        text : "Erro ao cadastrar venda!",
                        color : "--red"
                    })
                    setTimeout(() => {
                        setAlertOverlay(null);
                    }, 3000);
                }
                
            }
        })
    }
    return(
        <div className={styles.userAction}>
            {alertOverlay && (
            <AlertOverlay 
                text={alertOverlay.text}
                color={alertOverlay.color}
                 />
                )}  
                <span className={styles.inputRequest}>Produto</span>
                <select name="" value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} className={fieldError ? styles.error : ""}> {fieldError && <span className={styles.spanErro}>{fieldError}</span>}
                    <option value="none">Selecione um produto</option>
                    {products.map((product)=>(
                    <option key={product.id} value={product.id}>{product.nome}</option>))}              
                </select>
                <span className={styles.inputRequest}>Quantidade</span>
                <div className={styles.containerQuantidade}>
                    <input type="number" placeholder="Digite a Quantidade" min={0} value={quantity} onChange={(e)=> setQuantity(e.target.value)} className={quantityError ? styles.error : ""}/>
                    <Button 
                        text={"Adicionar"}
                        color={"--green"}
                        onClick={onAdicionar}
                    />
                </div>
                {quantityError && <span className={styles.spanErro}>{quantityError}</span>}
                <hr />
                <div className={styles.containerLista}>
                    <div className={styles.itemList}>
                        <span className={styles.itemPrice} style={{fontWeight: 700}}>Preço</span>
                        <span className={styles.itemName} style={{fontWeight: 700}}>Item</span>
                        <span className={styles.itemQuantity}style={{fontWeight: 700}}>Quantidade</span>
                        <span className={styles.itemQuantity}style={{fontWeight: 700}}>Remover</span>
                    </div>
                    {itemList.map((item)=>(
                         <div key={item.id} className={styles.itemList}>
                            <span className={styles.itemPrice}>R${item.preco}</span>
                            <span className={styles.itemName} >{item.nome}</span>
                            <span className={styles.itemQuantity} >{item.quantity}</span>
                             <button className={styles.removeButton} onClick={() => onRemover(item.id)}><i className="fas fa-trash"></i></button>
                        </div>
                    )  
                    )}
                </div>
                <hr />
                <div className={styles.containerFinal}>
                    <span className={styles.spanTotal}>Total : R$ {precoFinal.toFixed()} </span>
                    <Button
                        text={"Confirmar Venda"}
                        color={"--green"} 
                        onClick={onVender}    
                    />
                    {confirmModal && <ConfirmartionModal onClose={()=>setConfirmModal(null)} 
                        onConfirm={confirmModal.onConfirm}
                        content={confirmModal.content} 
                        color1={confirmModal.color1} 
                        color2={confirmModal.color2}   
                        text={confirmModal.text}   
                    />}
                </div>
        </div>
    )
}
export default Vendas