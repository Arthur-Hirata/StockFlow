import styles from "./Movimentações.module.css"
import SectionTittle from "../../../../Components/Section-Tittle/Section-tittle"
import { useState } from "react"
import { useEffect } from "react"
import Entradas from "./Entradas/Entradas"
import Saidas from "./Saidas/Saidas"
import Vendas from "./Vendas/Vendas"
function Movimentações(){
    const [selected, setSelected] = useState("movimentacao")
    const [movSelected, setMovSelected] = useState("entrada")
    const [products, setProducts] = useState([])
    const [avaliableProducts, setAvaliableProducts] = useState([])

    const [saleskey, setSaleskey] = useState(0)
    async function loadProducts (){
        const userToken = localStorage.getItem("token")
        const response = await fetch("http://127.0.0.1:5000/getProducts", {
            method : 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        })
        const data = await response.json()

        if (response.ok){
            setProducts(data.products_list)
            const avaliableProducts = data.products_list.filter(
                (product) => product.quantidade > 0

            )
            setAvaliableProducts(avaliableProducts)
        }
    }
    useEffect(()=>{
        loadProducts()
    })
    return(
    <section>
            <SectionTittle text={"Movimentações"} />
         <div className={styles.containerMovimentaçoes}>
            <div className={styles.containerCadastro}>
                <div className={styles.optionContainer}>
                    <div
                        className={`${styles.optionCard} ${
                            selected === "movimentacao" ? styles.selected : ""
                        }`}
                        onClick={() => setSelected("movimentacao")}
                    >
                        <span className={styles.optionIcon}>📦</span>
                        <span className={styles.optionTitle}>Movimentação de Produtos</span>
                    </div>

                    <div
                        className={`${styles.optionCard} ${
                            selected === "venda" ? styles.selected : ""
                        }`}
                        onClick={() => setSelected("venda")}
                    >
                        <span className={styles.optionIcon}>🛒</span>
                        <span className={styles.optionTitle}>Registrar Venda</span>
                    </div>
                </div>
                {selected === "movimentacao" && <div className={styles.containerCard}>
                    <span className={styles.cardTittle}>Movimentação</span>
                    <div className={styles.movOptions}>
                        <button className={`${styles.movButton} ${ movSelected === "entrada" ? styles.selected : ""}`} onClick={() => setMovSelected("entrada")}>Entrada</button>
                        <button className={`${styles.movButton} ${ movSelected === "saida" ? styles.selected : ""}`} onClick={() => setMovSelected("saida")}>Saída</button>
                    </div>
                    {movSelected === "entrada" && (
                        <Entradas products={products}/>
                        
                    )}
                    {movSelected === "saida" &&(
                        <Saidas  products={avaliableProducts} />
                    )}
                    </div>}
                {selected === "venda"&& <div className={styles.containerCard}>
                    <span className={styles.cardTittle}>Venda</span>
                    
                    <Vendas 
                    key={saleskey}
                    products={avaliableProducts}
                    onSale={()=>{
                        loadProducts()
                        setSaleskey(prev => prev + 1)
                    }}
                    />
                    </div>}






            </div>
        </div>
    </section>
    )
}
export default Movimentações