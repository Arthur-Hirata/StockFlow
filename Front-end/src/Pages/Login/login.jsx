import { useState } from "react";
import styles from "./login.module.css"

function Login() {
    const[mostrarSenha, setMostrarSenha]= useState(false)
    const [email, setName] = useState('');
    const [password, setPassword] = useState('')    

    async function loginUser(e) {
      e.preventDefault();
      const response = await fetch('http://127.0.0.1:5000/loginUser', {
          method : "POST",
          headers: {
              "Content-Type": "application/json"
          },
         body : JSON.stringify({
            'email' : email,
            'senha' : password
          })

        })
        const data = await response.json()
        if (response.ok){
          localStorage.setItem("token", data.token_JWT)
          alert("foi")
        }else {
          alert(data.message);
        }



    }
  return (
    <section className={styles.section}>
      <div className={styles.containerLogin}>
        <h2 className={styles.tittle}>Login de Usuários</h2>
        <div className={styles.userAction}>
          <label className={styles.inputRequest} htmlFor="email">E-mail</label>
          <input id="email" type="text" placeholder="seu@email.com" value={email} onChange={(e)=> setName(e.target.value)} />

          <label className={styles.inputRequest} htmlFor="password">Senha</label>
          <div className={styles.inputSenha}>
            <input id="password" type={mostrarSenha ? "text" : "password"} placeholder="••••••••" value={password}  onChange={(e) => setPassword(e.target.value)}/>
            <button className={styles.btnOlho} onClick={() => setMostrarSenha (!mostrarSenha)}><i className={mostrarSenha ? "fas fa-eye-slash" : "fas fa-eye"} id="eye"></i></button>
          </div>
        </div>
        <button className={styles.btnEntrar} onClick={(e)=> loginUser(e)}>Entrar</button>
      </div>
    </section>
  );
}

export default Login