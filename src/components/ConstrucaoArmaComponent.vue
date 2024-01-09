<template>
  <div class="col-sm-7 col-md-7 col-lg-3">
    <SelectArma :set-arma-id="setArmaId" />
    <SelectMaterial :set-material-id="setMaterialId" />
    <SelectPropriedades
      :set-runa-potencia="setRunaPotencia"
      :runa-potencia="runaPotencia"
      :set-runa-impactante="setRunaImpactante"
      :runa-impactante="runaImpactante"
      :tamanho="tamanho"
      :set-tamanho="setTamanho"
    />
    <SelectRunas
      :runa-potencia="runaPotencia"
      :runas-pop="runasPop"
      :runas-id="runasId"
      :set-runas="setRunas"
    />
  </div>
</template>

<script setup lang="ts">
import type { RunaPotencia } from '@/entities/Utils/RunaPotencia'
import SelectArma from './SelectArma.vue'
import SelectMaterial from './SelectMaterial.vue'
import SelectPropriedades from './SelectPropriedades.vue'
import SelectRunas from './SelectRunas.vue'
import type { RunaImpactante } from '@/entities/Utils/RunaImpactante'
import type { Tamanho } from '@/entities/Utils/Tamanho'
defineProps<{
  setArmaId: (armaId: string) => void
  setMaterialId: (materialId: number) => void
  setRunaPotencia: (runaPotencia: RunaPotencia) => void
  runaPotencia: RunaPotencia
  setRunaImpactante: (RunaImpactante: RunaImpactante) => void
  runaImpactante: RunaImpactante
  setTamanho: (tamanho: Tamanho) => void
  tamanho: Tamanho
  runasPop: (runaId: number) => void
  runasId: () => number[]
  setRunas: (runasId: number[]) => void
}>()
</script>

<style scoped></style>
