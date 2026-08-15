import styles from "./Movimentações.module.css"
import SectionTittle from "../../../../Components/Section-Tittle/Section-tittle"
import AlertOverlay from "../../../../Components/alertOvelay/alertOvelay"
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
    const [alertOverlay, setAlertOverlay] = useState(null)

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
    }, [])
    function showAlert(text, color){
        setAlertOverlay({
        text,
        color
        })

        setTimeout(() => {
        setAlertOverlay(null)
    }, 3000)
    }
    return(
    <section>
        {alertOverlay && (
            <AlertOverlay 
                text={alertOverlay.text}
                color={alertOverlay.color}
        />
        )}
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
                        <Entradas 
                            products={products}
                            onAdd={async()=>{
                                loadProducts()
                                showAlert("Quantidade adicionada com sucesso!", "--green")
                            }}
                            showAlert={showAlert}    
                        />
                        
                    )}
                    {movSelected === "saida" &&(
                        <Saidas  
                        products={avaliableProducts} 
                        onExit={async()=>{
                            await loadProducts()
                            showAlert("Saida cadastrada com sucesso", "--green")
                        }}
                        showAlert={showAlert}
                        
                        
                        
                        />
                    )}
                    </div>}
                {selected === "venda"&& <div className={styles.containerCard}>
                    <span className={styles.cardTittle}>Venda</span>
                    
                    <Vendas 
                    products={avaliableProducts}
                    onSale={async()=>{
                        await loadProducts()
                        showAlert("Venda cadastrada com sucesso", "--green")
                    }}
                    showAlert={showAlert}
                    />
                    </div>}






            </div>
        </div>
    </section>
    )
}
export default Movimentações