import { useState } from "react";
import styles from "./login.module.css"

function Login() {
    const[mostrarSenha, setMostrarSenha]= useState(false)
    const [name, setName] = useState('');
    const [password, setPassword] = useState('')

    function loginUser(){
        console.log(name)
        console.log(password)
    }

  return (
    <section className={styles.section}>
      <div className={styles.containerLogin}>
        <h2 className={styles.tittle}>Login de Usuários</h2>
        <div className={styles.userAction}>
          <label className={styles.inputRequest} htmlFor="email">E-mail</label>
          <input id="email" type="text" placeholder="seu@email.com" value={name} onChange={(e)=> setName(e.target.value)} />

          <label className={styles.inputRequest} htmlFor="password">Senha</label>
          <div className={styles.inputSenha}>
            <input id="password" type={mostrarSenha ? "text" : "password"} placeholder="••••••••" value={password}  onChange={(e) => setPassword(e.target.value)}/>
            <button className={styles.btnOlho} onClick={() => setMostrarSenha (!mostrarSenha)}><i className={mostrarSenha ? "fas fa-eye-slash" : "fas fa-eye"} id="eye"></i></button>
          </div>
        </div>
        <button className={styles.btnEntrar} onClick={()=> loginUser()}>Entrar</button>
      </div>
    </section>
  );
}

export default Login