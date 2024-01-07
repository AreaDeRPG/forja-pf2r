import type { Dano } from '@/entities/Arma/model/Dano'
import type { TipoDano } from '@/entities/Arma/model/TipoDano'
import type { Raridade } from '@/entities/Utils/Raridade'

export default interface Runa {
  id: number
  nome: string
  raridade: Raridade
  preco: number
  level: number
  descricao: string
  bonusDano: Dano
  tipoDano: TipoDano
}
