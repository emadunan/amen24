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
var normalizeArabicText = function (text) {
    // Remove Arabic diacritics
    var diacriticsRegex = /[\u064B-\u065F]/g;
    text = text.replace(diacriticsRegex, '');
    // Normalize specific Arabic characters
    var normalizationMap = {
        'آ': 'ا', // Alef with Madda → Alef
        'أ': 'ا', // Alef with Hamza Above → Alef
        'إ': 'ا', // Alef with Hamza Below → Alef
        'ٱ': 'ا', // Alef Wasla → Alef (Missed in original)
        'ة': 'ه', // Teh Marbuta → Heh
        'ى': 'ي', // Alef Maksura → Yeh
        'ؤ': 'و', // Waw with Hamza → Waw
        'ئ': 'ي', // Yeh with Hamza → Yeh
        'ٮ': 'ب', // Old Arabic Ba → Ba
        'ٯ': 'ف', // Old Arabic Fa → Fa
        'ڤ': 'ف', // Persian V → Fa (used in some Arabic dialects)
        'پ': 'ب', // Persian Peh → Ba
        'چ': 'ج', // Persian Cheh → Jeem
        'گ': 'ك', // Persian Gaf → Kaf
        '٠': '0',
        '١': '1',
        '٢': '2',
        '٣': '3',
        '٤': '4',
        '٥': '5',
        '٦': '6',
        '٧': '7',
        '٨': '8',
        '٩': '9', // Arabic digits → Standard digits
    };
    text = text.replace(/[آأإٱةىؤئٮٯڤپچگ٠-٩]/g, function (char) { return normalizationMap[char]; });
    return text;
};
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var db, rows, allVerses, updateStmt, _i, allVerses_1, verse, textNormalized, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("START SCRIPT!!");
                    return [4 /*yield*/, (0, sqlite_1.open)({
                            filename: "../data/bible.db",
                            driver: sqlite3_1.default.Database,
                        })];
                case 1:
                    db = _a.sent();
                    console.log("START MAN");
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 13, 14, 16]);
                    return [4 /*yield*/, db.all("PRAGMA table_info(versesAr)")];
                case 3:
                    rows = _a.sent();
                    if (!!rows.some(function (row) { return row.name === "textNormalized"; })) return [3 /*break*/, 5];
                    return [4 /*yield*/, db.exec("ALTER TABLE versesAr ADD COLUMN textNormalized TEXT")];
                case 4:
                    _a.sent();
                    console.log("column 'textNormalized' added successfully.");
                    _a.label = 5;
                case 5: return [4 /*yield*/, db.all("SELECT * FROM versesAr")];
                case 6:
                    allVerses = _a.sent();
                    return [4 /*yield*/, db.prepare("UPDATE versesAr SET textNormalized = ? WHERE id = ?")];
                case 7:
                    updateStmt = _a.sent();
                    _i = 0, allVerses_1 = allVerses;
                    _a.label = 8;
                case 8:
                    if (!(_i < allVerses_1.length)) return [3 /*break*/, 11];
                    verse = allVerses_1[_i];
                    textNormalized = normalizeArabicText(verse.text);
                    return [4 /*yield*/, updateStmt.run(textNormalized, verse.id)];
                case 9:
                    _a.sent();
                    console.log("Verse number " + verse.id + " has been normalizationed");
                    _a.label = 10;
                case 10:
                    _i++;
                    return [3 /*break*/, 8];
                case 11: return [4 /*yield*/, updateStmt.finalize()];
                case 12:
                    _a.sent();
                    console.log("All verses updated successfully!");
                    return [3 /*break*/, 16];
                case 13:
                    err_1 = _a.sent();
                    console.error("Database operation error: ", err_1);
                    return [3 /*break*/, 16];
                case 14: return [4 /*yield*/, db.close()];
                case 15:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 16: return [2 /*return*/];
            }
        });
    });
}
main();
