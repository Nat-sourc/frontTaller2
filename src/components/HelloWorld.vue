<template>
  <div class="p-3" style="max-width: 400px; margin: 50px auto; background: #234">
      <!--Resultado -->
   <div class="w-full rounded m-1 p-3 text-right lead font-weight-bold text-white bg-vue-dark">
      {{ calculatorValue || 0 }}
    </div>
     <!-- Botones-->
     <div class="row no-gutters">
      <div class="col-3" v-for="n in calculatorElements" :key="n">
        <div class="lead text-white text-center m-1 py-3 bg-vue-dark rounded hover-class"
          :class="{'bg-vue-green': ['C','-','.','+','%','='].includes(n)}"
          @click="action(n)"
        >
          {{n}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
  ,

  data() {
      return {
        calculatorValue: '',
        calculatorElements: ['C','-','+','.',0,1,2,3,4,5,6,7,8,9,'%','=',],
        operator: null,
        previousCalculatorValue: '',
        url:null,
        datos:null,
        dato:{
          id: null,
          sumando1: null,
          sumando2: null,
          resultado: null
        },
        datosResta: {
          minuendo: 0,
          sustraendo: 0,
          diferencia: 0
        }
      }
      
  },
  methods: {
    action(n){
      /* Append value */
      if(!isNaN(n) || n === '.'){
        this.calculatorValue += n + '';
      }
      /* Clear value */
      if(n === 'C'){
        this.calculatorValue = '';
      }
      /* Operators */
      if(['+'].includes(n)){
        this.operator = n;
        this.previousCalculatorValue = this.calculatorValue;
        this.dato.sumando1=this.previousCalculatorValue;
        this.calculatorValue = '';
      }
      if(['-'].includes(n)){
        this.operator = n;
        this.previousCalculatorValue = this.calculatorValue;
        this.datosResta.minuendo=this.previousCalculatorValue;
        this.calculatorValue = '';
      }
      /* Calculate result using the eval function */
      if(n === '='){
       
        if(this.operator=="+"){
         
          this.dato.sumando2=this.calculatorValue;
          
          this.sumar();
        }
        if(this.operator=="-"){
         
         this.datosResta.sustraendo=this.calculatorValue;
         
         this.enviarDatosResta();
       }
        
        
        this.previousCalculatorValue = '';
        this.operator = null;
      }
    },
    sumar() {
      var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "idSuma": 0,
          "sumando1": this.dato.sumando1,
          "sumando2": this.dato.sumando2,
          "resultado": 0
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("https://localhost:7145/api/Suma/Sumar", requestOptions)
        .then(response => response.json())
        .then(result => {
          // Aquí se guarda el resultado en la propiedad 'resultado' del objeto 'datos'
          this.calculatorValue= result.objectResponse.resultado;
          
        })
        .catch(error => console.log('error', error));
     

    },
    enviarDatosResta(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "idResta": 0,
          "sustraendo": this.datosResta.sustraendo,
          "miniendo":  this.datosResta.minuendo,
          "diferencia": 0
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("https://localhost:7146/api/Resta/Restar", requestOptions)
        .then(response => response.json())
        .then(result => {
          // Aquí se guarda el resultado en la propiedad 'resultado' del objeto 'datos'
          console.log(result)
          this.calculatorValue = result.objectResponse.diferencia;
        })
        .catch(error => console.log('error', error));

      }
  }
    
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .bg-vue-dark {
      background: #a657b8;
    }
    .hover-class:hover {
      cursor: pointer;
      background: #a0a5aa;
    }
    .bg-vue-green {
      background: #2fedba;
    }

</style>
