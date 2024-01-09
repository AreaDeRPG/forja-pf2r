import type { Categoria } from './Categoria'
import type { Dano } from './Dano'
import type { Distancia } from './Distancia'
import type { Grupo } from './Grupo'
import type { Raridade } from '../../Utils/Raridade'
import type { Tipo } from './Tipo'
import type { TipoDano } from './TipoDano'
import type { Traco } from './Traco'

export default interface Arma {
  id: string
  nome: string
  level: number
  raridade: Raridade
  source: string
  preco: number
  dano: Dano
  tipoDano: TipoDano
  volume: string
  maos: 1 | 2
  tipo: Tipo
  distancia: Distancia
  categoria: Categoria
  grupo: Grupo
  tracos: Traco[]
  armaEspecifica: boolean
  descricao: string
}
