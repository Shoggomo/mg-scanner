import "marktguru";
import 'dotenv/config'
import TelegramBot from "node-telegram-bot-api";
import {formatSearchResults} from "./formatters.js";
import {Config, Search} from "./types.js";
import {runSearch} from "./search.js";
import "log-timestamp"
import * as cron from "node-cron"

async function runSearchAndNotify(searchParams: Search, telegramBot: TelegramBot) {
    const searchResults = await runSearch(searchParams)
    if (searchResults.length > 0) {
        const message = formatSearchResults(searchResults)
        return telegramBot.sendMessage(searchParams.telegramChatId, message, {parse_mode: "HTML"})
    }
}

async function runSearches(searches: Config["searches"], telegramBot: TelegramBot) {
        console.info("Running searches...")
        await Promise.all(searches.map(search => runSearchAndNotify(search, telegramBot)))
        console.info("Searches finished. Waiting...")
}

async function main() {
    console.info("Loading config...")

    if (!process.env.CONFIG) throw new Error("No Config found!")
    const config = JSON.parse(process.env.CONFIG) as Config

    const telegramBot = new TelegramBot(config.telegramToken)

    console.info("Starting cron schedule...")
    cron.schedule(config.schedule, () => {
        runSearches(config.searches, telegramBot)
    });
}

main()
