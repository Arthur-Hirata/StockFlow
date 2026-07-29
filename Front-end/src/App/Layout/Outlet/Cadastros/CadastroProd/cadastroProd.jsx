import styles from "./cadastroProd.module.css"
import { useState } from "react"
import Button from "../../../../../Components/Button/button"
import ConfirmartionModal from "../../../../../Components/ConfirmationModal/ConfirmationModal"
import AlertOverlay from "../../../../../Components/alertOvelay/alertOvelay"

function CadastroProd(){
        const userToken = localStorage.getItem("token") 
        const [name, setName] = useState('')
        const [price, setPrice] = useState('')
        const [lowAmount, setLowAmount] = useState('')
        const [image, setImage] = useState('')
        const [nameError, setNameError] = useState('')
        const [priceError, setPriceError] = useState('')
        const [amountError, setAmountError] = useState('')
        const [imageError, setImageError] = useState('')
    
        const [confirmModal, setConfirmModal] = useState(null)
        const [alertOverlay, setAlertOverlay] = useState(null)
        async function onAdicionar(){
            let valid = true
            
            if (name.trim() === ""){
                valid = false
                setNameError('O produto precisa ter um nome')
            }
            if (price.trim() === ""){
                valid = false
                setPriceError('O produto precisa ter um preco estipulado')
            } 
            if (lowAmount.trim() === ""){
                valid = false
                setAmountError('O produto precisa ter uma quantidade mínima estipulada')
            }
            if (image.trim() === ""){
                valid = false
                setImageError('O produto precisa ter uma imagem atrelada')
            } 
            if (!valid){
                return
            }
    
           setConfirmModal({
                content : "adicionar esse produto",
                text : "Adicionar",
                color1 : "--green",
                color2 : "--red",
    
                onConfirm : async() =>{
                    setConfirmModal(null)
                    const response = await fetch("http://127.0.0.1:5000/product", {
                        method : "POST",
                        headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userToken}`,
                        
                    },
                        body : JSON.stringify({
                            name : name,
                            price : price,
                            low_amount : lowAmount,
                            image : image
                        })
                    })
                    setName("")
                    setPrice("")
                    setLowAmount("")
                    setImage("")
                    const data = await response.json()
                    if (response.ok){
                        setAlertOverlay({
                            text:"Produto adicionado com sucesso",
                            color:"--green"
                        })
                        setTimeout(() => {
                            setAlertOverlay(null);
                        }, 3000);
                    }
                    else {
                        if (data.mensagem === "Produto já existente"){
                            setAlertOverlay({
                            text:"Esse produto já existe",
                            color:"--red"
                        })
                        setTimeout(() => {
                            setAlertOverlay(null);
                        }, 3000);
                        setNameError("Esse produto já existe")
                        }
                        else{
                            setAlertOverlay({
                                text:"Erro ao adicionar o produto",
                                color:"--red"
                            })
                            setTimeout(() => {
                                setAlertOverlay(null);
                            }, 3000);

                        }
                    }
                }
           })
        }
        
        const [idItem, setItemId] = useState('')
        const [confirmIditem, setIdConfirm] = useState('')
        const [reason, setReason] = useState('')
        const [idItemError, setIDError] = useState("")
        const [confirmError, setConfirmError] = useState("")
        const [reasonError, setReasonError] = useState("")
        
        
        
        
         async function onRemover(){
            setIDError("")
            setConfirmError("")
            setReasonError("")
    
            let valid = true
    
            if (idItem.trim() === ""){
                valid = false
                setIDError("O ID precisa ser preenchido")
            }
    
            if (confirmIditem.trim() === ""){
                valid = false
                setConfirmError("O ID precisa ser preenchido")
            }
    
            if (reason.trim() === ""){
                valid = false
                setReasonError("A razão para a remoção precisa ser explicada")
            }
    
            if (idItem.trim() !== "" && confirmIditem.trim() !== "" && idItem.trim() !== confirmIditem.trim()){
                valid = false
                setIDError("Os ID's precisam ser iguais")
                setConfirmError("Os ID's precisam ser iguais")
            }
    
            if (!valid){
                return
            }
            setConfirmModal({
                content : "remover esse produto",
                text : "Fechar",
                color1 : "--green",
                color2 : "--red",
    
                onConfirm : async() =>{
                    setConfirmModal(null)
                    const response = await fetch(`http://127.0.0.1:5000/product/${idItem}`, {
                        method : "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${userToken}`,
                        },
                        body : JSON.stringify({
                            reason :reason
                        })
                    })
                    setItemId('')
                    setIdConfirm('')
                    setReason('')
                    const data = await response.json()
                    if (response.ok){
                        setAlertOverlay({
                            text : "Produto removido com sucesso",
                            color : "--green"
                        })
                        setTimeout(() => {
                            setAlertOverlay(null);
                        }, 3000);
                    }
                    else{
                        if (data.mensagem === "Esse produto não existe"){
                            setAlertOverlay({
                            text : "Esse produto não existe",
                            color : "--red"
                        })
                        setTimeout(() => {
                            setAlertOverlay(null);
                        }, 3000);
                        setIDError("Esse produto não existe")
                        setConfirmError("Esse produto não existe")
                        }else{
                            setAlertOverlay({
                                text : "Erro ao remover produto",
                                color : "--red"
                            })
                            setTimeout(() => {
                                setAlertOverlay(null);
                            }, 3000);
                        }
                    }
                }
    
            })
        }
    
        const [editId, setEditID] = useState("")
        const [confirmEdit, setEditConfirm] = useState("")
        const [edit, setEdit] = useState("")
        const [editIdErro, setEditIDErro] = useState("")
        const [confirmEditError, setConfrimErroEdit] = useState("")
        const [editError, setEditError] = useState("")
        const [field, setField] = useState("none")
        const [fieldError, setFieldError] = useState("")
        
    
    
    
    
         async function onEditar(){
            let valid = true
            if (editId.trim()===""){
                valid = false
                setEditIDErro("O ID precisa estar preenchido")
            }
            if (confirmEdit.trim() === ""){
                valid= false
                setConfrimErroEdit("O ID precisa estar preenchido")
            }
            if (edit.trim()=== ""){
                valid = false
                setEditError("A edição precisa estar preenchida")
            }
            if (editId.trim()!== "" && confirmEdit.trim() !== ""  &&  editId.trim() !== confirmEdit.trim()){
                valid = false
                setEditIDErro("Os ID's precisam ser iguais")
                setConfrimErroEdit("Os ID's precisam ser iguais")
            }
            if (field === "none"){
                valid = false
                setFieldError("Campo vazio")
            }
            if (!valid){
                return
            }
            setConfirmModal({
                content : "editar esse produto",
                text : "Fechar",
                color1 : "--green",
                color2 : "--red",
                onConfirm : async () =>{
                    setConfirmModal(null)
                    const response = await fetch(`http://127.0.0.1:5000/product/${editId}`, {
                        method : 'PATCH',
                         headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${userToken}`,
                        },
                        body : JSON.stringify({
                            edicao : edit,
                            field : field
                        })
                    })
                    setEditID("")
                    setEditConfirm("")
                    setEdit("")
                    const data = await response.json()
                    if (response.ok){
                       setAlertOverlay({
                        text : "Produto editado com sucesso",
                        color: "--green"
                       })
                       setTimeout(() => {
                            setAlertOverlay(null);
                        }, 3000);
                    }
                    else {
                        if (data.mensagem === "Esse produto não existe"){
                            setAlertOverlay({
                            text : "Esse produto não existe",
                            color : "--red"
                        })
                        setTimeout(() => {
                            setAlertOverlay(null);
                        }, 3000);
                        setEditIDErro("Esse produto não existe")
                        setConfrimErroEdit("Esse produto não existe")
                        }else{
                            setAlertOverlay({
                                text : "Erro ao editar produto",
                                color : "--red"
                            })
                            setTimeout(() => {
                                setAlertOverlay(null);
                            }, 3000);
                        }
                    }
                }
            })
        }
    return(
        <section>
            {alertOverlay && (
            <AlertOverlay
                text={alertOverlay.text}
                color={alertOverlay.color}
            />
        )}
            <div className={styles.containerCadastroProd}>
                <div className={styles.cardCadastro}>
                    <span className={styles.cardTittle}>Adicionar Produtos</span>
                    <div className={styles.userAction}>
                        <span className={styles.inputRequest}>Nome do produto</span>
                        <input type="text" placeholder="Nome produto" value={name} onChange={(e) => { setName(e.target.value); setNameError('') }} className={nameError ? styles.error : ""} /> {nameError && <span className={styles.spanErro}>{nameError}</span>}
                        <span className={styles.inputRequest}>Preço de venda</span>
                        <input type="text"  placeholder="Preço de venda (apenas números)" value={price} onChange={(e) => { setPrice(e.target.value); setPriceError('') }} className={priceError ? styles.error : ""}/> {priceError && <span className={styles.spanErro}>{priceError}</span>}
                        <span className={styles.inputRequest}>Quantidade Mínima no estoque</span>
                        <input type="text" placeholder="Quantidade Mínima estoque" value={lowAmount} onChange={(e) => { setLowAmount(e.target.value); setAmountError('') }}  className={amountError ? styles.error : ""}/> {amountError && <span className={styles.spanErro}>{amountError}</span>}
                        <span className={styles.inputRequest}>Imagem do produto</span>
                        <input type="text" placeholder="Url da imagem" value={image}  onChange={(e) => { setImage(e.target.value); setImageError('') }}  className={imageError ? styles.error : ""}/> {imageError && <span className={styles.spanErro}>{imageError}</span>}
                    </div>
                    <Button 
                        text="Adicionar"
                        onClick={onAdicionar}
                        color="--green"
                    />
                    {confirmModal && <ConfirmartionModal onClose={()=>setConfirmModal(null)} 
                    onConfirm={confirmModal.onConfirm}
                    content={confirmModal.content} 
                    color1={confirmModal.color1} 
                    color2={confirmModal.color2}   
                    text={confirmModal.text}   />}
                </div>
                <div className={styles.cardCadastro}>
                    <span className={styles.cardTittle}>Remover Produtos</span>
                    <div className={styles.userAction}>
                        <span className={styles.inputRequest}>ID do produto</span>
                        <input type="text" placeholder="ID produto" value={idItem} onChange={(e)=> { setItemId(e.target.value); setIDError("") }} className={idItemError ? styles.error : ""}/>  {idItemError && <span className={styles.spanErro}>{idItemError}</span>}
                        <span className={styles.inputRequest}>Confirme ID do produto</span>
                        <input type="text" placeholder="ID produto" value={confirmIditem} onChange={(e) => { setIdConfirm(e.target.value); setConfirmError("") }} className={confirmError ? styles.error : ""}/> {confirmError && <span className={styles.spanErro}>{confirmError}</span>}
                        <span className={styles.inputRequest}>Motivo da remoção</span>
                        <input type="text" placeholder="Motivo da remoção" value={reason} onChange={(e) => { setReason(e.target.value); setReasonError("") }} className={reasonError ? styles.error : ""}/> {reasonError && <span className={styles.spanErro}>{reasonError}</span>}
                    </div>
                    <Button
                        text="Remover"
                        onClick={onRemover}
                        color="--red"
                    />
                    {confirmModal && <ConfirmartionModal onClose={()=> setConfirmModal(null)}
                        onConfirm={confirmModal.onConfirm}
                        content={confirmModal.content}
                        color1={confirmModal.color1}
                        color2={confirmModal.color2}
                        text={confirmModal.text}
                        />}
                </div>
                <div className={styles.cardCadastro}>
                    <span className={styles.cardTittle}>Editar Produto</span>
                    <div className={styles.userAction}>
                        <span className={styles.inputRequest}>ID do Produto</span>
                        <input type="text" placeholder="ID produto" value={editId} onChange={(e)=> {setEditID(e.target.value); setEditIDErro("")}} className={editIdErro ? styles.error : ""}/>  {editIdErro && <span className={styles.spanErro}>{editIdErro}</span>}
                        <span className={styles.inputRequest}>Confirme ID do produto</span>
                        <input type="text" placeholder="ID produto"  value={confirmEdit} onChange={(e)=>{setEditConfirm(e.target.value); setConfrimErroEdit("")}} className={confirmEditError ? styles.error : ""} /> {confirmEditError && <span className={styles.spanErro}>{confirmEditError}</span>}
                        <span className={styles.inputRequest}>Edição</span>
                        <input type="text" placeholder="Digite a edição" value={edit} onChange={(e) => { setEdit(e.target.value); setEditError("") }} className={editError ? styles.error : ""} /> {editError && <span className={styles.spanErro}>{editError}</span>}
                    <select 
                        value={field}
                        onChange={(e) => { setField(e.target.value); setFieldError("") }}
                        className={fieldError ? styles.error : ""}>
                        <option value="none" disabled selected hidden>Selecione</option>
                        <option value="name">Nome do produto</option>
                        <option value="price">Preço do produto</option>
                        <option value="image">Imagem do produto</option>
                        <option value="low_amount">Quantidade mínima do produto</option>
                    </select>
                    {fieldError && <span className={styles.spanErro}>{fieldError}</span>}
                    </div>
                    <Button 
                        text="Editar"
                        onClick={onEditar}
                        color="--alert"
                    />
                     {confirmModal && <ConfirmartionModal onClose={()=> setConfirmModal(null)}
                        onConfirm={confirmModal.onConfirm}
                        content={confirmModal.content}
                        color1={confirmModal.color1}
                        color2={confirmModal.color2}
                        text={confirmModal.text}
                        />}
                </div>
            </div>




        </section>
    )
}
export default CadastroProd