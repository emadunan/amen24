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
var sqlite3_1 = require("sqlite3");
var sqlite_1 = require("sqlite");
var books_json_1 = __importDefault(require("../data/books.json"));
var promises_1 = require("fs/promises");
function initDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var db, error_1, _a, _b, _c, _i, key, response, bookId, bookMaxlength, chapters, _d, chapters_1, chapter;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, (0, sqlite_1.open)({
                        filename: "../data/bible.db",
                        driver: sqlite3_1.Database,
                    })];
                case 1:
                    db = _e.sent();
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, db.exec("CREATE TABLE IF NOT EXISTS books (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        key TEXT NOT NULL UNIQUE\n        )")];
                case 3:
                    _e.sent();
                    return [4 /*yield*/, db.exec("CREATE TABLE IF NOT EXISTS chapters (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        num INTEGER NOT NULL,\n        bookId INTEGER NOT NULL,\n        FOREIGN KEY (bookId) REFERENCES books (id),\n        UNIQUE (num, bookId)\n        )")];
                case 4:
                    _e.sent();
                    console.log("Books and Chapters tables has been created!!!");
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _e.sent();
                    console.error("Error creating Books or chapters table:", error_1);
                    throw new Error("Database operation failed!");
                case 6:
                    _a = books_json_1.default;
                    _b = [];
                    for (_c in _a)
                        _b.push(_c);
                    _i = 0;
                    _e.label = 7;
                case 7:
                    if (!(_i < _b.length)) return [3 /*break*/, 13];
                    _c = _b[_i];
                    if (!(_c in _a)) return [3 /*break*/, 12];
                    key = _c;
                    if (!Object.prototype.hasOwnProperty.call(books_json_1.default, key)) return [3 /*break*/, 12];
                    return [4 /*yield*/, db.run("INSERT INTO books (key) VALUES (?)", [
                            key,
                        ])];
                case 8:
                    response = _e.sent();
                    bookId = response.lastID;
                    bookMaxlength = books_json_1.default[key].len;
                    chapters = Array.from({ length: bookMaxlength }, function (_, k) { return k + 1; });
                    _d = 0, chapters_1 = chapters;
                    _e.label = 9;
                case 9:
                    if (!(_d < chapters_1.length)) return [3 /*break*/, 12];
                    chapter = chapters_1[_d];
                    return [4 /*yield*/, db.run("INSERT INTO chapters (num, bookId) VALUES (?, ?)", [
                            chapter,
                            bookId,
                        ])];
                case 10:
                    _e.sent();
                    _e.label = 11;
                case 11:
                    _d++;
                    return [3 /*break*/, 9];
                case 12:
                    _i++;
                    return [3 /*break*/, 7];
                case 13: return [4 /*yield*/, db.close()];
                case 14:
                    _e.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function migrate(filePath, bibleVersion) {
    return __awaiter(this, void 0, void 0, function () {
        var db, error_2, BibleData, lines, bookId, chapterId, _i, lines_1, line, result, bookKey, chapterNum, verseNum, verseText;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!/^[a-zA-Z0-9_]+$/.test(bibleVersion)) {
                        throw new Error("Invalid table name");
                    }
                    return [4 /*yield*/, (0, sqlite_1.open)({
                            filename: "../data/bible.db",
                            driver: sqlite3_1.Database,
                        })];
                case 1:
                    db = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, db.exec("CREATE TABLE IF NOT EXISTS ".concat(bibleVersion, " (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        num INTEGER NOT NULL,\n        text TEXT NOT NULL,\n        chapterId INTEGER NOT NULL,\n        FOREIGN KEY (chapterId) REFERENCES chapters (id)\n        )"))];
                case 3:
                    _a.sent();
                    console.log("Verses table has been created!!!");
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error("Error creating verses table:", error_2);
                    throw new Error("Database operation failed!");
                case 5: return [4 /*yield*/, (0, promises_1.readFile)(filePath, "utf-8")];
                case 6:
                    BibleData = _a.sent();
                    lines = BibleData.split("\n");
                    bookId = 0;
                    chapterId = 0;
                    _i = 0, lines_1 = lines;
                    _a.label = 7;
                case 7:
                    if (!(_i < lines_1.length)) return [3 /*break*/, 14];
                    line = lines_1[_i];
                    result = line.match(/^(\S+)\s(\d+):(\d+)\s(.*)$/);
                    if (!result) return [3 /*break*/, 13];
                    bookKey = result.at(1);
                    chapterNum = result.at(2);
                    verseNum = result.at(3);
                    verseText = result.at(4);
                    if (!(chapterNum === "1" && verseNum === "1")) return [3 /*break*/, 9];
                    return [4 /*yield*/, db.get("SELECT id from books where key = ?", [bookKey])];
                case 8:
                    bookId = (_a.sent())
                        .id;
                    console.log(bookId, bookKey, "--- processing!");
                    _a.label = 9;
                case 9:
                    if (!(verseNum === "1")) return [3 /*break*/, 11];
                    return [4 /*yield*/, db.get("SELECT id FROM chapters where bookId = ? AND num = ?", [
                            bookId,
                            chapterNum,
                        ])];
                case 10:
                    chapterId = (_a.sent()).id;
                    _a.label = 11;
                case 11: return [4 /*yield*/, db.run("INSERT INTO ".concat(bibleVersion, " (num, text, chapterId) VALUES (?, ?, ?)"), [verseNum, verseText, chapterId])];
                case 12:
                    _a.sent();
                    _a.label = 13;
                case 13:
                    _i++;
                    return [3 /*break*/, 7];
                case 14: return [4 /*yield*/, db.close()];
                case 15:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// Entry point
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, initDatabase()];
            case 1:
                _a.sent();
                return [4 /*yield*/, migrate("../../content/Holy-Bible---English---Free-Bible-Version---Source-Edition.VPL.txt", "versesEn")];
            case 2:
                _a.sent();
                return [4 /*yield*/, migrate("../../content/Holy-Bible---Arabic---Arabic-Van-Dyck-Bible---Source-Edition.VPL.txt", "versesAr")];
            case 3:
                _a.sent();
                return [4 /*yield*/, migrate("../../content/original-scripts.txt", "versesNative")];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
