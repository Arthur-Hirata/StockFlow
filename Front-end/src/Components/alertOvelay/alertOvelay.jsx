import styles from "./alertOverlay.module.css"

function AlertOverlay({text, color} ){
    return(
        <div className={styles.containerAlert}
        style={{backgroundColor : `var(${color})`}}
        >
            <span className={styles.alertText}>{text}</span>
        </div>
    )
}
export default AlertOverlay