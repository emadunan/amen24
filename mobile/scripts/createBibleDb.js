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
// this is a top-level await
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var db, _a, _b, _c, _i, key;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, (0, sqlite_1.open)({
                    filename: "../data/bible.db",
                    driver: sqlite3_1.Database,
                })];
            case 1:
                db = _d.sent();
                // CREATE Books Entity
                return [4 /*yield*/, db.exec("CREATE TABLE IF NOT EXISTS books (\n      id INTEGER PRIMARY KEY AUTOINCREMENT,\n      key TEXT NOT NULL UNIQUE\n      )")];
            case 2:
                // CREATE Books Entity
                _d.sent();
                // CREATE Chapters Entity
                return [4 /*yield*/, db.exec("CREATE TABLE IF NOT EXISTS chapters (\n      id INTEGER PRIMARY KEY AUTOINCREMENT,\n      num INTEGER NOT NULL,\n      bookId INTEGER NOT NULL,\n      FOREIGN KEY (bookId) REFERENCES books (id),\n      UNIQUE (num, bookId)\n      )")];
            case 3:
                // CREATE Chapters Entity
                _d.sent();
                // CREATE Verses Entity -- ENGLISH
                return [4 /*yield*/, db.exec("CREATE TABLE IF NOT EXISTS versesEn (\n      id INTEGER PRIMARY KEY AUTOINCREMENT,\n      num INTEGER NOT NULL,\n      text TEXT NOT NULL,\n      chapterId INTEGER NOT NULL,\n      FOREIGN KEY (chapterId) REFERENCES chapters (id)\n      )")];
            case 4:
                // CREATE Verses Entity -- ENGLISH
                _d.sent();
                console.log("Books, Chapters, and VersesEn tables have been created!!!");
                _a = books_json_1.default;
                _b = [];
                for (_c in _a)
                    _b.push(_c);
                _i = 0;
                _d.label = 5;
            case 5:
                if (!(_i < _b.length)) return [3 /*break*/, 8];
                _c = _b[_i];
                if (!(_c in _a)) return [3 /*break*/, 7];
                key = _c;
                if (!Object.prototype.hasOwnProperty.call(books_json_1.default, key)) return [3 /*break*/, 7];
                return [4 /*yield*/, db.run("INSERT INTO books (key) VALUES (?)", [key])];
            case 6:
                _d.sent();
                _d.label = 7;
            case 7:
                _i++;
                return [3 /*break*/, 5];
            case 8: return [2 /*return*/];
        }
    });
}); })();
