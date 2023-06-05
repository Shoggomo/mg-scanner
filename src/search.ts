import {Search} from "./types.js";
import marktguru from "marktguru";

export async function runSearch(searchParams: Search) {
    return await Promise.all(
        searchParams.searchTerms.map(async query => ({
            searchTerm: query,
            results: await marktguru.search(query, {limit: 10, zipCode: searchParams.zipCode})
        }))
    );
    // TODO filter offers already in DB
}
