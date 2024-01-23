import type Arma from './model/Arma'
import { Categoria } from './model/Categoria'
import { Dano } from './model/Dano'
import { Distancia } from './model/Distancia'
import { Grupo } from './model/Grupo'
import { Raridade } from '../Utils/Raridade'
import { Tipo } from './model/Tipo'
import { TipoDano } from './model/TipoDano'
import { Traco } from './model/Traco'
import axios from 'axios'

export interface Nethys {
  took: number
  timed_out: boolean
  _shards: Object
  hits: {
    total: {
      value: number
      relation: string
    }
    max_score?: Object
    hits: {
      _index: string
      _id: string
      _score: Object
      _source: {
        bulk: number
        damage: string
        damage_die: 3 | 4 | 6 | 8 | 10 | 12
        id: string
        hands: '1' | '2'
        level: number
        markdown: string
        name: string
        price: number
        range: 10 | 20 | 30 | 60 | 120
        rarity: 'common' | 'uncommon' | 'rare' | 'unique'
        source_raw: string[]
        trait_raw: string[]
        url: string
        weapon_category: 'Simple' | 'Martial' | 'Unarmed' | 'Advanced'
        weapon_group: string
        weapon_type: 'Melee' | 'Ranged'
      }
      sort: [number, string, number]
    }[]
  }
  aggregations: {
    group1: {
      after_key: {
        field1: string
      }
      buckets: {
        key: {
          field1: string
        }
        doc_count: number
      }[]
    }
  }
}

const nethys = JSON.stringify({
  query: {
    function_score: {
      query: {
        bool: {
          filter: [
            {
              query_string: {
                query: 'category:weapon',
                default_operator: 'AND',
                fields: ['name', 'text^0.1', 'trait_raw', 'type']
              }
            }
          ],
          must_not: [
            {
              terms: {
                weapon_category: ['ammunition']
              }
            },
            {
              term: {
                exclude_from_search: true
              }
            }
          ]
        }
      },
      boost_mode: 'multiply',
      functions: [
        {
          filter: {
            terms: {
              type: ['Ancestry', 'Class']
            }
          },
          weight: 1.1
        },
        {
          filter: {
            terms: {
              type: ['Trait']
            }
          },
          weight: 1.05
        }
      ]
    }
  },
  size: 1000,
  sort: [
    {
      weapon_type: {
        order: 'asc'
      }
    },
    {
      weapon_category: {
        order: 'desc'
      }
    },
    {
      'name.keyword': {
        order: 'asc'
      }
    },
    '_doc'
  ],
  _source: {
    excludes: ['text']
  },
  aggs: {
    group1: {
      composite: {
        sources: [
          {
            field1: {
              terms: {
                field: 'type',
                missing_bucket: true
              }
            }
          }
        ],
        size: 10000
      }
    }
  }
})

const config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://elasticsearch.aonprd.com/aon/_search?track_total_hits=true',
  headers: {
    'Content-Type': 'application/json'
  },
  data: nethys
}

const converterRaridade = (raridade: 'common' | 'uncommon' | 'rare' | 'unique'): Raridade => {
  switch (raridade) {
    case 'common':
      return Raridade.COMUM
    case 'uncommon':
      return Raridade.INCOMUM
    case 'rare':
      return Raridade.RARO
    case 'unique':
      return Raridade.UNICO
  }
}

const converterDano = (dado: 3 | 4 | 6 | 8 | 10 | 12): Dano => {
  switch (dado) {
    case 3:
      return Dano['1d3']
    case 4:
      return Dano['1d4']
    case 6:
      return Dano['1d6']
    case 8:
      return Dano['1d8']
    case 10:
      return Dano['1d10']
    case 12:
      return Dano['1d12']
  }
}

const converterTipoDano = (dano: string): TipoDano => {
  switch (dano) {
    case 'P':
      return TipoDano.Perfurante
    case 'C':
      return TipoDano.Cortante
    case 'S':
      return TipoDano.Cortante
    case 'modular':
      return TipoDano.Modular
    default:
      return TipoDano.Modular
  }
}

const converterMaos = (maos: '1' | '2'): 1 | 2 => {
  switch (maos) {
    case '1':
      return 1
    case '2':
      return 2
  }
}

const converterTipoArma = (tipo: 'Melee' | 'Ranged'): Tipo => {
  switch (tipo) {
    case 'Melee':
      return Tipo.CAC
    case 'Ranged':
      return Tipo.Ranged
  }
}

const converterDistancia = (tipo: 10 | 20 | 30 | 60 | 120): Distancia => {
  switch (tipo) {
    case 10:
      return Distancia['3m']
    case 20:
      return Distancia['6m']
    case 30:
      return Distancia['9m']
    case 60:
      return Distancia['18m']
    case 120:
      return Distancia['36m']
  }
}

const converterCategoriaArma = (
  categoria: 'Simple' | 'Martial' | 'Unarmed' | 'Advanced'
): Categoria => {
  switch (categoria) {
    case 'Simple':
      return Categoria.Simples
    case 'Martial':
      return Categoria.Marcial
    case 'Unarmed':
      return Categoria.Desarmado
    case 'Advanced':
      return Categoria.Avancada
  }
}

const converterGrupoArma = (grupo: string): Grupo => {
  switch (grupo) {
    default:
      return Grupo.Arco
  }
}

const converterTracos = (tracos: string[], el?: Object): Traco[] => {
  const traco = (traco: string): Traco => {
    switch (traco) {
      case 'Agile':
        return Traco.Agil
      case 'Finesse':
        return Traco.Acuidade
      case 'Nonlethal':
        return Traco.NaoLetal
      case 'Unarmed':
        return Traco.Desarmado
      case 'Shove':
        return Traco.Empurrar
      case 'Two-Hand d6':
        return Traco.DuasMaosD6
      case 'Two-Hand 1d6':
        return Traco.DuasMaosD6
      case 'Two-Hand 1d8':
        return Traco.DuasMaosD8
      case 'Two-Hand d10':
        return Traco.DuasMaosD10
      case 'Two-Hand 1d10':
        return Traco.DuasMaosD10
      case 'Two-Hand 1d12':
        return Traco.DuasMaosD12
      case 'Two-Hand d12':
        return Traco.DuasMaosD12
      case 'Uncommon':
        return Traco.Incomum
      case 'Dwarf':
        return Traco.Anao
      case 'Parry':
        return Traco.Aparar
      case 'Versatile B':
        return Traco.VersatilCn
      case 'Versatile S':
        return Traco.VersatilCt
      case 'Versatile P':
        return Traco.VersatilPf
      case 'Thrown':
        return Traco.Arremesso
      case 'Thrown  10 ft.':
        return Traco.Arremesso3m
      case 'thrown 10 ft.':
        return Traco.Arremesso3m
      case 'Thrown 10 ft.':
        return Traco.Arremesso3m
      case 'Thrown 20 ft.':
        return Traco.Arremesso6m
      case 'Thrown 20 feet':
        return Traco.Arremesso6m
      case 'Thrown 30 ft.':
        return Traco.Arremesso12m
      case 'Thrown 40 ft.':
        return Traco.Arremesso12m
      case 'Concealable':
        return Traco.Ocultavel
      case 'Deadly d6':
        return Traco.MortalD6
      case 'Deadly d8':
        return Traco.MortalD8
      case 'Deadly  d8':
        return Traco.MortalD8
      case 'Deadly d10':
        return Traco.MortalD10
      case 'Deadly d12':
        return Traco.MortalD12
      case 'Fatal d6':
        return Traco.FatalD6
      case 'Fatal d8':
        return Traco.FatalD8
      case 'Fatal 1d8':
        return Traco.FatalD8
      case 'Fatal d10':
        return Traco.FatalD10
      case 'Fatal 1d10':
        return Traco.FatalD10
      case 'Fatal d12':
        return Traco.FatalD12
      case 'Fatal 1d12':
        return Traco.FatalD12
      case 'Halfling':
        return Traco.Halfling
      case 'Free-Hand':
        return Traco.MaoLivre
      case 'Monk':
        return Traco.Monge
      case 'Reach':
        return Traco.Alcance
      case 'Backswing':
        return Traco.Oscilante
      case 'Trip':
        return Traco.Derrubar
      case 'Disarm':
        return Traco.Desarmar
      case 'Volley 20 ft.':
        return Traco.Voleio6m
      case 'Volley 30 ft.':
        return Traco.Voleio9m
      case 'Volley 50 ft.':
        return Traco.Voleio15m
      case 'Goblin':
        return Traco.Goblin
      case 'Hobgoblin':
        return Traco.Hobgoblin
      case 'Orc':
        return Traco.Orc
      case 'Elf':
        return Traco.Elfo
      case 'Fatal Aim d10':
        return Traco.MiraFatald10
      case 'Fatal Aim d12':
        return Traco.MiraFatald12
      case 'Twin':
        return Traco.Gemea
      case 'Sweep':
        return Traco.Amplitude
      case 'Grapple':
        return Traco.Agarrar
      case 'Backstabber':
        return Traco.Apunhaladora
      case 'Ranged Trip':
        return Traco.DerrubarADistancia
      case 'Attached':
        return Traco.Anexada
      case 'Forceful':
        return Traco.Energica
      case 'Gnome':
        return Traco.Gnomo
      case 'Kobold':
        return Traco.Kobold
      case 'Azarketi':
        return Traco.Azarketi
      case 'Grippli':
        return Traco.Grippli
      case 'Jousting 1d6':
        return Traco.JustaD6
      case 'Jousting d6':
        return Traco.JustaD6
      case 'Conrasu':
        return Traco.Conrasu
      case 'Catfolk':
        return Traco.PovoGato
      case 'Ratfolk':
        return Traco.PovoRato
      case 'Tengu':
        return Traco.Tengu
      case 'Rare':
        return Traco.Raro
      case 'Propulsive':
        return Traco.Propulsiva
      case 'Attached to crossbow or firearm':
        return Traco.AnexadaBestaArmaFogo
      case 'Modular B, P, or S':
        return Traco.ModularPBS
      case 'Modular (B, P, or S)':
        return Traco.ModularPBS
      case 'Modular (P and grapple, or S and sweep)':
        return Traco.ModularPAgarrarSAmplitude
      case 'Critical Fusion':
        return Traco.UniaoCritica
      case 'Combination':
        return Traco.Juncao
      case 'Vehicular':
        return Traco.Veicular
      case 'Razing':
        return Traco.Demolidora
      case 'Climbing':
        return Traco.Escalar
      case 'Tethered':
        return Traco.Preso
      case 'Training':
        return Traco.Treinamento
      case 'Twin (Sheath)':
        return Traco.GemeaBainha
      case 'Twin (Sword)':
        return Traco.GemeaEspada
      case 'Injection':
        return Traco.Injecao
      case 'Brace':
        return Traco.Falange
      case 'Attached to Shield':
        return Traco.AnexadaEscudo
      case 'Attached to shield':
        return Traco.AnexadaEscudo
      case 'Ghoran':
        return Traco.Ghoran
      case 'Geniekin':
        return Traco.Geniano
      case 'Resonant':
        return Traco.Ressonante
      case 'Clockwork':
        return Traco.Clockwork
      case 'Hampering':
        return Traco.Dificultadora
      case 'Reload 1':
        return Traco.Recarga1
      case 'Vanara':
        return Traco.Vanara
      case 'Vishkanya':
        return Traco.Vishkanya
      case 'Alchemical':
        return Traco.Alquimico
      case 'Concussive':
        return Traco.Concussivo
      case 'Repeating':
        return Traco.Repeticao
      case 'Kickback':
        return Traco.Recuo
      case 'Cobbled':
        return Traco.Remendado
      case 'Scatter 10 ft.':
        return Traco.Disperso3m
      case 'Scatter 5 ft.':
        return Traco.Disperso1MetroMeio
      case 'Recovery':
        return Traco.Retornante
      case 'Capacity 2':
        return Traco.Capacidade2
      case 'Capacity 3':
        return Traco.Capacidade3
      case 'Capacity 4':
        return Traco.Capacidade4
      case 'Capacity 5':
        return Traco.Capacidade5
      case 'Double Barrel':
        return Traco.CanoDuplo
      case 'Volley':
        return Traco.Voleio9m
      default:
        console.log(traco)
        console.log(el)
        return Traco.Null
    }
  }
  return tracos?.map((el) => traco(el)) ?? []
}

const nethysUrl = 'https://2e.aonprd.com'

const converterNomeArma = (nome: string): string => {
  switch (nome) {
    /*
      ### ARMA SIMPLES
    */
    case 'Clan Dagger':
      return `Adaga de Clã`
    case 'Club':
      return `Clava`
    case 'Dagger':
      return `Adaga`
    case 'Hand Crossbow':
      return `Besta de Mão`
    case 'Heavy Crossbow':
      return `Besta Pesada`
    case 'Dart':
      return `Dardo`
    case 'Javelin':
      return `Azagaia`
    case 'Light Mace':
      return `Maça Leve`
    case 'Longspear':
      return `Lança Longa`
    case 'Mace':
      return `Maça`
    case 'Spear':
      return `Lança`
    case 'Staff':
      return `Cajado`
    case 'Gauntlet':
      return `Manopla`
    case 'Spiked Gauntlet':
      return `Manopla com Cravos`
    case 'Morningstar':
      return `Maça-Estrela`
    case 'Sickle':
      return `Foice`
    case 'Fist':
      return `Punho`
    case 'Crossbow':
      return `Besta Leve`
    case 'Blowgun':
      return `Zarabatana`
    case 'Sling':
      return `Funda`
    case 'Air Repeater':
      return `Repetidor de Ar*`
    case 'Long Air Repeater':
      return `Repetidor de Ar Longo*`
    case 'Alchemical Crossbow':
      return `Besta Alquímica`
    case 'Atlatl':
      return `Propulsor*`
    case 'Battle Lute':
      return `Alaúde de Batalha*`
    case 'Coat Pistol':
      return `Pistola de Bolso*`
    case 'Corset Knife':
      return `Faca Espartilho*`
    case 'Fire Lance':
      return `Lança de Fogo*`
    case 'Flintlock Musket':
      return `Mosquete de Pederneira*`
    case 'Flintlock Pistol':
      return `Pistola de Pederneira*`
    case 'Forked Bipod':
      return `Bipé bifurcado*`
    case 'Frying Pan':
      return `Frigideira*`
    case 'Hand Cannon':
      return `Canhão de Mão*`
    case 'Juggling Club':
      return `Clava de Malabarista*`
    case 'Knuckle Duster':
      return `Espanador de Dedos*`
    case 'Nightstick':
      return `Cassetete*`
    case 'Reinforced Frame':
      return `Roda Reforçada*`
    case 'Shears':
      return `Tesouras`
    case 'Throwing Knife':
      return `Faca de Arremesso*`
    case 'Shield Pistol':
      return `Pistola-Escudo*`
    case 'Stiletto Pen':
      return `Caneta Estilete`
    case 'Thundermace':
      return `Maça-Trovão*`
    case 'Tri-Bladed Katar':
      return `Katar com Três Lâminas*`
    case 'Wheel Blades':
      return `Roda com Lâminas*`
    case 'Wheel Spikes':
      return `Roda com Cravos*`
    /*
      ### ARMA MARCIAIS
    */
    case 'Adze':
      return `Enxó`
    case 'Arquebus':
      return `Arquebus*`
    case 'Asp Coil':
      return `Serpente Enroscada*`
    case 'Axe Musket':
      return `Machado-Mosquete*`
    case 'Backpack Ballista':
      return `Balestra de Mochila*`
    case 'Bastard Sword':
      return `Espada Bastarda`
    case 'Battle Axe':
      return `Machado de Batalha`
    case 'Battle Saddle':
      return `Sela de Batalha*`
    case 'Bayonet':
      return `Baioneta*`
    case 'Bec de Corbin':
      return `Bico de Corvo*`
    case 'Black Powder Knuckle Dusters':
      return `Soqueira com Pólvora*`
    case 'Bladed Gauntlet':
      return `Manopla com Lâmina*`
    case 'Bladed Scarf':
      return `Cachecol Laminado*`
    case 'Bo Staff':
      return `Bô`
    case 'Boarding Pike':
      return `Pique de Embarque`
    case 'Bow Staff':
      return `Cajado-Arco*`
    case 'Breaching Pike':
      return `Pique de Arrombamento`
    case 'Buugeng':
      return `Buugeng`
    case 'Boarding Axe':
      return `Machado de Embarque*`
    case 'Cane Pistol':
      return `Bengala de Cano Curto*`
    case 'Claw Blade':
      return `Lâmina de Garra*`
    case 'Combat Grapnel':
      return `Gancho de Combate*`
    case 'Combat Lure':
      return `Isca de Combate*`
    case 'Crescent Cross':
      return `Cruz Crescente*`
    case 'Dagger Pistol':
      return `Pistola-Adaga*`
    case `Dancer's Spear`:
      return `Pique de Dança*`
    case 'Dandpatta':
      return `Dandpatta*`
    case 'Dogslicer':
      return `Cortacão`
    case 'Dueling Spear':
      return `Pique de Duelo*`
    case 'Earthbreaker':
      return `Destruidor de Terra*`
    case 'Elven Branched Spear':
      return `Pique Élfico Ramificado*`
    case 'Elven Curve Blade':
      return `Lâmina Curva Élfica`
    case 'Exquisite Sword Cane':
      return `Bengala de Espada Elegante*`
    case 'Exquisite Sword Cane Sheath':
      return `Bainha de Bengala de Espada Elegante*`
    case 'Falchion':
      return `Bracamante`
    case 'Fangwire':
      return `Fio de Presas*`
    case 'Fauchard':
      return `Foucinho`
    case 'Fighting Fan':
      return `Leque de Combate*`
    case 'Fighting Stick':
      return `Bastão de Luta*`
    case "Filcher's Fork":
      return `Garfo do Ladrão*`
    case 'Flail':
      return `Mangual`
    case 'Flyssa':
      return `Flyssa`
    case 'Gaff':
      return `Garateia*`
    case 'Gill Hook':
      return `Gancho para Guelras*`
    case 'Glaive':
      return `Glaive`
    case 'Gnome Amalgam Musket':
      return `Espingarda Amálgama Gnômica*`
    case 'Gnome Hooked Hammer':
      return `Martelo com Gancho Gnômico`
    case 'Greataxe':
      return `Machado Longo`
    case 'Greatclub':
      return `Clava Pesada`
    case 'Greatpick':
      return `Picareta Pesada`
    case 'Greatsword':
      return `Montante`
    case 'Griffon Cane':
      return `Bengala-Grifo*`
    case 'Guisarme':
      return `Bisarma`
    case 'Gun Sword':
      return `Espada com Cano*`
    case 'Halberd':
      return `Alabarda`
    case 'Hammer Gun':
      return `Martelo com Cano*`
    case 'Hand Adze':
      return `Enxó de mão`
    case 'Hatchet':
      return `Machadinha`
    case 'Horsechopper':
      return `Fatia-cavalo`
    case 'Injection Spear':
      return `Pique Injetora*`
    case 'Jiu Huan Dao':
      return `Espada de Nove Anéis`
    case 'Kama':
      return `Kama`
    case 'Katana':
      return `Katana`
    case 'Khakkara':
      return `Khakkara`
    case 'Khopesh':
      return `Khopesh`
    case 'Kris':
      return `Kris`
    case 'Kukri':
      return `Kukri`
    case 'Kusarigama':
      return `Kusarigama`
    case 'Lance':
      return `Lança de Cavalaria`
    case 'Lancer':
      return `Lança-Besta`
    case 'Leiomano':
      return `Leiomano`
    case 'Light Hammer':
      return `Martelo Leve`
    case 'Light Pick':
      return `Picareta Leve`
    case 'Katar':
      return `Katar`
    case 'Poi':
      return `Balangandãs`
    case 'Lion Scythe':
      return `Foice de Leão*`
    case 'Long Hammer':
      return `Martelo Longo*`
    case 'Longsword':
      return `Espada Longa`
    case 'Mace Multipistol':
      return `Maça Multipistola*`
    case 'Machete':
      return `Machete`
    case 'Main-gauche':
      return `Adaga de aparar`
    case 'Mambele':
      return `Mambele`
    case 'Maul':
      return `Malho `
    case 'Meteor Hammer':
      return `Martelo Meteoro`
    case 'Mikazuki':
      return `Mikazuki`
    case "Monkey's Fist":
      return `Funda de Corda`
    case 'Naginata':
      return `Naginata`
    case 'Nunchaku':
      return `Nunchaku`
    case 'Ogre Hook':
      return `Gancho Ogro`
    case 'Orc Knuckle Dagger':
      return `Adaga de Soco Órquica`
    case 'Panabas':
      return `Panabas`
    case 'Pick':
      return `Picareta`
    case 'Piercing Wind':
      return `Vento Perfurante*`
    case 'Piranha Kiss':
      return `Beijo de Piranha8`
    case 'Polytool':
      return `Poliferramenta`
    case 'Probing Cane':
      return `Bengala de Prospecção`
    case '':
      return ``
    case '':
      return ``
    case '':
      return ``
    case '':
      return ``
    case '':
      return ``
    case '':
      return ``
    case '':
      return ``
    case '':
      return ``
    case '':
      return ``
    case '':
      return ``
    case '':
      return ``
    case '':
      return ``
    case '':
      return ``
    case '':
      return ``
    case '':
      return ``
    case '':
      return ``
    case '':
      return ``
    case '':
      return ``
    case '':
      return ``
    case '':
      return ``

    default:
      console.log('+' + nome)
      return '+' + nome
  }
}

const pullNethys = async (): Promise<Arma[]> => {
  const armasNethys: Nethys = (await axios.request(config)).data
  console.log(armasNethys)
  const armas: Arma[] = armasNethys.hits.hits.map((el) => {
    return {
      id: el._id,
      nome: `<a href='${nethysUrl}${el._source.url}' class='link-light'>${converterNomeArma(
        el._source.name
      )}</a>`,
      level: el._source.level,
      raridade: converterRaridade(el._source.rarity),
      source: el._source.source_raw[0],
      preco: el._source.price,
      dano: converterDano(el._source.damage_die),
      tipoDano: converterTipoDano(el._source.damage.slice(4)),
      volume: '' + el._source.bulk,
      maos: converterMaos(el._source.hands),
      tipo: converterTipoArma(el._source.weapon_type),
      distancia: converterDistancia(el._source.range),
      categoria: converterCategoriaArma(el._source.weapon_category),
      grupo: converterGrupoArma(el._source.weapon_group),
      tracos: converterTracos(el._source.trait_raw, el),
      armaEspecifica: false,
      descricao: ''
    } as Arma
  })
  console.log(armas)
  return armas
}

export const armasBase = pullNethys()
