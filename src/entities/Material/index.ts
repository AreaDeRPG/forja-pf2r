import { Raridade } from '../Utils/Raridade'
import type Material from './model/Material'

export const materiais = [
  {
    id: 2,
    nome: 'Ferro Frio de Qualidade Baixa',
    level: 2,
    raridade: Raridade.COMUM,
    precoBase: 4000,
    precoVolume: 400,
    efeito: '',
    maxRuna: 8
  },
  {
    id: 3,
    nome: 'Prata de Qualidade Baixa',
    level: 2,
    raridade: Raridade.COMUM,
    precoBase: 4000,
    precoVolume: 400,
    efeito: '',
    maxRuna: 8
  }
] as Material[]
