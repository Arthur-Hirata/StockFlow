import { useState } from "react"
import styles from "./cadastroUser.module.css"
import Button from "../../../../../Components/Button/button"
import ConfirmartionModal from "../../../../../Components/ConfirmationModal/ConfirmationModal"
import AlertOverlay from "../../../../../Components/alertOvelay/alertOvelay"

function CadastroUser(){
    const userToken = localStorage.getItem("token") 

    const [alertOverlay, setAlertOverlay] = useState(null)
    const [confirmModal, setConfirmModal] = useState(null)


    const [mostrarSenha, setMostrarSenha] = useState(null)
    const [emailUser, setEmailUser] =useState("")
    const [userName, setUserName] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [field, setField] = useState("none")

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const [emailUserError, setEmailError] = useState("")
    const [userNameError, setUserNameError] = useState("")
    const [userPasswordError, setUserPasswordError] = useState("")
    const [fieldError, setFieldError] = useState("")

    



    function onAdcUser(){
        let valid = true

        setEmailError("");
        setUserNameError("");
        setUserPasswordError("");
        setFieldError("");

        if (emailUser.trim() === "" || !regex.test(emailUser) ){
            valid = false
            setEmailError("O usuário precisa ter um válido email vinculado")
        }
        if (userName.trim() === ""){
            valid = false
            setUserNameError("O usuário precisa ter um nome informado")
        }
        if (userPassword.trim() === "" || userPassword.trim().length <= 8){
            valid = false
            setUserPasswordError("O usuário precisa ter uma senha de no mínimo 8 caracteres")
        }
        if (field === "none"){
            valid = false
            setFieldError("Campo obrigatório")
        }
        if (!valid){
            return
        }
        setConfirmModal({
            content : "adicionar esse usuário",
            text : "Adicionar",
            color1 : "--green",
            color2 : "--red",

            onConfirm: async ()=> {
                setConfirmModal(null)
                const response = await fetch("http://127.0.0.1:5000/users", {
                    method : 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userToken}`,
                    },
                    body : JSON.stringify({
                        email : emailUser,
                        name : userName,
                        password : userPassword,
                        role : field
                    })
                })
                const data = await response.json()
                if (response.ok){
                    setAlertOverlay({
                        text : "Usuário adicionado com sucesso",
                        color : "--green"
                    })
                    setTimeout(() => {
                        setAlertOverlay(null);
                    }, 3000);
                    console.log(data.mensagem)
                    setEmailUser("")
                    setUserName("")
                    setUserPassword("")
                    setField("none")
                }
                else{
                    if (data.mensagem === "Email já cadastrado"){
                        setAlertOverlay({
                            text : "Email já cadastrado na empresa",
                            color : "--red"
                        })
                        setEmailError("Email já cadastrado")
                        setTimeout(() => {
                                setAlertOverlay(null);
                        }, 3000);
                    }
                    else{
                        setAlertOverlay({
                            text : "Erro ao adicionar usuário",
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
    const [id, setId] = useState("")
    const [confirmId, setConfirmID] = useState("")
    const [reason, setReason] = useState("")
    const [idError, setIdError] = useState("")
    const [confirmIdError, setConfirmIdError] = useState("")
    const [reasonError, setReasonError] = useState("")


    function onRemoveUser(){
        let valid = true

        if (id.trim() === ""){
            valid = false
            setIdError("ID precisa estar preenchido")
        }
        if (confirmId.trim() === ""){
            valid = false
            setConfirmIdError("ID precisa estar preenchido")
        }
        if (id.trim() === "" && confirmId.trim() === "" && id.trim() !== confirmId.trim()){
            valid = false
            setIdError("Os ID's precisam ser iguais")
            setConfirmIdError("Os ID's precisam ser iguais")
        }
        if (reason.trim() === ""){
            valid = false
            setReasonError("O motivo precisa estar preenchido")
        }

        if (!valid){
            return
        }
        setConfirmModal({
            content : "remover esse usuário",
            text : "Remover",
            color1 : "--green",
            color2 : "--red",

            onConfirm : async() => {
                setConfirmModal(null)

                const response = await fetch(`http://127.0.0.1:5000/users/${id}`, {
                    method : "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userToken}`,
                    },
                    body : JSON.stringify({
                        reason : reason
                    })
                })
                setId("")
                setConfirmID("")
                setReason("")
                const data = await response.json()

                if (response.ok){
                    setAlertOverlay({
                        text : "Usuário removido com sucesso",
                        color : "--green"
                    })
                    setTimeout(() => {
                        setAlertOverlay(null);
                    }, 3000);
                }
                else {
                    if (data.mensagem === "Usuário inexistente"){
                        setAlertOverlay({
                        text : "Usuário não existe",
                        color : "--red"
                    })
                    setTimeout(() => {
                        setAlertOverlay(null);
                    }, 3000);
                    }
                    else {
                        setAlertOverlay({
                        text : "Erro ao remover usuário",
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
            <div className={styles.containerCadastroUser}>
                <div className={styles.cardCadastro}>
                    <span className={styles.cardTittle}>Cadastrar Usuários</span>
                        <div className={styles.userAction}>
                            <span className={styles.inputRequest}>E-mail do usuário</span>
                            <input type="text" placeholder="Digite o e-mail do usuário" value={emailUser} onChange={(e) => {setEmailUser(e.target.value);setEmailError("")}} className={emailUserError ? styles.error : ""}/> {emailUserError && <span className={styles.spanErro}>{emailUserError}</span>}
                            <span className={styles.inputRequest}>Nome do usuário</span>
                            <input type="text" placeholder="Digite o nome do usuário" value={userName} onChange={(e) => {setUserName(e.target.value); setUserNameError("")}}  className={userNameError ? styles.error : ""}/> {userNameError && <span className={styles.spanErro}>{userNameError}</span>}
                            <span className={styles.inputRequest}>Senha do usuário</span>
                            <div className={styles.divPassword}>
                                <input type={mostrarSenha ? "text" : "password"} placeholder="Digite a senha para a conta do usuário" value={userPassword} onChange={(e) => {setUserPassword(e.target.value);setUserPasswordError("")}} className={userPasswordError ? styles.error : ""}/>
                                <button className={styles.btnOlho} onClick={()=> setMostrarSenha(!mostrarSenha)}><i className={mostrarSenha ? "fas fa-eye-slash" : "fas fa-eye"}></i></button>
                            </div>
                            {userPasswordError && <span className={styles.spanErro}>{userPasswordError}</span>}
                            <select 
                                value={field}
                                onChange={(e) => { setField(e.target.value); setFieldError("")}}
                               className={fieldError ? styles.error : ""}
                            
                            >
                                <option value="none">Selecione</option>
                                <option value="user">User</option>
                                <option value="admin">admin</option>
                            </select>
                            {fieldError && <span className={styles.spanErro}>{fieldError}</span>}

                        </div>
                            <Button
                                text={"Adicionar"}
                                color={"--green"}
                                onClick={onAdcUser}                   
                                />
                            {confirmModal && <ConfirmartionModal onClose={()=>setConfirmModal(null)} 
                                onConfirm={confirmModal.onConfirm}
                                content={confirmModal.content} 
                                color1={confirmModal.color1} 
                                color2={confirmModal.color2}   
                                text={confirmModal.text}   
                            />}
                            
                </div>
                <div className={styles.cardCadastro}>
                    <span className={styles.cardTittle}>Remover Usuários</span>
                    <div className={styles.userAction}>
                        <span className={styles.inputRequest}>ID usuário</span>
                            <input type="text" placeholder="Digite o ID do usuário" value={id} onChange={(e) => {setId(e.target.value); setIdError("")}} className={idError ? styles.error : ""}/> {idError && <span  className={styles.spanErro}>{idError}</span>}
                            <span className={styles.inputRequest}>Confirme o ID do usuário</span>
                            <input type="text" placeholder="Confirme o ID do usuário" value={confirmId} onChange={(e) => {setConfirmID(e.target.value); setConfirmIdError("")}}  className={confirmIdError ? styles.error : ""}/> {confirmIdError && <span  className={styles.spanErro}>{confirmIdError}</span>}
                            <span className={styles.inputRequest}>Motivo da remoção</span>
                            <input type="text"  placeholder="Informe o motivo da remoção do usuário" value={reason} onChange={(e) => {setReason(e.target.value); setReasonError("")}} className={reasonError ? styles.error : ""}/> {reasonError && <span  className={styles.spanErro}>{reasonError}</span>}
                    </div>
                        <Button 
                            text={"Remover"}
                            color={"--red"}
                            onClick={onRemoveUser}
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
        </section>
    )
}
export default CadastroUser