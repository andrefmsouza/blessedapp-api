import { ExpressAdapterParams } from "../types/ExpressAdapter.types";
import { handleController } from "../utils/handleController";
import { BibleService } from "../services/bible.service";

export class BibleController {
    static async getVersions(data: ExpressAdapterParams) {
        return handleController(async () => {
            const versions = await BibleService.getVersions();
            return {
                status: 200,
                json: {
                    status: true,
                    data: versions
                }
            };
        });
    }

    static async getBooks(data: ExpressAdapterParams) {
        return handleController(async () => {
            const { version } = data.params;
            const books = await BibleService.getBooks(version);
            return {
                status: 200,
                json: {
                    status: true,
                    data: books
                }
            };
        });
    }

    static async getChapters(data: ExpressAdapterParams) {
        return handleController(async () => {
            const { version, book } = data.params;
            const chapters = await BibleService.getChapters(version, book);
            return {
                status: 200,
                json: {
                    status: true,
                    data: chapters
                }
            };
        });
    }

    static async getVerses(data: ExpressAdapterParams) {
        return handleController(async () => {
            const { version, book, chapter } = data.params;
            const verses = await BibleService.getVerses(version, book, chapter);
            return {
                status: 200,
                json: {
                    status: true,
                    data: verses
                }
            };
        });
    }
} 