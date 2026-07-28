import Button from "../../../../../Components/Button/button"
import styles from "./cadastroUser.module.css"
import { useState } from "react"
function CadastroUser(){
    const [mostrarSenha, setMostrarSenha] = useState(null)
    
    
    return(
        <section>
            <div className={styles.containerCadastroUser}>
                <div className={styles.cardCadastro}>
                    <span className={styles.cardTittle}>Cadastrar Usuários</span>
                        <div className={styles.userAction}>
                            <span className={styles.inputRequest}>E-mail do usuário</span>
                            <input type="text" placeholder="Digite o e-mail do usuário" />
                            <span className={styles.inputRequest}>Nome do usuário</span>
                            <input type="text" placeholder="Digite o nome do usuário" />
                            <span className={styles.inputRequest}>Senha do usuário</span>
                            <div className={styles.divPassword}>
                                <input type="password" type={mostrarSenha ? "text" : "password"} placeholder="Digite a senha para a conta do usuário"/>
                                <button className={styles.btnOlho} onClick={()=> setMostrarSenha(!mostrarSenha)}><i className={mostrarSenha ? "fas fa-eye-slash" : "fas fa-eye"}></i></button>
                            </div>
                            <select >
                                <option value="none">Selecione</option>
                                <option value="user">User</option>
                                <option value="admin">admin</option>
                            </select>
                        </div>
                            <Button
                                text={"Adicionar"}
                                color={"--green"}                    
                            />
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