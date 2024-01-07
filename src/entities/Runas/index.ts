import { Dano } from '../Arma/model/Dano'
import { TipoDano } from '../Arma/model/TipoDano'
import { Raridade } from '../Utils/Raridade'
import type Runa from './model/Runa'
import { actions } from '@/icons/actions'
export const runas = [
  {
    id: 1,
    nome: 'Retornante',
    level: 3,
    preco: 55,
    raridade: Raridade.COMUM,
    descricao:
      'Quando desferir um Golpe arremessando esta arma, ela voa de volta para sua mão depois de completar o Golpe. Se as suas mãos estiverem cheias quando a arma retornar, ela cai no chão no seu espaço'
  },
  {
    id: 2,
    nome: 'Mutável',
    level: 6,
    preco: 225,
    raridade: Raridade.COMUM,
    descricao: `Com um momento de manipulação, você pode transformar esta arma em outra arma diferente que tenha forma similar. <br/><b>Ativação</b> ${actions.oneAction} (<i>Manuseio</i>); <b>Efeito</b> A arma assume a forma de outra arma corpo a corpo que requeira a mesma quantidade de mãos para empunhar. As runas da arma e qualquer material precioso que a componha se aplicam à nova forma da arma. Quaisquer runas de propriedade que não possam se aplicar à nova forma são suprimidas até que o item assuma uma forma à qual possam se aplicar.`
  },
  {
    id: 3,
    nome: 'Flamejante',
    level: 6,
    preco: 225,
    raridade: Raridade.COMUM,
    bonusDano: Dano['1d6'],
    tipoDano: TipoDano.Fogo,
    descricao: `Esta arma é banhada em chamas tremulantes. A arma causa 1d6 de dano de fogo adicional em um acerto, mais 1d10 de dano persistente de fogo em um acerto crítico.`
  },
  {
    id: 4,
    nome: 'Sagrada',
    level: 11,
    preco: 1400,
    raridade: Raridade.COMUM,
    bonusDano: Dano['1d4'],
    tipoDano: TipoDano.Spirit,
    descricao: `Armas sagradas comandam poderosas energias celestiais. 
    Uma arma com esta runa causa 1d6 de dano bondoso adicional contra 
    alvos malignos. Se for maligno, você fica enfraquecido 2 enquanto 
    carregar ou empunhar esta arma.<br/> <b>Ativação</b> ${actions.reaction} 
    (<i>Concentração</i>); <b>Frequência</b> uma vez por dia;
    <b>Acionamento</b> Você obtém sucesso crítico em uma rolagem de
    ataque contra uma criatura maligna com a arma; <b>Efeito</b> Você
    recupera uma quantidade de Pontos de Vida igual ao dobro do
    nível da criatura maligna. Este efeito possui os traços bom, cura
    e positivo.`
  },
  {
    id: 5,
    nome: 'Brilhante',
    level: 12,
    preco: 2000,
    raridade: Raridade.COMUM,
    bonusDano: Dano['1d4'],
    tipoDano: TipoDano.Fogo,
    descricao: `Esta runa faz uma arma se transformar em pura
    energia brilhante. A arma causa 1d4 de dano de
    fogo adicional em um Golpe bem-sucedido, assim
    como 1d4 de dano bondoso a ínferos e 1d4 de dano
    positivo a mortos-vivos. Em um acerto crítico, o
    alvo deve obter sucesso em um salvamento de
    Fortitude CD 29 ou fica cego por 1 rodada.<br/>
    <b>Ativação</b> ${actions.oneAction} (<i>Concentração</i>) (luz); <b>Efeito</b> Você
    mergulha a sua arma na escuridão para
    restaurar a luz. Faça um teste de neutralização
    com um nível de neutralização de 5 e +19 de
    modificador de neutralização para encerrar um
    efeito mágico de escuridão cuja área esteja ao
    alcance da arma.`
  },
  {
    id: 6,
    nome: 'Velocidade',
    level: 16,
    preco: 10000,
    raridade: Raridade.RARO,
    descricao: `Ataques com uma arma de <i>velocidade</i> são sobrenaturalmente
    rápidos. Enquanto empunhar uma arma de <i>velocidade</i>, você
    recebe a condição acelerado, mas só pode usar a ação adicional
    concedida para desferir um Golpe com a arma gravada`
  }
] as Runa[]
