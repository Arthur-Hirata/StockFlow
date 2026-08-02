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
        </div>
    )
}
export default Vendas