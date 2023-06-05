import "marktguru";
import 'dotenv/config'
import TelegramBot from "node-telegram-bot-api";
import {formatSearchResults} from "./formatters.js";
import {Config, Search} from "./types.js";
import {runSearch} from "./search.js";

async function runSearchAndNotify(searchParams: Search, telegramBot: TelegramBot) {
    const searchResults = await runSearch(searchParams);
    // TODO save offer ids to db
    const message = formatSearchResults(searchResults)
    await telegramBot.sendMessage(searchParams.telegramChatId, message)
}

async function main() {
    if (!process.env.CONFIG) throw new Error("No Config found!")
    const config = JSON.parse(process.env.CONFIG) as Config

    const telegramBot = new TelegramBot(config.telegramToken)

    config.searches.forEach(search => runSearchAndNotify(search, telegramBot))
}

main()

/**
 * Read config from env
 * fetch results
 * save results to db (offer.id into redis)
 * send notifications to users
 */
