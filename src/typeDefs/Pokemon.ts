export default interface Pokemon {
    abilities: Ability[]
    base_experience: number
    forms: ApiData[]
    game_indices: GameIndice[]
    height: number
    held_items: any[]
    id: number
    is_default: boolean
    location_area_encounters: string
    moves: Move[]
    name: string
    oder: number
    past_types: any[]
    species: ApiData
    sprites: any
    stats: Stat[]
    types: PokemonType[]
    weight: number
}

export interface Ability {
    ability: ApiData
    is_hidden: boolean
    slot: number
}

export interface GameIndice {
    game_index: number
    version: ApiData
}

export interface Move {
    move: ApiData
    version_group_details: VersionGroupDetail[]
}

export interface VersionGroupDetail {
    level_learned_at: number
    move_learn_method: ApiData
    version_group: ApiData
}

export interface Stat {
    base_stat: number
    effort: number
    stat: ApiData
}

export interface PokemonType {
    slot: number
    type: ApiData
}

export interface ApiData {
    name: string
    url: string
}
