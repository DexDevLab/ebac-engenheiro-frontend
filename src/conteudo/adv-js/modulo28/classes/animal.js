class Animal {

    constructor(especie){
        this.especie = especie
    }

    getSom(){
        console.log(this.especie + ' fala ')
    }

    getComida(){
        console.log(this.especie + ' come ')
    }

    getColetivo(){
        console.log(this.especie + ' dorme ')
    }

}

module.exports = Animal;