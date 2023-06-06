import "marktguru";
import 'dotenv/config'
import TelegramBot from "node-telegram-bot-api";
import {formatSearchResults} from "./formatters.js";
import {Config, Search} from "./types.js";
import {runSearch} from "./search.js";
import {sleep} from "./utils.js";
import "log-timestamp"

async function runSearchAndNotify(searchParams: Search, telegramBot: TelegramBot) {
    const searchResults = await runSearch(searchParams)
    if (searchResults.length > 0) {
        const message = formatSearchResults(searchResults)
        return telegramBot.sendMessage(searchParams.telegramChatId, message, {parse_mode: "HTML"})
    }
}

async function runLoop(searches: Config["searches"], waitTimeMs: number, telegramBot: TelegramBot) {
    while (true) {
        console.info("Running searches...")
        await Promise.all(searches.map(search => runSearchAndNotify(search, telegramBot)))
        console.info("Searches finished. Waiting...")
        await sleep(waitTimeMs)
    }
}

async function main() {
    if (!process.env.CONFIG) throw new Error("No Config found!")
    const config = JSON.parse(process.env.CONFIG) as Config

    const telegramBot = new TelegramBot(config.telegramToken)

    await runLoop(config.searches, config.waitTimeMs, telegramBot)
}

main()
