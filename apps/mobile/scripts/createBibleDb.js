"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sqlite_1 = require("sqlite");
var sqlite3_1 = __importDefault(require("sqlite3"));
var promises_1 = require("fs/promises");
var fs_1 = require("fs");
var shared_1 = require("@amen24/shared");
var dbPath = "../data/bible.db";
if ((0, fs_1.existsSync)(dbPath)) {
    (0, fs_1.unlinkSync)(dbPath);
    console.log("🧹 Old bible.db deleted.");
}
function initDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var db, error_1, _a, _b, _c, _i, key, book, slug, response, bookId, chapterNum;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, (0, sqlite_1.open)({
                        filename: dbPath,
                        driver: sqlite3_1.default.Database,
                    })];
                case 1:
                    db = _d.sent();
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, db.exec("\n      CREATE TABLE IF NOT EXISTS book (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        bookKey TEXT NOT NULL UNIQUE,\n        slug TEXT\n      );\n\n      CREATE TABLE IF NOT EXISTS chapter (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        num INTEGER NOT NULL,\n        bookId INTEGER NOT NULL,\n        FOREIGN KEY (bookId) REFERENCES book(id) ON DELETE CASCADE,\n        UNIQUE (bookId, num)\n      );\n\n      CREATE TABLE IF NOT EXISTS verse (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        num SMALLINT NOT NULL,\n        chapterId INTEGER NOT NULL,\n        FOREIGN KEY (chapterId) REFERENCES chapter(id) ON DELETE CASCADE,\n        UNIQUE (chapterId, num)\n      );\n\n      CREATE TABLE IF NOT EXISTS verse_translation (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        verseId INTEGER NOT NULL,\n        lang TEXT NOT NULL,\n        text TEXT,\n        textNormalized TEXT,\n        textDiacritized TEXT,\n        FOREIGN KEY (verseId) REFERENCES verse(id) ON DELETE CASCADE,\n        UNIQUE (verseId, lang)\n      );\n    ")];
                case 3:
                    _d.sent();
                    console.log("✅ All tables created following backend schema.");
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _d.sent();
                    console.error("❌ Error creating tables:", error_1);
                    throw new Error("Database schema creation failed!");
                case 5:
                    _a = shared_1.BookMap;
                    _b = [];
                    for (_c in _a)
                        _b.push(_c);
                    _i = 0;
                    _d.label = 6;
                case 6:
                    if (!(_i < _b.length)) return [3 /*break*/, 12];
                    _c = _b[_i];
                    if (!(_c in _a)) return [3 /*break*/, 11];
                    key = _c;
                    book = shared_1.BookMap[key];
                    slug = book.slug;
                    return [4 /*yield*/, db.run("INSERT INTO book (bookKey, slug) VALUES (?, ?)", [key, slug])];
                case 7:
                    response = _d.sent();
                    bookId = response.lastID;
                    chapterNum = 1;
                    _d.label = 8;
                case 8:
                    if (!(chapterNum <= book.len)) return [3 /*break*/, 11];
                    return [4 /*yield*/, db.run("INSERT INTO chapter (num, bookId) VALUES (?, ?)", [chapterNum, bookId])];
                case 9:
                    _d.sent();
                    _d.label = 10;
                case 10:
                    chapterNum++;
                    return [3 /*break*/, 8];
                case 11:
                    _i++;
                    return [3 /*break*/, 6];
                case 12: return [4 /*yield*/, migrateTranslations(db, "../../../documentation/content/Bible_Native_MasoreticSBL.VPL.txt", "native")];
                case 13:
                    _d.sent();
                    return [4 /*yield*/, migrateTranslations(db, "../../../documentation/content/Bible_En_ESV_2001.VPL.txt", "en")];
                case 14:
                    _d.sent();
                    return [4 /*yield*/, migrateTranslations(db, "../../../documentation/content/Bible_Ar_SVD_1865.VPL.txt", "ar")];
                case 15:
                    _d.sent();
                    return [4 /*yield*/, db.close()];
                case 16:
                    _d.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function migrateTranslations(db, filePath, lang) {
    return __awaiter(this, void 0, void 0, function () {
        var BibleData, lines, bookId, chapterId, verseId, _i, lines_1, line, result, bookKey, chapterNum, verseNum, text, textNormalized, textDiacritized, verseResult, res;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, promises_1.readFile)(filePath, "utf-8")];
                case 1:
                    BibleData = _c.sent();
                    lines = BibleData.split("\n");
                    bookId = 0;
                    chapterId = 0;
                    verseId = 0;
                    _i = 0, lines_1 = lines;
                    _c.label = 2;
                case 2:
                    if (!(_i < lines_1.length)) return [3 /*break*/, 13];
                    line = lines_1[_i];
                    result = line.match(/^([A-Z0-9]+)\s(\d+):(\d+)\s(.*)$/);
                    if (!result)
                        return [3 /*break*/, 12];
                    bookKey = result[1];
                    chapterNum = parseInt(result[2]);
                    verseNum = parseInt(result[3]);
                    text = result[4];
                    textNormalized = text;
                    textDiacritized = text;
                    if (lang === shared_1.Lang.ARABIC) {
                        text = (0, shared_1.replaceWaslaAlef)(text);
                        text = (0, shared_1.removeArDiacritics)(text);
                        textNormalized = (0, shared_1.normalizeArText)(text);
                    }
                    else if (lang === shared_1.Lang.NATIVE) {
                        text = (0, shared_1.removeNaDiacritics)(text);
                        textNormalized = text;
                    }
                    if (!(chapterNum === 1 && verseNum === 1)) return [3 /*break*/, 4];
                    return [4 /*yield*/, db.get("SELECT id FROM book WHERE bookKey = ?", [bookKey])];
                case 3:
                    bookId = (_a = (_c.sent())) === null || _a === void 0 ? void 0 : _a.id;
                    console.log(bookId, bookKey, "--- processing");
                    _c.label = 4;
                case 4:
                    if (!(verseNum === 1)) return [3 /*break*/, 6];
                    return [4 /*yield*/, db.get("SELECT id FROM chapter WHERE bookId = ? AND num = ?", [bookId, chapterNum])];
                case 5:
                    chapterId = (_b = (_c.sent())) === null || _b === void 0 ? void 0 : _b.id;
                    _c.label = 6;
                case 6: return [4 /*yield*/, db.get("SELECT id FROM verse WHERE chapterId = ? AND num = ?", [chapterId, verseNum])];
                case 7:
                    verseResult = _c.sent();
                    if (!!verseResult) return [3 /*break*/, 9];
                    return [4 /*yield*/, db.run("INSERT INTO verse (num, chapterId) VALUES (?, ?)", [verseNum, chapterId])];
                case 8:
                    res = _c.sent();
                    verseId = res.lastID;
                    return [3 /*break*/, 10];
                case 9:
                    verseId = verseResult.id;
                    _c.label = 10;
                case 10: return [4 /*yield*/, db.run("INSERT OR IGNORE INTO verse_translation (verseId, lang, text, textNormalized, textDiacritized) VALUES (?, ?, ?, ?, ?)", [verseId, lang, text, textNormalized, textDiacritized])];
                case 11:
                    _c.sent();
                    _c.label = 12;
                case 12:
                    _i++;
                    return [3 /*break*/, 2];
                case 13: return [2 /*return*/];
            }
        });
    });
}
initDatabase();
