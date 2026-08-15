
import { useState } from "react"
import styles from "./Userinfo.module.css"

function Userinfo({id, nome, role}){
    const [isOpen, setIsOpen] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    
    const handleToggle = () =>{
        if (isOpen){
            setIsClosing(true)
            setTimeout( ()=>{
                setIsOpen(false)
                setIsClosing(false)
            }, 180);
            return
        }
        setIsOpen(true)
        setIsClosing(false)
    }


    return(
        <div className={styles.containerUserInfo} >
            <div className={styles.displayContainer} 
                onClick={handleToggle}
                role="button"
                tabIndex={0}
                onKeyDown={(e)=>{
                    if (e.key === "Enter" || e.key === ""){
                        e.preventDefault()
                        handleToggle()
                    }
                }}
            
            
            >
                <i className="fa-solid fa-box"></i>
                <span className={styles.userName}>{nome}</span>
            </div>
            {isOpen && (
                <div className={`${styles.popup} ${isClosing ? styles.popupClosing : ""}`}>
                    <p>ID: {id}</p>
                    <p>Nome: {nome}</p>
                    <p>Role: {role}</p>
                    <button className={styles.btnSair}>Sair <i className=""></i></button>
                </div>
            )}
        </div>
    )
}
export default Userinfo