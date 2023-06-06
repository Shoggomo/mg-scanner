import {marktguru} from "marktguru/src/@types/marktguru.js";

export interface SearchResult {
    searchTerm: string
    offers: marktguru.Offer[]
}

export interface Search {
    telegramChatId: string
    zipCode: number
    searchTerms: string[]
}

export interface Config {
    waitTimeMs: number
    telegramToken: string
    searches: Search[]
}
