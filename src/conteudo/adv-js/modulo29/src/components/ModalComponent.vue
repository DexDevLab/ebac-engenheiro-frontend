<script>
export default {
    data()
    {
        return {
            form: []
        }
    },
    methods: {
        close()
        {
            this.$emit('close')
        },
        submit()
        {
            this.$emit('submit', this.form)
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="modal-backdrop">
            <div class="modal">
                <header class="modal-header">
                    <div name="header">
                        <h1>Cadastrar Imóvel</h1>
                        <button type="button" class="btn-close" @click="close">X</button>
                    </div>
                </header>
                <section class="modal-body">
                    <div name="body">
                        <form @submit.prevent.stop="submit" class="form1">
                            <h3>Nome de exibição</h3>
                            <input type="text" placeholder="Casa ampla no centro da cidade" class="input-nome"
                                name="input-nome" v-model="form.nome" />
                            <div class="radiocontainer">
                                <h3>Tipo de Imóvel</h3>
                                <div class="radiolabel">
                                    <input type="radio" id="casa" name="imovel" value="casa" v-model="form.tipo">
                                    <label for="casa">Casa</label>
                                </div>
                                <div class="radiolabel">
                                    <input type="radio" id="apartamento" name="imovel" value="apartamento"
                                        v-model="form.tipo">
                                    <label for="apartamento">Apartamento</label>
                                </div>
                            </div>
                            <h3>Endereço</h3>
                            <input type="text" placeholder="Rua A, número 100" class="input-endereco" name="input-endereco"
                                v-model="form.endereco" />

                            <h3>CEP</h3>
                            <input type="text" placeholder="01002000" class="input-small" name="input-cep"
                                v-model="form.cep" />

                            <div class="radiocontainer">
                                <h3>Tipo de Oferta</h3>
                                <div class="radiolabel">
                                    <input type="radio" id="aluguel" name="oferta" value=true v-model="form.aluguel">
                                    <label for="aluguel">Aluguel</label>
                                </div>
                                <div class="radiolabel">
                                    <input type="radio" id="venda" name="oferta" value=false v-model="form.aluguel">
                                    <label for="venda">Venda</label>
                                </div>
                            </div>

                            <h3>Valor</h3>
                            <input type="number" placeholder="1000" class="input-small" name="input-valor"
                                v-model="form.valor" />
                            <div></div>
                            <button type="submit">Enviar</button>
                        </form>
                    </div>

                </section>

                <footer class="modal-footer">
                    <div name="footer">
                    </div>
                </footer>
            </div>

        </div>
    </div>
</template>


<style scoped>
.container {
    z-index: 99999;
    position: fixed;
    height: auto;
    width: 500px !important;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    background-size: 500% 500%;
    background-image: linear-gradient(145deg,
            rgba(153, 153, 153, 1) 0%,
            rgb(109, 109, 109) 25%,
            rgb(62, 63, 62) 50%,
            rgb(43, 42, 42) 85%);
    animation: AnimateBG 20s ease infinite;
}

.form1 {
    width: 100%;
    padding-top: 15px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 25px;
    color: rgb(255, 255, 255);
    /* background-color: green; */
}

header {
    width: 100%;
}

.modal-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
}

.modal-header>div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
}

.btn-close {
    height: fit-content;
    text-align: center;
    text-justify: auto;
    width: 25px;
    padding: 3px;
    border-radius: 5px;
    margin-left: auto;
    font-weight: bold;
    color: red;
}

.btn-close:hover {
    background-color: red;
    color: white;
    transition: 0.6s;
}

h1 {
    margin-left: auto;
    width: fit-content;
}

.form-label {
    display: flex;
    width: max-content;
    margin: auto;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
}

h3 {
    padding-bottom: 5px;
}

input[type=text],
input[type=number] {
    height: 30px;
    width: 100%;
    border-radius: 5px;
    margin-bottom: 10px;
}

.input-small {
    width: 18% !important;
}

.radiocontainer {
    display: flex;
    flex-direction: row;
    gap: 15px;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 10px;
}

.radiolabel {
    display: flex;
    flex-direction: row;
    gap: 8px;
}

button {
    width: 60px;
    height: 30px;
    border-radius: 10px;
    color: #00bd7e;
}

button:hover {
    background-color: rgba(2, 49, 20, 1);
    color: white;
    transition: 0.6s;
}

.button-list {
    width: 120px;
}
</style>