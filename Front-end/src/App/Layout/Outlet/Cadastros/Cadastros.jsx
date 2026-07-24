import { useState } from "react"
import styles from "./Cadastros.module.css"
import SectionTittle from "../../../../Components/Section-Tittle/Section-tittle"
import Button from "../../../../Components/Button/button"
function Cadastros(){
    const userToken = localStorage.getItem("token")
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [lowAmount, setLowAmount] = useState('')
    const [image, setImage] = useState('')
    const [nameError, setNameError] = useState('')
    const [priceError, setPriceError] = useState('')
    const [amountError, setAmountError] = useState('')
    const [imageErro, setImageError] = useState('')






    const [field, setField] = useState("none")

    async function onAdicionar(){
        let valid = true
        if (name.trim === ""){
            valid = false
            setNameError('O produto precisa ter um nome')
        }
        if (price.trim === ""){
            valid = false
            setPriceError('O produto precisa ter um preco estipulado')
        }
        if (lowAmount.trim === ""){
            valid = false
            setAmountError('O produto precisa ter uma quantidade mínima estipulada')
        }
        if (image.trim === ""){
            valid = false
            setImageError('O produto precisa ter uma imagem atrelada')
        }
        if (!valid){
            return
        }
        const response = await fetch("", {
            method : 'POST',
            headers: {
                    Authorization: `Bearer ${userToken}`,
            },
            body : JSON.stringify({
                name : name,
                price : price,
                lowAmount : lowAmount,
                image : image
            })
        })
        if (response.ok){
            alert("cadastrado")
        }
        else {
            alert('bug')
        }

    }
    function onRemover(){
        alert("remover")
    }
    function onEditar(){
        alert("editar")
    }
    return(
        <section>
            <SectionTittle text={"Cadastros"} />
            <div className={styles.containerCadastro}>
                <div className={styles.cardCadastro}>
                    <span className={styles.cardTittle}>Adicionar Produtos</span>
                    <div className={styles.userAction}>
                        <span className={styles.inputRequest}>Nome do produto</span>
                        <input type="text" placeholder="Nome produto" value={name} onChange={(e) => setName(e.target.value)} className={nameError ? styles.error : ""} /> {nameError && <span className={styles.spanErro}>{nameError}</span>}
                        <span className={styles.inputRequest}>Preço de venda</span>
                        <input type="text"  placeholder="Preço de venda" value={price} onChange={(e) => setPrice(e.target.value)}/>
                        <span className={styles.inputRequest}>Quantidade Mínima no estoque</span>
                        <input type="text" placeholder="Quantidade Mínima estoque" value={lowAmount} onChange={(e) => setLowAmount(e.target.value)}  />
                        <span className={styles.inputRequest}>Imagem do produto</span>
                        <input type="text" placeholder="Url da imagem" value={image}  onChange={(e) => setImage(e.target.value)}/>
                    </div>
                    <Button 
                        text="Adicionar"
                        onClick={onAdicionar}
                        color="--green"
                    />
                </div>
                <div className={styles.cardCadastro}>
                    <span className={styles.cardTittle}>Remover Produtos</span>
                    <div className={styles.userAction}>
                        <span className={styles.inputRequest}>ID do produto</span>
                        <input type="text" placeholder="ID produto"/>
                        <span className={styles.inputRequest}>Confirme ID do produto</span>
                        <input type="text" placeholder="ID produto"/>
                        <span className={styles.inputRequest}>Motivo da remoção</span>
                        <input type="text" placeholder="Motivo da remoção"/>
                    </div>
                    <Button
                        text="Remover"
                        onClick={onRemover}
                        color="--red"
                    />
                </div>
                <div className={styles.cardCadastro}>
                    <span className={styles.cardTittle}>Editar Produto</span>
                    <div className={styles.userAction}>
                        <span className={styles.inputRequest}>ID do Produto</span>
                        <input type="text" placeholder="ID produto"/>
                        <span className={styles.inputRequest}>Confirme ID do produto</span>
                        <input type="text" placeholder="ID produto"/>
                        <span className={styles.inputRequest}>Edição</span>
                        <input type="text" placeholder="Digite a edição" />
                    <select 
                        value={field}
                        onChange={(e) => setField(e.target.value)}
                    
                    className={styles.select}>
                        <option value="none" disabled selected hidden>Selecione</option>
                        <option value="name">Nome do produto</option>
                        <option value="price">Preço do produto</option>
                        <option value="image">Imagem do produto</option>
                        <option value="low_amount">Quantidade mínima do produto</option>
                    </select>
                    </div>
                    <Button 
                        text="Editar"
                        onClick={onEditar}
                        color="--alert"
                    />
                </div>
            </div>

        </section>
    )
}
export default Cadastros