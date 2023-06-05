import {marktguru} from "marktguru/src/@types/marktguru.js";

export interface SearchResult {
    searchTerm: string
    results: marktguru.Offer[]
}

export interface Search {
    telegramChatId: string
    zipCode: number
    searchTerms: string[]
}

export interface Config {
    telegramToken: string
    searches: Search[]
}
