import styles from "./Section-tittle.module.css"

function SectionTittle({text}){
    return(
        <div className={styles.containerTittle}>
            <h1 className={styles.tittle}>{text}</h1>

        </div>
    )
}
export default SectionTittle