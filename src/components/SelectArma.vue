<template>
  <div class="armas">
    <div class="d-flex justify-content-between p-2">
      <div class="tituloselecao">
        <h2>1º Escolha sua arma:</h2>
      </div>
      <div class="w-20">
        <input
          type="text"
          id="caixaDeBuscaArmas"
          name="caixaDeBuscaArmas"
          class="form-control"
          placeholder="Pesquisa Rápida..."
        />
      </div>
    </div>
    <div class="header">
      <span class="nome">Nome da Arma</span>
      <span class="dano text-center">Dano</span>
      <span class="distancia text-center">Distância</span>
      <span class="precoArma text-center">Preço</span>
    </div>
    <ul class="listaarmas">
      <li class="elementoarma">
        <span class="divisao">• Armas Simples •</span>
      </li>
      <li class="elementoarma" v-for="arma in getArmasSimples" :key="arma.id">
        <input
          :id="arma.id"
          type="radio"
          name="weapon"
          :value="arma.id"
          @click="setArmaId(arma.id)"
        />
        <label :for="arma.id">
          <span class="nome">{{ getNome(arma.nome) }}</span>
          <span class="dano text-center">{{ arma.dano }} {{ arma.tipoDano }}</span>
          <span class="distancia text-center">{{ arma.distancia }}</span>
          <span class="precoArma text-center">{{ getMoeda(arma.preco) }}</span>
        </label>
      </li>
      <li class="elementoarma">
        <span class="divisao">• Armas Marciais •</span>
      </li>
      <li class="elementoarma" v-for="arma in getArmasMarciais" :key="arma.id">
        <input
          :id="arma.id"
          type="radio"
          name="weapon"
          :value="arma.id"
          @click="setArmaId(arma.id)"
        />
        <label :for="arma.id">
          <span class="nome">{{ getNome(arma.nome) }}</span>
          <span class="dano text-center">{{ arma.dano }} {{ arma.tipoDano }}</span>
          <span class="distancia text-center">{{ arma.distancia }}</span>
          <span class="precoArma text-center">{{ getMoeda(arma.preco) }}</span>
        </label>
      </li>
      <li class="elementoarma">
        <span class="divisao">• Armas Avançadas •</span>
      </li>
      <li class="elementoarma" v-for="arma in getArmasAvancadas" :key="arma.id">
        <input
          :id="arma.id"
          type="radio"
          name="weapon"
          :value="arma.id"
          @click="setArmaId(arma.id)"
        />
        <label :for="arma.id">
          <span class="nome">{{ getNome(arma.nome) }}</span>
          <span class="dano text-center">{{ arma.dano }} {{ arma.tipoDano }}</span>
          <span class="distancia text-center">{{ arma.distancia }}</span>
          <span class="precoArma text-center">{{ getMoeda(arma.preco) }}</span>
        </label>
      </li>
      <li class="elementoarma">
        <span class="divisao">• Armas Especificas •</span>
      </li>
      <li class="elementoarma" v-for="arma in [] as Arma[]" :key="arma.id">
        <input
          :id="arma.nome"
          type="radio"
          name="weapon"
          :value="arma.id"
          @click="setArmaId(arma.id)"
        />
        <label :for="arma.nome">
          <span class="nome">{{ arma.nome }}</span>
          <span class="dano text-center">{{ arma.dano }} {{ arma.tipoDano }}</span>
          <span class="distancia text-center">{{ arma.distancia }}</span>
          <span class="precoArma text-center">{{ getMoeda(arma.preco) }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  setArmaId: (armaid: string) => void
}>()
import { armasBase } from '@/entities/Arma'
import type Arma from '@/entities/Arma/model/Arma'
import { Categoria } from '@/entities/Arma/model/Categoria'
import { computed } from 'vue'

const armas = await armasBase
const getArmasSimples = computed(() => {
  return []
  return armas
    .filter((el) => el.categoria == Categoria.Simples)
    .sort((a, b) => a.nome.localeCompare(b.nome))
})
const getArmasMarciais = computed(() => {
  return armas
    .filter((el) => el.categoria == Categoria.Marcial)
    .sort((a, b) => a.nome.localeCompare(b.nome))
})

const getArmasAvancadas = computed(() => {
  return armas
    .filter((el) => el.categoria == Categoria.Avancada)
    .sort((a, b) => a.nome.localeCompare(b.nome))
})

const getMoeda = (moedas: number): string => {
  const pc = moedas % 10
  const pp = Math.floor(moedas / 10) % 10
  const po = Math.floor(moedas / 100)

  const moedas_ =
    (po == 0 ? '' : po + ' PO ') + (pp == 0 ? '' : pp + ' PP ') + (pc == 0 ? '' : pc + ' PC')
  return moedas_ == '' ? '-' : moedas_
}

const getNome = (nome: string): string => {
  //console.log(nome.split('>')[1].split('<')[0]);
  if (!nome.split('>')[1]) return nome.split('>')[1]
  return nome.split('>')[1].split('<')[0]
}
</script>

<style scoped>
.armas {
  min-width: 40em;
  height: auto;
  font-size: 0.9rem;
  margin-bottom: 0;
  background-color: #a69a8b;
  background-color: rgba(255, 255, 255, 0.8);
  box-sizing: content-box;
  font-family: sans-serif;
}
.armas h2 {
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: 900;
  color: #3c353e;
  position: relative;
}

.armas > .row {
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

.listaarmas {
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

.header > .dano {
  width: 12.5%;
  height: auto;
}

.header > .distancia {
  width: 12.5%;
  height: auto;
}
.header > .precoArma {
  width: 12.5%;
  height: auto;
  margin-right: 1em;
}
.tituloselecao {
  min-width: 13em;
}
.elementoarma {
  display: block;
}

.elementoarma input {
  position: absolute;
  visibility: hidden;
}

.elementoarma label {
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

.elementoarma label > .nome {
  width: 62.5%;
  height: auto;
  padding: 0.4rem;
}

.elementoarma label > .dano {
  width: 12.5%;
  height: auto;
  padding: 0.4rem;
}

.elementoarma label > .distancia {
  width: 12.5%;
  height: auto;
  padding: 0.4rem;
}
.elementoarma label > .precoArma {
  width: 12.5%;
  height: auto;
  padding: 0.4rem;
  margin-right: 0.4rem;
}

.elementoarma input:checked ~ label {
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
.elementoarma span {
  padding-left: 0rem;
  padding-right: 0rem;
  height: 100%;
}
</style>
