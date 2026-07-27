import { useState } from "react";
import styles from "./login.module.css"
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const[mostrarSenha, setMostrarSenha]= useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')    

    const [emailError, setEmailError] = useState('')
    const [passwordErro, setPassowrdError] = useState('')




    async function loginUser(e) {
      e.preventDefault();

      setEmailError('')
      setPassowrdError('')

      let valid = true
      if (email.trim() === ""){
        setEmailError('Digite o email')
        valid = false
      }
      if (password.trim() === ""){
        setPassowrdError('Digite sua senha')
        valid = false
      }

      if (!valid) return;
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
          navigate("/")
        }else if (data.mensagem === "Usuário não encontrado"){
          setEmailError('Usuário não encontrado')
        }else if (data.mensagem === "Senha Incorreta"){
          setPassowrdError('Senha incorreta')
        }
}
  
  return (
    <section className={styles.section}>
      <div className={styles.containerLogin}>
        <h2 className={styles.tittle}>Login de Usuários</h2>
        <div className={styles.userAction}>
          <label className={styles.inputRequest}>E-mail</label>
          <span className={styles.erroUser}>Usuário não encontrado</span>
          <input  type="text" placeholder="seu@email.com" value={email} onChange={(e)=> setEmail(e.target.value)} className={emailError ? styles.error : ""} /> {emailError && <span className={styles.spanErro}>{emailError}</span>}
          <label className={styles.inputRequest} htmlFor="password">Senha</label>
          <span className={styles.erroSenha}>Senha Incorreta</span>
          <div className={styles.inputSenha}>
            <input id="password" type={mostrarSenha ? "text" : "password"} placeholder="••••••••" value={password}  onChange={(e) => setPassword(e.target.value)} className={passwordErro ? styles.error : ""}/> 
            <button className={styles.btnOlho} onClick={() => setMostrarSenha (!mostrarSenha)}><i className={mostrarSenha ? "fas fa-eye-slash" : "fas fa-eye"} id="eye"></i></button>
          </div>
          {passwordErro && <span className={styles.spanErro}>{passwordErro}</span>}
        </div>
        <button className={styles.btnEntrar} onClick={(e)=> loginUser(e)}>Entrar</button>
      </div>
    </section>
  );
}

export default Login