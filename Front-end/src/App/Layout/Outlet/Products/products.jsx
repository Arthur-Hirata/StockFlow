import styles from "./products.module.css"
import SectionTittle from "../../../../Components/Section-Tittle/Section-tittle"
import SubTittle from "../../../../Components/SubTittle/SubTittle"
import { useState } from "react"
import { useEffect } from "react"
function Products(){
    const [products, setProducts] = useState([])
    const [lowAmountProducts, setlowAmountProducts] = useState([])
    const [lowAmountQuantity, setLowAmountQuantity] = useState("")
    const [productsNames, setProductsNames] = useState([])
    console.log(productsNames)
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
                setLowAmountQuantity(data.low_amount_products.length)
                setProductsNames(data.products_list.map(product => product.nome))
            }
        }
        loadProducts()
    },[]);
    function onApertar(){
        alert(productsNames)
    }
    return (
        <section>
            <SectionTittle text={"Produtos"} />
            <div className={styles.sectionProducts}>
            {lowAmountProducts.length > 0 &&(
                <>
                    <SubTittle 
                        text = {`Produtos em baixa quantidade (${lowAmountQuantity})`}
                        color ={"--red"}
                        />
                <div className={styles.gridLowAmountProducts}>
                    {lowAmountProducts.map((product)=>(
                        <div key={product.id} className={styles.Produto}>
                            <span className={styles.idProduto}>ID: {product.id}</span>
                            <img src={product.imagem} alt="Foto do Produto" className={styles.fotoProduto} />
                            <span className={styles.nomeProduto}>{product.nome}</span>
                            <span className={styles.precoProduto}>R${product.preco}</span>
                            <div className={styles.divQuantidade}>
                                <span className={styles.quantidade}>{product.quantidade}</span>
                            </div>
                            <span className={styles.quantidadeMinima}>{product.quantidade_minima}</span>
                        </div>
                    ))}
                </div>
                </>
            )}
                <SubTittle 
                    text={"Produtos totais"}
                    color={"--text"}
                
                />
                <input type="text" placeholder="Pesquise por produto"  className={styles.inputSearch}/>
                <div className={styles.gridProducts}>
                    {products.map((product)=>(
                        <div key={product.id} className={styles.Produto}>
                            <span className={styles.idProduto}>ID: {product.id}</span>
                            <img src={product.imagem} alt="Foto do Produto" className={styles.fotoProduto} />
                            <span className={styles.nomeProduto}>{product.nome}</span>
                            <span className={styles.precoProduto}>R${product.preco}</span>
                            <div className={styles.divQuantidade}>
                                <span className={styles.quantidade}>{product.quantidade}</span>
                            </div>
                            <span className={styles.quantidadeMinima}>{product.quantidade_minima}</span>
                        </div>
                    ))}
                </div>
                <button onClick={onApertar}></button>
            </div>
        </section>
    )
}
export default Products