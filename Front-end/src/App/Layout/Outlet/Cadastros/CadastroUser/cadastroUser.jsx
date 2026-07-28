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
                            <input type="text" placeholder="Digite o e-mail do usuário" value={emailUser} onChange={(e) => {setEmailUser(e.target.value);setEmailError("")}}/> {emailUserError && <span className={styles.spanErro}>{emailUserError}</span>}
                            <span className={styles.inputRequest}>Nome do usuário</span>
                            <input type="text" placeholder="Digite o nome do usuário" value={userName} onChange={(e) => {setUserName(e.target.value); setUserNameError("")}} /> {userNameError && <span className={styles.spanErro}>{userNameError}</span>}
                            <span className={styles.inputRequest}>Senha do usuário</span>
                            <div className={styles.divPassword}>
                                <input type={mostrarSenha ? "text" : "password"} placeholder="Digite a senha para a conta do usuário" value={userPassword} onChange={(e) => {setUserPassword(e.target.value);setUserPasswordError("")}}/>
                                <button className={styles.btnOlho} onClick={()=> setMostrarSenha(!mostrarSenha)}><i className={mostrarSenha ? "fas fa-eye-slash" : "fas fa-eye"}></i></button>
                            </div>
                            {userPasswordError && <span className={styles.spanErro}>{userPasswordError}</span>}
                            <select 
                                value={field}
                                onChange={(e) => { setField(e.target.value); setFieldError("")}}
                               
                            
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
                            <input type="text" placeholder="Digite o ID do usuário" />
                            <span className={styles.inputRequest}>Confirme o ID do usuário</span>
                            <input type="text" placeholder="Confirme o ID do usuário" />
                            <span className={styles.inputRequest}>Motivo da remoção</span>
                            <input type="text"  placeholder="Informe o motivo da remoção do usuário"/>
                    </div>
                        <Button 
                            text={"Remover"}
                            color={"--red"}
                        
                        />

                </div>
            </div>
        </section>
    )
}
export default CadastroUser