import {marktguru} from "marktguru/src/@types/marktguru.js";
import {SearchResult} from "./types.js";


const formatDate = (dateString: string) => {
    return (new Date(dateString)).toLocaleString("de-DE", {day: "2-digit", month: "2-digit"})
}

function formatPrice(price: number) {
    return `${String(price).replace(".", ",")}€`
}

function formatOffers(term: string, offers: marktguru.Offer[]) {
    return `<pre>${term}:
    ${offers.reduce((p, o) => p +
        `${o.advertisers[0].name.padEnd(12)} ${(o.brand.name + " " + o.product.name).padEnd(18)} ${formatPrice(o.price).padEnd(6)} (${formatDate(o.validityDates[0].from)}-${formatDate(o.validityDates[0].to)})
    `, "")}</pre>`
}

export function formatSearchResults(searchResults: SearchResult[]) {
    const messages = searchResults.map(res => formatOffers(res.searchTerm, res.offers))
     return "<b>Product Search</b>:\n" + messages.join("\n")
}
