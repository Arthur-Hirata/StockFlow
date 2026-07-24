import styles from "./Cadastros.module.css"
import SectionTittle from "../../../../Components/Section-Tittle/Section-tittle"
import Button from "../../../../Components/Button/button"
function Cadastros(){
    function onAdicionar(){
        alert("adcicionar")
    }
    function onRemover(){
        alert("remover")
    }
    function onEditar(){
        alert("editar")
    }
    return(
        <section>
            <SectionTittle text={"Cadastros"} />
            <div className={styles.containerCadastro}>
                <div className={styles.cardCadastro}>
                    <span className={styles.cardTittle}>Adicionar Produtos</span>
                    <div className={styles.userAction}>
                        <span className={styles.inputRequest}>Nome do produto</span>
                        <input type="text" placeholder="Nome produto"/>
                        <span className={styles.inputRequest}>Preço de venda</span>
                        <input type="text"  placeholder="Preço de venda"/>
                        <span className={styles.inputRequest}>Quantidade Mínima no estoque</span>
                        <input type="text" placeholder="Quantidade Mínima estoque" />
                        <span className={styles.inputRequest}>Imagem do produto</span>
                        <input type="text" placeholder="Url da imagem" />
                    </div>
                    <Button 
                        text="Adicionar"
                        onClick={onAdicionar}
                        color="--green"
                    />
                </div>
                <div className={styles.cardCadastro}>
                    <span className={styles.cardTittle}>Remover Produtos</span>
                    <div className={styles.userAction}>
                        <span className={styles.inputRequest}>ID do produto</span>
                        <input type="text" placeholder="ID produto"/>
                        <span className={styles.inputRequest}>Confirme ID do produto</span>
                        <input type="text" placeholder="ID produto"/>
                        <span className={styles.inputRequest}>Motivo da remoção</span>
                        <input type="text" placeholder="Motivo da remoção"/>
                    </div>
                    <Button
                        text="Remover"
                        onClick={onRemover}
                        color="--red"
                    />



                </div>
                <div className={styles.cardCadastro}>
                    <span className={styles.cardTittle}>Editar Produto</span>
                    <div className={styles.userAction}>
                        <span className={styles.inputRequest}>ID do Produto</span>
                        <input type="text" placeholder="ID produto"/>
                        <span className={styles.inputRequest}>Confirme ID do produto</span>
                        <input type="text" placeholder="ID produto"/>
                        <span className={styles.inputRequest}>Edição</span>
                        <input type="text" placeholder="Digite a edição" />
                    <select name="" className={styles.select}>
                        <option value="none" disabled selected hidden>Selecione</option>
                        <option value="name">Nome do produto</option>
                        <option value="price">Preço do produto</option>
                        <option value="image">Imagem do produto</option>
                        <option value="low_amount">Quantidade mínima do produto</option>
                    </select>
                    </div>
                    <Button 
                        text="Editar"
                        onClick={onEditar}
                        color="--alert"
                    />
                </div>
            </div>

        </section>
    )
}
export default Cadastros