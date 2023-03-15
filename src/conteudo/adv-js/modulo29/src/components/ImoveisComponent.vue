<script>
import ModalComponent from "./ModalComponent.vue";
export default {
    name: 'ImoveisComponent',
    components: {
        ModalComponent
    },
    data()
    {
        return {
            isModalVisible: false,
            imoveis: [
                {
                    nome: "Casa A",
                    tipo: "casa",
                    endereco: "Rua A, número 1",
                    cep: "01025-000",
                    aluguel: true,
                    valor: 1000
                },
                {
                    nome: "Casa B",
                    tipo: "apartamento",
                    endereco: "Rua B, número 100",
                    cep: "01325-001",
                    aluguel: false,
                    valor: 300000
                },
                {
                    nome: "Apartamento A",
                    tipo: "apartamento",
                    endereco: "Rua X, número 350, apto 800",
                    cep: "01025-000",
                    aluguel: false,
                    valor: 150000
                }
            ]
        }
    }, methods: {
        showModal()
        {
            this.isModalVisible = true
        },
        closeModal()
        {
            this.isModalVisible = false
        },
        removeItem(idx)
        {
            this.imoveis.splice(idx, 1)
        },
        getData(form)
        {
            let { nome, tipo, endereco, cep, aluguel, valor } = form;
            aluguel = aluguel === 'true'

            // // VALIDAÇÕES BÁSICAS DOS CAMPOS

            if ((this.imoveis.filter((item) => item.nome === nome)).length > 0)
            {
                return alert('Este imóvel já foi encontrado no sistema. Por favor, revise as informações e tente novamente.');
            }
            else if ((!(cep.match(/[0-9]/))) || (cep.toString().length !== 8))
            {
                return alert('O CEP digitado está incorreto. Por favor, revise as informações e tente novamente.');
            }
            else if (typeof valor !== "number")
            {
                return alert('O valor da oferta está incorreto. Por favor, revise as informações e tente novamente.');
            }
            else if ((typeof nome || typeof tipo || typeof endereco) !== "string")
            {
                return alert('Os dados do formulário estão incorretos. Por favor, revise as informações e tente novamente.');
            }
            else if ((typeof aluguel) != "boolean")
            {
                return alert('O tipo de oferta é incorreta. Por favor, revise as informações e tente novamente.');
            }

            // // FORMATANDO CEP

            cep = cep.toString().substring(0, 5) + "-" + cep.toString().substring(5, cep.toString().length)

            this.imoveis = [
                ...this.imoveis,
                { nome, tipo, endereco, cep, aluguel, valor },
            ]

            this.isModalVisible = false;

        },
        getAluguelLabel(aluguel)
        {
            return aluguel ? "Aluguel de" : "Venda de"
        },
        getValorLabel(valor)
        {
            return `R$ ${valor},00`
        }
    }
}

</script>

<template>
    <div class="container">
        <div class="container-main">
            <h1>Lista de Imóveis</h1>
            <ul>
                <li v-for="(imovel, idx) in imoveis" v-bind:key="imovel.nome">
                    <div class="container-imovel">
                        <h2>{{ getAluguelLabel(imovel.aluguel) + " " + imovel.tipo + " " + imovel.nome }}</h2><button class="button-remove" @click="removeItem(idx)">Remover</button>
                    </div>
                    <div class="container-imovel">
                        <h4>{{ imovel.endereco + " CEP " + imovel.cep }}</h4>
                    </div>
                    <div class="container-imovel">
                        <h2>{{ getValorLabel(imovel.valor) }}</h2>
                    </div>
                </li>
            </ul>
            <button class="button-list" @click="showModal">Cadastrar Imóvel</button>
        </div>
        <ModalComponent v-show="isModalVisible" @submit="getData" @close="closeModal" />
    </div>
</template>


<style scoped>
.container {
    height: auto;
    width: 100%;
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

.container-imovel{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}

.container-main {
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: fit-content;
}

ul {
    padding: 10px 20px;
}

h1 {
    width: fit-content;
    margin: auto;
    padding-bottom: 0px;
}

h3 {
    padding-bottom: 5px;
}

button {
    width: 80px;
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

.button-remove {
    width: 70px;
    height: 25px;
    margin-top: 4px;
    margin-left: 10px;
}
</style>