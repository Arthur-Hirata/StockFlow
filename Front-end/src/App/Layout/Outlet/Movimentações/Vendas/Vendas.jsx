import styles from "./Vendas.module.css"
import { useState } from "react";
import Button from "../../../../../Components/Button/button";
function Vendas({products}){
    let [itemList, setItemList] = useState([])
    const [selectedProduct, setSelectedProduct] = useState("none")
    const [quantity, setQuantity] = useState("")
    function onAdicionar(){
        let valid = true
        if (selectedProduct == "none"){
            valid = false
            alert("saeleciona")
        }
        if (quantity == 0){
            valid =false
            alert("bota numero")
        }
        if (quantity.trim() === ""){
            valid = false
        }
        if (!valid){
            return
        }
        setSelectedProduct("none")
        setQuantity("")
        const product = products.find(
            p => p.id === Number(selectedProduct)
        )
        if (!product) return
        setItemList(prev =>[
            ...prev,
            {
                ...product,
                quantity : Number(quantity)
            }
        ])
        
    }   


    return(
        <div className={styles.userAction}>
                <span className={styles.inputRequest}>Produto</span>
                <select name="" value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}> 
                    <option value="none">Selecione um produto</option>
                    {products.map((product)=>(
                    <option key={product.id} value={product.id}>{product.nome}</option>))}              
                </select>
                <span className={styles.inputRequest}>Quantidade</span>
                <div className={styles.containerQuantidade}>
                    <input type="number" placeholder="Digite a Quantidade" min={0} value={quantity} onChange={(e)=> setQuantity(e.target.value)}/>
                    <Button 
                        text={"Adicionar"}
                        color={"--green"}
                        onClick={onAdicionar}
                    />
                </div>
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
                            <span className={styles.itemPrice}>R$ {item.preco}</span>
                            <span className={styles.itemName} >{item.nome}</span>
                            <span className={styles.itemQuantity} >{item.quantidade}</span>
                             <button className={styles.removeButton}><i className="fas fa-trash"></i></button>
                        </div>
                    )  
                    )}
                </div>
                <hr />
                <div className={styles.containerFinal}>
                    <span className={styles.spanTotal}>Total : R$ </span>
                    <Button
                        text={"Confirmar Venda"}
                        color={"--green"}     
                    />
                </div>
        </div>
    )
}
export default Vendas