<template>
  <div class="materiais">
    <div class="d-flex justify-content-between p-2">
      <div class="tituloselecao">
        <h2>2º Escolha o material:</h2>
      </div>
    </div>
    <div class="header">
      <span class="nome">Material</span>
      <span class="efeito text-center">Nível</span>
      <span class="precomaterial text-center">Preço</span>
    </div>
    <ul class="listamaterials">
      <li class="elementomaterial">
        <input id="padrao" type="radio" name="material" value="-1" @click="setMaterialId(-1)" />
        <label for="padrao">
          <span class="nome">Padrão</span>
          <span class="efeito text-center"> - </span>
          <span class="precomaterial text-center">-</span>
        </label>
      </li>
      <li class="elementomaterial" v-for="material in materiais" :key="material.id">
        <input
          :id="material.nome"
          type="radio"
          name="material"
          :value="material.id"
          @click="setMaterialId(material.id)"
        />
        <label :for="material.nome">
          <span class="nome">{{ material.nome }} </span>
          <span class="efeito text-center"> {{ material.level }} </span>
          <span class="precomaterial text-center">
            {{ getMoeda(material.precoBase) }} + {{ getMoeda(material.precoVolume) }} PO/Volume
          </span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  setMaterialId: (materialId: number) => void
}>()
import { materiais } from '@/entities/Material'

const getMoeda = (moedas: number): string => {
  const pc = moedas % 10
  const pp = Math.floor(moedas / 10) % 10
  const po = Math.floor(moedas / 100)

  const moedas_ =
    (po == 0 ? '' : po + ' PO ') + (pp == 0 ? '' : pp + ' PP ') + (pc == 0 ? '' : pc + ' PC')
  return moedas_ == '' ? '-' : moedas_
}
</script>

<style scoped>
.materiais {
  min-width: 40em;
  height: auto;
  font-size: 0.9rem;
  margin-bottom: 0;
  background-color: #a69a8b;
  background-color: rgba(255, 255, 255, 0.8);
  box-sizing: content-box;
  font-family: sans-serif;
}
.materiais h2 {
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: 900;
  color: #3c353e;
  position: relative;
}

.materiais > .row {
  padding-top: 1em;
}

.header {
  min-width: 34rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 0;
  height: auto;
  color: #fff;
  padding: 0.4rem;
  position: relative;
  box-sizing: border-box;
  background-color: #3c353e;
  display: flex;
}

.listamaterials {
  min-width: 34rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  position: relative;
  margin-top: 0;
  max-height: 12rem;
  height: auto;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0rem;
}

.header span {
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  height: 100%;
  border-right: dotted gray 1px;
  font-weight: 700;
}
.header > .nome {
  width: 62.5%;
  height: auto;
}

.header > .efeito {
  width: 12.5%;
  height: auto;
}

.header > .precomaterial {
  width: 25%;
  height: auto;
  margin-right: 1em;
}
.tituloselecao {
  min-width: 13em;
}
.elementomaterial {
  display: block;
}

.elementomaterial input {
  position: absolute;
  visibility: hidden;
}

.elementomaterial label {
  width: 32rem;
  width: 100%;
  display: flex;
  text-align: justify;
  color: #3c454c;
  align-items: center;
  cursor: pointer;
  background-color: #f2f4f3;
  border-bottom: solid 1px gray;
}

.elementomaterial label > .nome {
  width: 62.5%;
  height: auto;
  padding: 0.4rem;
}

.elementomaterial label > .efeito {
  width: 12.5%;
  height: auto;
  padding: 0.4rem;
}

.elementomaterial label > .precomaterial {
  width: 25%;
  height: auto;
  padding: 0.4rem;
  margin-right: 0.4rem;
}

.elementomaterial input:checked ~ label {
  color: #fff !important;
  background-color: #904e55;
}
.divisao {
  padding: 0.4rem;
  margin-left: 0.6rem;
  width: 32rem;
  color: #3c353e;
  color: #6a686b;
  display: flex;
  font-weight: 700;
  width: 100%;
  align-items: center;
}
.elementomaterial span {
  padding-left: 0rem;
  padding-right: 0rem;
  height: 100%;
}
</style>
