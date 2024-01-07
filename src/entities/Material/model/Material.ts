import type { Raridade } from '@/entities/Utils/Raridade'

export default interface Material {
  id: number
  nome: string
  level: number
  raridade: Raridade
  precoBase: number
  precoVolume: number
  efeito: string
  maxRuna: number
}
