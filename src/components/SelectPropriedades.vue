<template>
  <div class="propriedades">
    <div class="d-flex justify-content-left p-2">
      <div class="tituloselecao">
        <h2>3º Escolha o tamanho:</h2>
      </div>
      <div class="btn-group">
        <button type="button" class="btn btn-secondary">{{ tamanho }}</button>
        <button
          type="button"
          class="btn btn-secondary dropdown-toggle dropdown-toggle-split"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span class="visually-hidden">Action</span>
        </button>
        <ul class="dropdown-menu">
          <li>
            <a class="dropdown-item" @click="setTamanho(Tamanho.MINUSCULO)">{{
              Tamanho.MINUSCULO
            }}</a>
          </li>
          <li>
            <a class="dropdown-item" @click="setTamanho(Tamanho.PEQUENO)">{{ Tamanho.PEQUENO }}</a>
          </li>
          <li>
            <a class="dropdown-item" @click="setTamanho(Tamanho.MEDIO)">{{ Tamanho.MEDIO }}</a>
          </li>
          <li>
            <a class="dropdown-item" @click="setTamanho(Tamanho.GRANDE)">{{ Tamanho.GRANDE }}</a>
          </li>
          <li>
            <a class="dropdown-item" @click="setTamanho(Tamanho.ENORME)">{{ Tamanho.ENORME }}</a>
          </li>
          <li>
            <a class="dropdown-item" @click="setTamanho(Tamanho.IMENSO)">{{ Tamanho.IMENSO }}</a>
          </li>
        </ul>
      </div>
      <ul class="listapropriedades"></ul>
    </div>
    <div class="d-flex justify-content-left p-2">
      <div class="tituloselecao">
        <h2>4º Escolha a Runa de Potencia:</h2>
      </div>
      <div class="btn-group">
        <button type="button" class="btn btn-secondary">{{ runaPotencia }}</button>
        <button
          type="button"
          class="btn btn-secondary dropdown-toggle dropdown-toggle-split"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span class="visually-hidden">Action</span>
        </button>
        <ul class="dropdown-menu">
          <li>
            <a class="dropdown-item" @click="setRunaPotencia(RunaPotencia.PADRAO)">{{
              RunaPotencia.PADRAO
            }}</a>
          </li>
          <li>
            <a class="dropdown-item" @click="setRunaPotencia(RunaPotencia.POTENCIA1)">{{
              RunaPotencia.POTENCIA1
            }}</a>
          </li>
          <li>
            <a class="dropdown-item" @click="setRunaPotencia(RunaPotencia.POTENCIA2)">{{
              RunaPotencia.POTENCIA2
            }}</a>
          </li>
          <li>
            <a class="dropdown-item" @click="setRunaPotencia(RunaPotencia.POTENCIA3)">{{
              RunaPotencia.POTENCIA3
            }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="d-flex justify-content-left p-2">
      <div class="tituloselecao">
        <h2>5º Escolha a Runa Impactante:</h2>
      </div>
      <div class="btn-group">
        <button type="button" class="btn btn-secondary">{{ runaImpactante }}</button>
        <button
          type="button"
          class="btn btn-secondary dropdown-toggle dropdown-toggle-split"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span class="visually-hidden">Action</span>
        </button>
        <ul class="dropdown-menu">
          <li>
            <a class="dropdown-item" @click="setRunaImpactante(RunaImpactante.PADRAO)">{{
              RunaImpactante.PADRAO
            }}</a>
          </li>
          <li>
            <a class="dropdown-item" @click="setRunaImpactante(RunaImpactante.IMPACTANTE)">{{
              RunaImpactante.IMPACTANTE
            }}</a>
          </li>
          <li>
            <a class="dropdown-item" @click="setRunaImpactante(RunaImpactante.IMPACTANTEMAIOR)">{{
              RunaImpactante.IMPACTANTEMAIOR
            }}</a>
          </li>
          <li>
            <a
              class="dropdown-item"
              @click="setRunaImpactante(RunaImpactante.IMPACTANTESUPERIOR)"
              >{{ RunaImpactante.IMPACTANTESUPERIOR }}</a
            >
          </li>
        </ul>
      </div>
    </div>
    <ul class="listapropriedades"></ul>
  </div>
</template>

<script setup lang="ts">
import { Tamanho } from '@/entities/Utils/Tamanho'
import { RunaPotencia } from '@/entities/Utils/RunaPotencia'
import { RunaImpactante } from '@/entities/Utils/RunaImpactante'

defineProps<{
  setRunaPotencia: (runaPotencia: RunaPotencia) => void
  runaPotencia: RunaPotencia
  setRunaImpactante: (runaImpactante: RunaImpactante) => void
  runaImpactante: RunaImpactante
  setTamanho: (tamanho: Tamanho) => void
  tamanho: Tamanho
}>()
</script>

<style scoped>
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

.listapropriedades {
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

.header > .precopropriedades {
  width: 25%;
  height: auto;
  margin-right: 1em;
}
.tituloselecao {
  min-width: 14em;
}
.elementopropriedades {
  display: block;
}

.elementopropriedades input {
  position: absolute;
  visibility: hidden;
}

.elementopropriedades label {
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

.elementopropriedades label > .nome {
  width: 62.5%;
  height: auto;
  padding: 0.4rem;
}

.elementopropriedades label > .efeito {
  width: 12.5%;
  height: auto;
  padding: 0.4rem;
}

.elementopropriedades label > .precopropriedades {
  width: 25%;
  height: auto;
  padding: 0.4rem;
  margin-right: 0.4rem;
}

.elementopropriedades input:checked ~ label {
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
.elementopropriedades span {
  padding-left: 0rem;
  padding-right: 0rem;
  height: 100%;
}
</style>
