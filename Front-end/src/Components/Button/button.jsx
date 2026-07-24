import styles from "./button.module.css"

function Button({text, color, onClick }){
    return (
        <>
        <button 
        className={styles.button}
        style={{backgroundColor : `var(${color})`}}
        onClick={onClick}
        >{text}</button>
        </>
    )
}
export default Button