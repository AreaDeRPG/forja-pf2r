<template>
  <div class="propriedades">
    <div class="d-flex justify-content-left p-2">
      <div class="tituloselecao">
        <h2>6º Escolha as runas de propriedade:</h2>
      </div>
    </div>
    <div class="header">
      <span class="nome">Nome da Runa</span>
      <span class="level text-center">Nível</span>
      <span class="precopropriedades text-center">Preço</span>
    </div>
    <ul class="listarunas">
      <li class="elementoruna" v-for="runa in runas" :key="runa.id">
        <input :id="runa.nome" type="checkbox" :value="runa.id" :disabled="disabled(runa.id)" />
        <label :for="runa.nome" @click="checkrunas(runa.id)">
          <span class="nome">{{ runa.nome }}</span>
          <span class="level text-center">{{ runa.level }}</span>
          <span class="precopropriedades text-center">{{ runa.preco }} PO</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { runas } from '@/entities/Runas/index'
import { RunaPotencia } from '@/entities/Utils/RunaPotencia'
const props = defineProps<{
  runaPotencia: RunaPotencia
  runasId: () => number[]
  setRunas: (runasId: number[]) => void
}>()

const getRunaLimite = () => {
  switch (props.runaPotencia) {
    case RunaPotencia.POTENCIA1:
      return 1
    case RunaPotencia.POTENCIA2:
      return 2
    case RunaPotencia.POTENCIA3:
      return 3
    default:
      return 0
  }
}

const checkrunas = (runaId: number): void => {
  if (props.runasId().length > getRunaLimite()) {
    while (props.runasId().length > getRunaLimite()) props.runasId().pop()
    return
  }
  if (disabled(runaId)) return
  props.runasId().includes(runaId)
    ? props.setRunas(props.runasId().filter((el) => el != runaId))
    : props.runasId().push(runaId)
}

const disabled = (runaId: number) => {
  if (props.runasId().find((el) => el == runaId)) return false
  return props.runasId().length >= getRunaLimite()
}
</script>

<style scoped>
.elementoruna input:disabled ~ label {
  color: #bbb !important;
}
.propriedades {
  min-width: 40em;
  height: auto;
  font-size: 0.9rem;
  margin-bottom: 0;
  background-color: #a69a8b;
  background-color: rgba(255, 255, 255, 0.8);
  box-sizing: content-box;
  font-family: sans-serif;
}
.propriedades h2 {
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: 900;
  color: #3c353e;
  position: relative;
}

.propriedades > .row {
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

.listarunas {
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
  width: 75%;
  height: auto;
}

.header > .level {
  width: 12.5%;
  height: auto;
}

.header > .precopropriedades {
  width: 25%;
  height: auto;
  margin-right: 1em;
}

.tituloselecao {
  min-width: 22em;
}
.elementoruna {
  display: block;
}

.elementoruna input {
  position: absolute;
  visibility: hidden;
}

.elementoruna label {
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

.elementoruna label > .nome {
  width: 75%;
  height: auto;
  padding: 0.4rem;
}

.elementoruna label > .level {
  width: 12.5%;
  height: auto;
  padding: 0.4rem;
}

.elementoruna label > .precopropriedades {
  width: 25%;
  height: auto;
  padding: 0.4rem;
  margin-right: 0.4rem;
}

.elementoruna input:checked ~ label {
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
.elementoruna span {
  padding-left: 0rem;
  padding-right: 0rem;
  height: 100%;
}
</style>
