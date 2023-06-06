import {marktguru} from "marktguru/src/@types/marktguru.js";
import {SearchResult} from "./types.js";

const formatDate = (dateString: string) => {
    return (new Date(dateString)).toLocaleString("de-DE", {dateStyle: "short"})
}

function formatPrice(price: number) {
    return `${String(price).replace(".", ",")}€`
}

function formatOffer(offer: marktguru.Offer) {
    const {advertisers, validityDates, price, brand, product} = offer
    return `${advertisers[0].name}: ${brand.name} ${product.name} ${formatPrice(price)} (${formatDate(validityDates[0].from)} - ${formatDate(validityDates[0].to)})`
}

export function formatOffers(term: string, offers: marktguru.Offer[]) {
    return `${term}:\n${offers.map(formatOffer).join("\n")}\n`
}

export function formatSearchResults(searchResults: SearchResult[]) {
    const messages = searchResults.map(res => formatOffers(res.searchTerm, res.offers))
    return messages.join()
}
