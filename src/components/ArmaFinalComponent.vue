<template>
  <div class="col-sm-7 col-md-7 col-lg-3">
    <ul class="final">
      <li class="nomearma">{{ getNomeArma() }}</li>
      <li class="grupoarma">{{ getGrupoArma() }}</li>
      <li class="descricaoarma">{{ getDescricaoArma() }}</li>
      <li class="descricaoarma2" v-for="(traco, index) in getArma()?.tracos" :key="index">
        <span
          ><b class="font-weight-bold text-nowrap">{{ traco }}</b
          >: {{ getDescricaoTraco(traco) }}</span
        >
      </li>
      <li class="descricaoarma2" v-for="(runa, index) in getRunas()" :key="index">
        <span
          ><b class="font-weight-bold text-nowrap">{{ runa.nome }}</b
          >: <span v-html="runa.descricao"></span
        ></span>
      </li>
      <li class="estatistica">
        <span class="estatisticaleft"> Bônus de Item: </span>
        <span class="estatisticaright d-flex align-items-center"> {{ getBonusAtaque() }} </span>
      </li>
      <li class="estatistica">
        <span class="estatisticaleft"> Dano: </span>
        <span class="estatisticaright d-flex align-items-center">
          {{ getDano() }}
          <Axe v-if="getDanoTipo() == TipoDano.Cortante" />
          <bowArrow v-if="getDanoTipo() == TipoDano.Perfurante" />
          <hammer v-if="getDanoTipo() == TipoDano.Contundente" />
          <span v-for="runa in getRunas()" :key="runa.id">
            <span v-if="runa.bonusDano && armaId != -1">
              +{{ getDanoRuna(runa) }}
              <fire v-if="getTipoDanoRuna(runa) == TipoDano.Fogo"></fire>
            </span>
          </span>
        </span>
      </li>
      <li class="estatistica">
        <span class="estatisticaleft"> Crítico: </span>
        <span class="estatisticaright d-flex align-items-center">
          <!--          {{ getCritico() }}-->
          <span class="estatisticaright d-flex align-items-center">
            ({{ getCritico() }}
            <Axe v-if="getDanoTipo() == TipoDano.Cortante" />
            <bowArrow v-if="getDanoTipo() == TipoDano.Perfurante" />
            <hammer v-if="getDanoTipo() == TipoDano.Contundente" />
            <span v-for="runa in getRunas()" :key="runa.id">
              <span v-if="runa.bonusDano && armaId != -1">
                +{{ getDanoRuna(runa) }}
                <fire v-if="getTipoDanoRuna(runa) == TipoDano.Fogo"></fire>
              </span>
            </span>
            )*2{{ getMortalFatal() }}
            <span v-if="getMortalFatal() != ''">
              <Axe v-if="getDanoTipo() == TipoDano.Cortante" />
              <bowArrow v-if="getDanoTipo() == TipoDano.Perfurante" />
              <hammer v-if="getDanoTipo() == TipoDano.Contundente" />
            </span>
          </span>
        </span>
      </li>
      <li class="estatistica">
        <span class="estatisticaleft"> Alcance: </span>
        <span class="estatisticaright d-flex align-items-center"> {{ getAlcance() }} </span>
      </li>
      <li class="estatistica">
        <span class="estatisticaleft"> Categoria: </span>
        <span class="estatisticaright d-flex align-items-center"> {{ getCategoria() }}</span>
      </li>
      <li class="estatistica">
        <span class="estatisticaleft"> Nível: </span>
        <span class="preco"> {{ calcularNivel() }} </span>
      </li>
      <li class="estatistica">
        <span class="estatisticaleft"> Volume: </span>
        <span class="preco"> {{ calcularVolume() }} </span>
      </li>
      <li class="estatistica">
        <span class="estatisticaleft"> Preço: </span>
        <span class="preco"> {{ getMoeda(calcularPreco()) }} </span>
      </li>
      <li class="manufatura">Manufatura</li>
      <li class="estatistica">
        <span class="estatisticaleft"> Níveis de Personagem: </span>
        <select class="form-select form-select-sm" aria-label=".form-select-sm" v-model="level">
          <option v-for="i in 20" :key="i" :value="i" @select="selectLevel(i)">{{ i }}</option>
        </select>
      </li>
      <li class="estatistica">
        <span class="estatisticaleft"> Proficiência: </span>
        <select
          class="form-select form-select-sm"
          aria-label=".form-select-sm"
          v-model="proficiencia"
        >
          <option @select="mudarProficiencia(Proficiencia.Treinado)">Treinado</option>
          <option @select="mudarProficiencia(Proficiencia.Especialista)">Especialista</option>
          <option @select="mudarProficiencia(Proficiencia.Mestre)">Mestre</option>
          <option @select="mudarProficiencia(Proficiencia.Lendario)">Lendário</option>
        </select>
      </li>
      <li class="estatistica">
        <span class="estatisticaleft"> Possui Fórmula? </span>
        <span class="estatisticaright d-flex align-items-center">
          <input
            class="form-check-input"
            type="checkbox"
            id="flexCheckDefault"
            v-model="formula"
            @click="checkData()"
          />
        </span>
      </li>
      <li class="estatistica">
        <span class="estatisticaleft"> Dias manufaturando: </span>
        <span class="estatisticaright d-flex align-items-center">
          <label for="diasRange" class="d-flex align-items-center">Dias: {{ dias }}</label>
          <input
            type="range"
            class="form-range"
            :min="diasMin()"
            :max="diasMax() + diasMin()"
            id="diasRange"
            v-model="dias"
          />
        </span>
      </li>
      <li class="estatistica">
        <span class="estatisticaleft"> Custo Inicial: </span>
        <span class="preco"> {{ getMoeda(calcularPreco() / 2) }} </span>
      </li>
      <li class="estatistica">
        <span class="estatisticaleft"> Custo Final: </span>
        <span class="preco"> {{ getMoeda(custoFinal()) }} </span>
      </li>
      <li class="estatistica">
        <span class="estatisticaleft"> CD para Manufaturar: </span>
        <span class="preco"> {{ getArma() ? calcularCD() : '' }} </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { armasBase } from '@/entities/Arma'
import type Arma from '@/entities/Arma/model/Arma'
import { TipoDano } from '@/entities/Arma/model/TipoDano'
import { Traco, TracoDescricao } from '@/entities/Arma/model/Traco'
import { RunaImpactante } from '@/entities/Utils/RunaImpactante'
import { RunaPotencia } from '@/entities/Utils/RunaPotencia'
import Axe from '@/icons/Axe.vue'
import bowArrow from '@/icons/bow-arrow.vue'
import hammer from '@/icons/hammer.vue'
import fire from '@/icons/fire.vue'
import { runas } from '@/entities/Runas/index'
import type Runa from '@/entities/Runas/model/Runa'
import { Tamanho } from '@/entities/Utils/Tamanho'
import { materiais } from '@/entities/Material'
import type Material from '@/entities/Material/model/Material'
import { ref } from 'vue'
import { Proficiencia } from '@/entities/Utils/Proficiencia'
import { Raridade } from '@/entities/Utils/Raridade'
import { Tipo } from '@/entities/Arma/model/Tipo'
const props = defineProps<{
  armaId: number
  runaPotencia: RunaPotencia
  runaImpactante: RunaImpactante
  runasId: () => number[]
  tamanho: Tamanho
  materialId: number
}>()
const proventosTreinado = [
  20, 30, 50, 70, 90, 150, 200, 250, 300, 400, 500, 600, 700, 800, 1000, 1300, 1500, 2000, 3000,
  4000, 5000
]
const proventosEspecialista = [
  20, 30, 50, 80, 100, 200, 250, 300, 400, 500, 600, 800, 1000, 1500, 2000, 2500, 3000, 4500, 6000,
  7500, 9000
]
const proventosMestre = [
  20, 30, 50, 80, 100, 200, 250, 300, 400, 600, 800, 1000, 1500, 2000, 2800, 3600, 4500, 7000,
  10000, 15000, 17500
]
const proventosLendario = [
  20, 30, 50, 80, 100, 200, 250, 300, 400, 600, 800, 1000, 1500, 2000, 2800, 4000, 5500, 9000,
  13000, 20000, 30000
]

const checkData = (): void => {
  console.log('here')
  if (dias.value < 2 && !formula.value) {
    dias.value = 2
  } else if (dias.value > 2 + diasMax() && !formula.value) {
    dias.value = 2 + diasMax()
  }
}

const getArma = (): Arma | undefined => {
  return armasBase.find((el) => el.id == props.armaId)
}

const getMaterial = (): Material | undefined => {
  return materiais.find((el) => el.id == props.materialId)
}

const getRunas = (): Runa[] => {
  return runas.filter((el) => props.runasId().includes(el.id))
}

const getNomeArma = (): string => {
  return getArma()?.nome ?? '--nome arma--'
}

const getGrupoArma = (): string => {
  return getArma()?.grupo ?? '--grupo arma--'
}

const getDescricaoArma = (): string => {
  return getArma()?.descricao ?? '--descricao--'
}

const getBonusAtaque = (): string => {
  switch (props.runaPotencia) {
    case RunaPotencia.POTENCIA1:
      return '+1'
    case RunaPotencia.POTENCIA2:
      return '+2'
    case RunaPotencia.POTENCIA3:
      return '+3'
    default:
      return 'Nenhum'
  }
}

const getDano = (): string => {
  const arma = getArma()
  if (!arma) return 'Nenhum'
  switch (props.runaImpactante) {
    case RunaImpactante.PADRAO:
      return '1' + arma.dano
    case RunaImpactante.IMPACTANTE:
      return '2' + arma.dano
    case RunaImpactante.IMPACTANTEMAIOR:
      return '3' + arma.dano
    case RunaImpactante.IMPACTANTESUPERIOR:
      return '4' + arma.dano
  }
}

const getDanoRuna = (runa: Runa): string => {
  return '1' + runa.bonusDano
}

const getTipoDanoRuna = (runa: Runa): string => {
  return runa.tipoDano
}

const getDanoTipo = (): string => {
  const arma = getArma()
  if (!arma) return ''
  return arma.tipoDano
}

const getCritico = (): string => {
  const arma = getArma()
  if (!arma) return 'Nenhum'
  //if(!arma.tracos.includes(Traco.FatalD10)){
  return getDano()
  //}
}

const getMortalFatal = (): string => {
  const arma = getArma()
  if (!arma) return ''
  const tracos = [Traco.MortalD10, Traco.FatalD10] as Traco[]
  if (tracos.filter((el) => arma.tracos.includes(el))[0]) {
    switch (tracos[0]) {
      case Traco.MortalD10:
        if (props.runaImpactante == RunaImpactante.IMPACTANTEMAIOR) return '+2d10'
        else if (props.runaImpactante == RunaImpactante.IMPACTANTESUPERIOR) return '+3d10'
        return '+1d10'
      case Traco.FatalD10:
        if (props.runaImpactante == RunaImpactante.IMPACTANTEMAIOR) return '+2d10'
        else if (props.runaImpactante == RunaImpactante.IMPACTANTESUPERIOR) return '+3d10'
        return '+1d10'
    }
  }
  return ''
}

const getAlcance = (): string => {
  const arma = getArma()
  if (!arma) return 'Nenhum'
  if(arma.tipo === Tipo.CAC) return arma.tracos.find((el) => el === Traco.Alcance) ? '3m' : '1.5m'
  return arma.distancia
}

const getCategoria = (): string => {
  const arma = getArma()
  if (!arma) return 'Nenhum'
  return arma.categoria
}

const getMoeda = (moedas: number): string => {
  const pc = moedas % 10
  const pp = Math.floor(moedas / 10) % 10
  const po = Math.floor(moedas / 100)

  const moedas_ =
    (po == 0 ? '' : po + ' PO ') + (pp == 0 ? '' : pp + ' PP ') + (pc == 0 ? '' : pc + ' PC')
  return moedas_ == '' ? '-' : moedas_
}

const calcularVolume_ = (): number => {
  const arma = getArma()
  if (!arma) return 0
  const volume: number = arma.volume == 'L' ? 0.5 : +arma.volume
  switch (props.tamanho) {
    case Tamanho.MINUSCULO:
      return volume / 2
    case Tamanho.GRANDE:
      return volume * 2
    case Tamanho.ENORME:
      return volume * 4
    case Tamanho.IMENSO:
      return volume * 8
    default:
      return volume
  }
}

const calcularVolume = (): string => {
  const volume = calcularVolume_()
  if (volume < 1) return 'L'
  return volume + ''
}

const calcularNivel = (): number => {
  const arma = getArma()
  const material = getMaterial()
  const runas = getRunas()
  let runaPotencia = 0
  switch (props.runaPotencia) {
    case RunaPotencia.POTENCIA1:
      runaPotencia = 2
      break
    case RunaPotencia.POTENCIA2:
      runaPotencia = 10
      break
    case RunaPotencia.POTENCIA3:
      runaPotencia = 18
      break
    default:
      0
  }

  let runaImpactante = 0
  switch (props.runaImpactante) {
    case RunaImpactante.IMPACTANTE:
      runaImpactante = 4
      break
    case RunaImpactante.IMPACTANTEMAIOR:
      runaImpactante = 12
      break
    case RunaImpactante.IMPACTANTESUPERIOR:
      runaImpactante = 19
      break
    default:
      0
  }
  if (!arma) return 0
  return Math.max(
    arma.level,
    runaPotencia,
    runaImpactante,
    material?.level ?? 0,
    ...runas.map((el) => el.level)
  )
}

const modificadorPrecoTamanho = (): number => {
  switch (props.tamanho) {
    case Tamanho.GRANDE:
      return 2
    case Tamanho.ENORME:
      return 4
    case Tamanho.IMENSO:
      return 8
    default:
      return 1
  }
}

const precoRunaPotencia = (): number => {
  switch (props.runaPotencia) {
    case RunaPotencia.POTENCIA1:
      return 3500
    case RunaPotencia.POTENCIA2:
      return 93500
    case RunaPotencia.POTENCIA3:
      return 893500
    default:
      return 0
  }
}

const precoRunaImpactante = (): number => {
  switch (props.runaImpactante) {
    case RunaImpactante.IMPACTANTE:
      return 6500
    case RunaImpactante.IMPACTANTEMAIOR:
      return 106500
    case RunaImpactante.IMPACTANTESUPERIOR:
      return 3106500
    default:
      return 0
  }
}

const calcularPreco = (): number => {
  const arma = getArma()
  const material = getMaterial()
  if (!arma) return 0
  const volume = calcularVolume_()
  const precoRunasFundamentais = precoRunaPotencia() + precoRunaImpactante()
  if (material) {
    const precoArma = material.precoBase + material.precoVolume * (volume < 1 ? 1 : volume)
    return precoArma + precoRunasFundamentais
  } else {
    const precoArma = arma.preco * modificadorPrecoTamanho()
    return precoArma + precoRunasFundamentais
  }
}

let level = ref(1)
let formula = ref(false)
let proficiencia = ref(Proficiencia.Treinado)
let dias = ref(2)

const selectLevel = (level_: number): void => {
  level.value = level_
}

const diasMin = (): 1 | 2 => {
  return formula.value ? 1 : 2
}

const getProventosProficiencia = (proficiencia: Proficiencia): number[] => {
  switch (proficiencia) {
    case Proficiencia.Treinado:
      return proventosTreinado
    case Proficiencia.Especialista:
      return proventosEspecialista
    case Proficiencia.Mestre:
      return proventosMestre
    case Proficiencia.Lendario:
      return proventosLendario
  }
}

const diasMax = (): number => {
  const custo = calcularPreco() / 2
  const proventos = getProventosProficiencia(proficiencia.value)
  const dias = Math.ceil(custo / proventos[level.value - 1])
  return dias
}

const custoFinal = (): number => {
  const custoInicial = calcularPreco() / 2
  const proventos = getProventosProficiencia(proficiencia.value)
  return (
    custoInicial + Math.max(custoInicial - proventos[level.value - 1] * (dias.value - diasMin()), 0)
  )
}

const mudarProficiencia = (proficiencia_: Proficiencia): void => {
  proficiencia.value = proficiencia_
}
//  [0],  [1]   [2]   [3]   [4]   [5]   [6]   [7]   [8]   [9]   [10]  [11]  [12]  [13]  [14]  [15]  [16]  [17]  [18]  [19]  [20]
const cd = [14, 15, 16, 18, 19, 20, 22, 23, 24, 26, 27, 28, 30, 31, 32, 34, 35, 36, 38, 39, 40]

const calcularCD = (): number => {
  const level = calcularNivel()
  const arma = getArma()
  const material = getMaterial()
  const runas = getRunas()

  const raridades = [arma?.raridade, material?.raridade, ...runas.map((el) => el.raridade)]
  if (raridades.includes(Raridade.UNICO)) return cd[level] + 10
  else if (raridades.includes(Raridade.RARO)) return cd[level] + 5
  else if (raridades.includes(Raridade.INCOMUM)) return cd[level] + 2
  else return cd[level]
}

const getDescricaoTraco = (traco: Traco): string => {
  switch (traco) {
    case Traco.Acuidade:
      return TracoDescricao.Acuidade
    case Traco.Agil:
      return TracoDescricao.Agil
    case Traco.Alcance:
      return TracoDescricao.Alcance
    case Traco.Amplitude:
      return TracoDescricao.Amplitude
    case Traco.Anao:
      return TracoDescricao.Anao
    case Traco.Arremesso3m:
      return TracoDescricao.Arremesso3m
    case Traco.Arremesso6m:
      return TracoDescricao.Arremesso6m
    case Traco.Derrubar:
      return TracoDescricao.Derrubar
    case Traco.Desarmar:
      return TracoDescricao.Desarmar
    case Traco.Divino:
      return TracoDescricao.Divino
    case Traco.DuasMaosD12:
      return TracoDescricao.DuasMaosD12
    case Traco.DuasMaosD8:
      return TracoDescricao.DuasMaosD8
    case Traco.FatalD10:
      return Traco.FatalD10
    case Traco.Gemea:
      return TracoDescricao.Gemea
    case Traco.Gnomo:
      return TracoDescricao.Gnomo
    case Traco.MortalD10:
      return TracoDescricao.MortalD10
    case Traco.NaoLetal:
      return TracoDescricao.NaoLetal
    case Traco.VersatilCt:
      return TracoDescricao.VersatilCt
    case Traco.VersatilPf:
      return TracoDescricao.VersatilPf
  }
  return ''
}
</script>

<style scoped>
@font-face {
  font-family: 'PathfinderActions';
  src: url('https://drive.usercontent.google.com/download?id=1EdxR8LaVao1_2T3mchAQtbhF7FxZcpNE&export=download&authuser=0');
}
.fire {
  color: #a62f00;
}

.col-8 input {
  width: 100%;
}
.final {
  color: #eaeaea;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  flex-direction: column;
  min-width: 40em;
  min-height: 20rem;
  margin: 1rem;
  box-sizing: border-box;
  background-color: #98473e;
  background-color: #3c353e;
  padding: 0.5rem;
  margin: 0;
}

.final > .nomearma {
  width: 100%;
  display: block;
  font-family: 'Roboto', sans-serif;
  text-align: center;
  font-style: italic;
  font-weight: 900;
  color: white;
  font-size: 1.5rem;
  box-sizing: border-box;
  border: 0;
  padding: 0.4rem;
  text-decoration: underline;
  background-color: rgba(255, 255, 255, 0);
}

.final > .grupoarma {
  font-style: italic;
  display: block !important;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
}

.final > .descricaoarma {
  background-color: #242025;
  text-align: justify;
  box-sizing: border-box;
  padding: 0.4rem;
  margin-top: 0.4rem;
  display: flex;
}

.final > .descricaoarma2 {
  text-align: justify;
  box-sizing: border-box;
  padding: 0.4rem;
  margin-top: 0.4rem;
  display: flex;
  background-color: #302a32 !important;
  margin-bottom: 0.4rem;
}

.final > .estatisticas {
  text-decoration: underline;
  text-align: center;
  font-size: 0.9rem;
  width: 100%;
  display: block !important;
  font-weight: bold;
}

.final > .estatistica {
  margin-top: 0.4rem;
  display: flex;
  background-color: #504a52;
  height: 2em;
}

.estatistica > .estatisticaleft {
  background-color: #242025;
  display: flex;
  align-items: center;
  color: #bfb48f;
  padding: 0.25em;
  min-width: 11em;
}

.estatistica > .estatisticaright {
  box-sizing: border-box;
  display: inline-block;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  background-color: #504a52;
  width: 100%;
  min-width: 11em;
}

.estatistica > .preco {
  background-color: #bfb48f;
  color: #242025;
  display: flex;
  width: 100%;
  padding: 0.25rem;
}

.estatisticaright label {
  min-width: 4em;
}

.final > .manufatura {
  text-align: center;
  font-size: 0.9rem;
  width: 100%;
  font-weight: bold;
  display: block !important;
  text-decoration: underline;
}
</style>
