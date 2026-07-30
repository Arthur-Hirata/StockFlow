import styles from "./SubTittle.module.css"

function SubTittle({text, color}){
    return(
        <div className={styles.containerSubTittle}>
            <span className={styles.subTittle}
                style={{color : `var(${color})`}}>{text}</span>
        </div>
    )
}
export default SubTittle