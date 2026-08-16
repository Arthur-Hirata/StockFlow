
import { useState } from "react"
import styles from "./Userinfo.module.css"
import ConfirmartionModal from "../../../../Components/ConfirmationModal/ConfirmationModal"
import { useNavigate } from "react-router-dom"
function Userinfo({id, nome, role}){
    const [isOpen, setIsOpen] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const [ConfirmationModal, setConfirmModal] = useState("")
    const navigate = useNavigate()
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

    function logOut(){
        setConfirmModal({
            content : "sair da sua conta?",
            text : "Sair",
            color1: "--green",
            color2: "--red",
            onConfirm : async() =>{
                setConfirmModal(null)
                localStorage.setItem("token", "")
                navigate('/Login')

            }
        })
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
                    <button className={styles.btnSair} onClick={logOut}>Sair <i className=""></i></button>
                </div>
            )}
            {ConfirmationModal && <ConfirmartionModal onClose={()=>setConfirmModal(null)} 
                    onConfirm={ConfirmationModal.onConfirm}
                    content={ConfirmationModal.content} 
                    color1={ConfirmationModal.color1} 
                    color2={ConfirmationModal.color2}   
                    text={ConfirmationModal.text}   />}
        </div>
    )
}
export default Userinfo