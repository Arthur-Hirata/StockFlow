import styles from "./products.module.css"
import SectionTittle from "../../../../Components/Section-Tittle/Section-tittle"
import SubTittle from "../../../../Components/SubTittle/SubTittle"
import { useState } from "react"
import { useEffect } from "react"
function Products(){
    const [products, setProducts] = useState([])
    const [lowAmountProducts, setlowAmountProducts] = useState([])
    
    useEffect(()=>{
        
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
                setlowAmountProducts(data.low_amount_products)
            }
        }
    loadProducts()
},[]);
    return (
        <section>
            <SectionTittle text={"Produtos"} />
            <div className={styles.sectionProducts}>
                <SubTittle 
                    text = {"Produtos em baixa quantidade"}
                    color ={"--red"}
                    />
                <div className={styles.gridLowAmountProducts}>
                    {lowAmountProducts.map((product)=>(
                        <div key={product.id} className={styles.Produto}>
                            <img src={product.imagem} alt="Foto do Produto" className={styles.fotoProduto} />
                            <span className={styles.nomeProduto}>{product.nome}</span>
                            <div className={styles.divQuantidade}>
                                <span className={styles.quantidade}>{product.quantidade}</span>
                            </div>
                            <span className={styles.quantidadeMinima}>{product.quantidade_minima}</span>
                        </div>
                    ))}
                </div>
                <SubTittle 
                    text={"Produtos totais"}
                    color={"--text"}
                
                />
                <div className={styles.gridProducts}>
                    {products.map((product)=>(
                        <div key={product.id} className={styles.Produto}>
                            <span className={styles.idProduto}>{product.id}</span>
                            <img src={product.imagem} alt="Foto do Produto" className={styles.fotoProduto} />
                            <span className={styles.nomeProduto}>{product.nome}</span>
                            <div className={styles.divQuantidade}>
                                <span className={styles.quantidade}>{product.quantidade}</span>
                            </div>
                            <span className={styles.quantidadeMinima}>{product.quantidade_minima}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default Products

/*

<img src="https://www.cozinhadonabenta.com.br/wp-content/uploads/2018/11/site-jmacedo-farinha-de-trigo-dona-benta-tipo-1-1kg-embalagem-plastica-2023.jpg" className={styles.fotoProduto} />
                        <span className={styles.nomeProduto}>Farinha</span>
                        <div className={styles.divQuantidade}>
                            <span className={styles.quantidade}>15x</span>
                        </div>
                            <span className={styles.quantidadeMinima}>10x</span>


*/