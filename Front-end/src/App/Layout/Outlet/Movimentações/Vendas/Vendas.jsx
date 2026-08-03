import styles from "./Vendas.module.css"
import { useState } from "react";
import Button from "../../../../../Components/Button/button";
function Vendas({products}){
    const [selectedProduct, setSelectedProduct] = useState("")

    function onAdicionar(){
        console.log(selectedProduct)
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
                    <input type="number" placeholder="Digite a Quantidade" min={0}/>
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
                    <div className={styles.itemList}>
                        <span className={styles.itemPrice}>R$ 8,99</span>
                        <span className={styles.itemName}>Pepsi 500ml</span>
                        <span className={styles.itemQuantity}>2x</span>
                        <button className={styles.removeButton}><i className="fas fa-trash"></i></button>
                    </div>
                    <div className={styles.itemList}>
                        <span className={styles.itemPrice}>R$ 8,99</span>
                        <span className={styles.itemName}>Pepsi 500ml</span>
                        <span className={styles.itemQuantity}>2x</span>
                        <button className={styles.removeButton}><i className="fas fa-trash"></i></button>
                    </div>
                    <div className={styles.itemList}>
                        <span className={styles.itemPrice}>R$ 8,99</span>
                        <span className={styles.itemName}>Pepsi 500ml</span>
                        <span className={styles.itemQuantity}>2x</span>
                        <button className={styles.removeButton}><i className="fas fa-trash"></i></button>
                    </div>
                    
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