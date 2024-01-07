<template>
  <div class="body row d-flex flex-row-reverse justify-content-center">
    <ConstrucaoArmaComponent
      :set-arma-id="setArmaId"
      :set-material-id="setMaterialId"
      :set-runa-potencia="setRunaPotencia"
      :runa-potencia="runaPotencia"
      :set-runa-impactante="setRunaImpactante"
      :runa-impactante="runaImpactante"
      :set-tamanho="setTamanho"
      :tamanho="tamanho"
      :runasPop="runasPop"
      :runas-id="getRunas"
      :set-runas="setRunas"
    />
    <ArmaFinalComponent
      :arma-id="armaId"
      :runa-potencia="runaPotencia"
      :runa-impactante="runaImpactante"
      :runas-id="getRunas"
      :tamanho="tamanho"
      :material-id="materialId"
    />
  </div>
</template>

<script setup lang="ts">
import ArmaFinalComponent from '@/components/ArmaFinalComponent.vue'
import ConstrucaoArmaComponent from '@/components/ConstrucaoArmaComponent.vue'
import { RunaImpactante } from '@/entities/Utils/RunaImpactante'
import { RunaPotencia } from '@/entities/Utils/RunaPotencia'
import { Tamanho } from '@/entities/Utils/Tamanho'
import { ref, type Ref } from 'vue'

let armaId: Ref<number> = ref(-1)
let materialId: Ref<number> = ref(-1)
let runaPotencia: Ref<RunaPotencia> = ref(RunaPotencia.PADRAO)
let runaImpactante: Ref<RunaImpactante> = ref(RunaImpactante.PADRAO)
let tamanho: Ref<Tamanho> = ref(Tamanho.MEDIO)
let runasId: Ref<number[]> = ref([] as number[])

const getRunas = (): number[] => {
  return runasId.value
}

const setArmaId = (armaId_: number): void => {
  armaId.value = armaId_
}
const setMaterialId = (materialId_: number): void => {
  materialId.value = materialId_
}

const setRunaPotencia = (runaPotencia_: RunaPotencia): void => {
  runaPotencia.value = runaPotencia_
}

const setRunaImpactante = (runaImpactante_: RunaImpactante): void => {
  runaImpactante.value = runaImpactante_
}

const setTamanho = (tamanho_: Tamanho): void => {
  tamanho.value = tamanho_
}

const runasPop = (runaId: number): void => {
  runasId.value = runasId.value.filter((el) => el != runaId)
}

const setRunas = (runaId: number[]): void => {
  runasId.value = runaId
}
</script>

<style scoped>
.row {
  margin: 0;
  padding: 0;
}
.body > .col-xl-3 {
  padding: 0;
  margin: 1em;
  min-width: 40em;
}
.body > .col-xl-6 {
  padding: 0;
  margin: 1em;
  min-width: 40em;
}

.body > .col-xl-1 {
  padding: 0;
  margin: 0;
}

.body > .col-sm-7 {
  padding: 0;
  margin: 1em;
  min-width: 40em;
}
.body {
  background-color: #564e58;
}
</style>
