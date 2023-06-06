import {Search, SearchResult} from "./types.js";
import marktguru from "marktguru";
import {isTruthy} from "./utils.js";

const known_offers = new Set<number>()

function saveSearchResultIds(searchResult: SearchResult[]) {
    searchResult
        .map(result => result.offers)
        .flat()
        .map(offer => offer.id)
        .forEach(id => known_offers.add(id))
}

function filterSearchResult(searchResult: SearchResult): SearchResult | null {
    const filteredResult = {
        searchTerm: searchResult.searchTerm,
        offers: searchResult.offers.filter(offer => !known_offers.has(offer.id))
    }

    return filteredResult.offers.length > 0 ? filteredResult : null
}

function logResults(searchResults: SearchResult[]) {
    searchResults.forEach(result => console.info(`Found ${result.offers.length} new offers for term "${result.searchTerm}"`))
}

export async function runSearch(searchParams: Search) {
    const results = await Promise.all(
        searchParams.searchTerms.map(async query => ({
            searchTerm: query,
            offers: await marktguru.search(query, {limit: 10, zipCode: searchParams.zipCode})
        } as SearchResult))
    )

    const filteredResults = results.map(filterSearchResult).filter(isTruthy)

    saveSearchResultIds(filteredResults)
    logResults(filteredResults)

    return filteredResults
}
