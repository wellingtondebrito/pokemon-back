export class Pokemon {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly image: string,
        readonly atack: string,
        readonly defense: string,
        readonly stat: string,
        readonly type1: string,
        readonly type2: string
    ) {}
}

export enum types {
    BUG = "BUG",
    DARK = "DARK",
    DRAGON = "DRAGON",
    ELETRIC = "ELETRIC",
    FAIRY = "FAIRY",
    FIGHTING = "FIGHTING",
    FIRE = "FIRE",
    FLYING = "FLYING",
    GHOST = "GHOST", 
    GRASS = "GRASS", 
    GROUND = "GROUND", 
    ICE = "ICE", 
    NORMAL = "NORMAL", 
    POISON = "POISON", 
    PSYCHIC = "PSYCHIC", 
    ROCK = "ROCK", 
    STEEL = "STEEL", 
    WATER = "WATER"
}

export interface type {
    id: string,
    type:string

}
export interface createPokemonInput {
    name: string,
    image: string,
    atack: string,
    defense: string,
    stat: string,
    type1: string,
    type2: string
}