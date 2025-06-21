declare enum BookKey {
    GENESIS = "GEN",
    EXODUS = "EXO",
    LEVITICUS = "LEV",
    NUMBERS = "NUM",
    DEUTERONOMY = "DEU",
    JOSHUA = "JOS",
    JUDGES = "JDG",
    RUTH = "RUT",
    SAMUEL_1 = "1SA",
    SAMUEL_2 = "2SA",
    KINGS_1 = "1KI",
    KINGS_2 = "2KI",
    CHRONICLES_1 = "1CH",
    CHRONICLES_2 = "2CH",
    EZRA = "EZR",
    NEHEMIAH = "NEH",
    ESTHER = "EST",
    JOB = "JOB",
    PSALMS = "PSA",
    PROVERBS = "PRO",
    ECCLESIASTES = "ECC",
    SONG_OF_SONGS = "SOL",
    ISAIAH = "ISA",
    JEREMIAH = "JER",
    LAMENTATIONS = "LAM",
    EZEKIEL = "EZE",
    DANIEL = "DAN",
    HOSEA = "HOS",
    JOEL = "JOE",
    AMOS = "AMO",
    OBADIAH = "OBA",
    JONAH = "JON",
    MICAH = "MIC",
    NAHUM = "NAH",
    HABAKKUK = "HAB",
    ZEPHANIAH = "ZEP",
    HAGGAI = "HAG",
    ZECHARIAH = "ZEC",
    MALACHI = "MAL",
    MATTHEW = "MAT",
    MARK = "MAR",
    LUKE = "LUK",
    JOHN = "JOH",
    ACTS = "ACT",
    ROMANS = "ROM",
    CORINTHIANS_1 = "1CO",
    CORINTHIANS_2 = "2CO",
    GALATIANS = "GAL",
    EPHESIANS = "EPH",
    PHILIPPIANS = "PHI",
    COLOSSIANS = "COL",
    THESSALONIANS_1 = "1TH",
    THESSALONIANS_2 = "2TH",
    TIMOTHY_1 = "1TI",
    TIMOTHY_2 = "2TI",
    TITUS = "TIT",
    PHILEMON = "PHM",
    HEBREWS = "HEB",
    JAMES = "JAM",
    PETER_1 = "1PE",
    PETER_2 = "2PE",
    JOHN_1 = "1JO",
    JOHN_2 = "2JO",
    JOHN_3 = "3JO",
    JUDE = "JUD",
    REVELATION = "REV"
}

declare enum UserRole {
    ADMIN = "admin",
    MANAGER = "manager",
    FEATURED_MODERATOR = "featured_moderator",
    LIBRARY_MODERATOR = "library_moderator",
    GLOSSARY_MODERATOR = "glossary_moderator",
    BLOGGER = "blogger",
    MEMBER_PLUS = "member_plus",
    MEMBER = "member"
}

declare enum Permission {
    LOGIN_ADMINSITE = "login_adminsite",
    READ_DASHBOARD = "read_dashboard",
    READ_MEMBERS = "read_members",
    WRITE_MEMBERS = "write_members",
    READ_AUDITING = "read_auditing",
    MANAGE_VERSE_GROUPS = "manage_verse_groups",
    MANAGE_FEATURED = "manage_featured",
    WRITE_BLOG = "write_blog",
    CREATE_GLOSSARY_TERM = "create_glossary_term",
    UPDATE_GLOSSARY_TERM = "update_glossary_term",
    APPROVE_GLOSSARY_TERM = "approve_glossary_term",
    CREATE_LIBRARY_BOOK = "create_library_book",
    UPDATE_LIBRARY_BOOK = "update_library_book",
    DELETE_LIBRARY_BOOK = "delete_librart_book",
    APPROVE_LIBRARY_BOOK = "approve_library_book"
}

declare enum Lang {
    VOID = "",
    NATIVE = "na",
    ENGLISH = "en",
    ARABIC = "ar",
    HEBREW = "he",
    FRENCH = "fr",
    GERMAN = "de",
    SPANISH = "es",
    ITALIAN = "it",
    PORTUGUESE = "pt",
    RUSSIAN = "ru",
    CHINESE = "zh",
    JAPANESE = "ja",
    KOREAN = "ko",
    TURKISH = "tr",
    PERSIAN = "fa",
    URDU = "ur",
    HINDI = "hi",
    BENGALI = "bn",
    INDONESIAN = "id",
    MALAY = "ms",
    THAI = "th",
    DUTCH = "nl",
    SWEDISH = "sv",
    NORWEGIAN = "no",
    DANISH = "da",
    FINNISH = "fi",
    POLISH = "pl",
    CZECH = "cs",
    HUNGARIAN = "hu",
    ROMANIAN = "ro",
    GREEK = "el",
    UKRAINIAN = "uk",
    VIETNAMESE = "vi",
    SERBIAN = "sr",
    CROATIAN = "hr",
    BULGARIAN = "bg",
    SLOVAK = "sk",
    SLOVENE = "sl",
    LITHUANIAN = "lt",
    LATVIAN = "lv",
    ESTONIAN = "et",
    FILIPINO = "tl",
    SWAHILI = "sw"
}

declare enum ThemeMode {
    DARK = "dark",
    LIGHT = "light"
}

declare enum DateCalendar {
    GREGORIAN = "gregorian",
    COPTIC = "coptic",
    HEBREW = "hebrew"
}

declare enum AuthProvider {
    LOCAL = "local",
    GOOGLE = "google",
    FACEBOOK = "facebook",
    APPLE = "apple"
}

declare enum AuditingAction {
    CREATE_PROFILE = "CREATE_PROFILE",
    UPDATE_PROFILE = "UPDATE_PROFILE",
    DELETE_PROFILE = "DELETE_USER",
    RESET_PASSWORD = "RESET_PASSWORD",
    SEARCH_BIBLE = "SEARCH_BIBLE",
    OPEN_BIBLE = "OPEN_BIBLE",
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT"
}

declare enum SysLogLevel {
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
    DEBUG = "debug"
}

declare enum GlossaryCategory {
    DivineName = "divine-name",
    Character = "character",
    Place = "place",
    Object = "object",
    Event = "event",
    Scripture = "scripture",
    Concept = "concept",
    Other = "other"
}

declare enum ApprovalStatus {
    Pending = "pending",
    Approved = "approved",
    Rejected = "rejected"
}

declare enum FeaturedPosition {
    UNASSIGNED = "",
    HOMEPAGE_FEATURED_1 = "homepage.featured.1",
    HOMEPAGE_FEATURED_2 = "homepage.featured.2",
    HOMEPAGE_FEATURED_3 = "homepage.featured.3"
}

declare enum Denomination {
    NonDenominational = "non-denominational",
    Catholic = "catholic",
    Orthodox = "orthodox",
    Protestant = "protestant",
    Evangelical = "evangelical",
    Anglican = "anglican",
    Other = "other"
}
declare enum Church {
    CopticOrthodox = "coptic-orthodox",
    EasternOrthodox = "eastern-orthodox",
    RussianOrthodox = "russian-orthodox",
    GreekOrthodox = "greek-orthodox",
    RomanCatholic = "roman-catholic",
    EasternCatholic = "eastern-catholic",
    Lutheran = "lutheran",
    Reformed = "reformed",
    Methodist = "methodist",
    Baptist = "baptist",
    EvangelicalFree = "evangelical-free",
    Pentecostal = "pentecostal",
    Charismatic = "charismatic",
    AnglicanCommunion = "anglican-communion",
    Episcopal = "episcopal",
    NonDenominational = "non-denominational",
    Other = "other"
}
declare const ChurchToDenomination: Record<Church, Denomination>;

declare enum BookCategory {
    BiblicalStudies = "biblical-studies",
    ChurchHistory = "church-history",
    Commentaries = "commentaries",
    Liturgical = "liturgical",
    Other = "other"
}

declare const isOldTestament: (bookKey: string) => boolean;
declare function resolveRenderLang(lang: Lang, bookKey: BookKey): Lang.VOID | Lang.ENGLISH | Lang.ARABIC | Lang.HEBREW | Lang.FRENCH | Lang.GERMAN | Lang.SPANISH | Lang.ITALIAN | Lang.PORTUGUESE | Lang.RUSSIAN | Lang.CHINESE | Lang.JAPANESE | Lang.KOREAN | Lang.TURKISH | Lang.PERSIAN | Lang.URDU | Lang.HINDI | Lang.BENGALI | Lang.INDONESIAN | Lang.MALAY | Lang.THAI | Lang.DUTCH | Lang.SWEDISH | Lang.NORWEGIAN | Lang.DANISH | Lang.FINNISH | Lang.POLISH | Lang.CZECH | Lang.HUNGARIAN | Lang.ROMANIAN | Lang.GREEK | Lang.UKRAINIAN | Lang.VIETNAMESE | Lang.SERBIAN | Lang.CROATIAN | Lang.BULGARIAN | Lang.SLOVAK | Lang.SLOVENE | Lang.LITHUANIAN | Lang.LATVIAN | Lang.ESTONIAN | Lang.FILIPINO | Lang.SWAHILI;
declare const getBookKeyBySlug: (slug: string) => string | undefined;

declare function formatNumber(num: number, lang: Lang): string;

declare const hasPermission: (roles: UserRole[], permission: Permission) => boolean;

interface FeaturedText {
    id: number;
    lang: Lang;
    text: string;
    featured: Featured;
}

interface Featured {
    id: number;
    verseGroup: VerseGroup;
    featuredText: FeaturedText[];
    position: FeaturedPosition;
}

interface Book {
    id: number;
    slug: string;
    bookKey: BookKey;
    chapters: Chapter[];
}

interface Chapter {
    id: number;
    num: number;
    verses: Verse[];
    book: Book;
}

interface VerseTranslation {
    id: number;
    lang: Lang;
    text?: string;
    textNormalized?: string;
    textDiacritized?: string;
    verse: Verse;
}

interface Verse {
    id: number;
    num: number;
    chapter: Chapter;
    verseGroups: VerseGroup[];
    verseTranslations: VerseTranslation[];
}

interface VerseGroup {
    id: number;
    createdAt: Date;
    startingVerse: Verse;
    favorites: Favorite[];
    featured: Featured;
    verses: Verse[];
}

interface Favorite {
    id: number;
    profile: Profile;
    verseGroup: VerseGroup;
}

interface Profile {
    email: string;
    users: User[];
    roles: UserRole[];
    createdAt: Date;
    lastLogin: Date;
    uiLang: Lang | null;
    fontSize: number;
    themeMode: ThemeMode;
    dateCalendar: DateCalendar;
    isDiacritized: boolean;
    favorites: Favorite[];
}
interface ProfileStatistics {
    users: {
        total: number;
        loggedInToday: number;
        createdToday: number;
    };
    uiLang: {
        en: number;
        ar: number;
    };
    theme: {
        light: number;
        dark: number;
    };
    calendars: {
        gregorian: number;
        hebrew: number;
        coptic: number;
    };
    providers: {
        local: number;
        google: number;
        facebook: number;
    };
}

interface User {
    id: string;
    email: string;
    password: string;
    displayName: string;
    provider: AuthProvider;
    providerId: string;
    profile: Profile;
    photoUri: string;
    isActive: boolean;
    isVerified: boolean;
    failedAttempts: number;
    lockUntil: Date | null;
}

interface Progress {
    id: number;
    title: string;
    profile: Profile;
    verse: Verse;
    updatedAt: Date;
}

interface VerseResult {
    id: number;
    bookKey: BookKey;
    chapterNum: number;
    verseNum: number;
    text: string;
    lang: Lang;
}

interface AuditingRecord {
    id: number;
    action: string;
    performedBy: string;
    metadata?: string;
    createdAt: Date;
}

interface BibleGlossaryTranslation {
    id: number;
    lang: Lang;
    term: string;
    definition: string;
    oldDefinition: string;
    glossary: BibleGlossary;
}

interface BibleGlossary {
    id: number;
    slug: string;
    native: string;
    category: GlossaryCategory;
    approvalStatus?: ApprovalStatus;
    verses: Verse[];
    translations: BibleGlossaryTranslation[];
}
interface BibleGlossaryQuery {
    slug?: string;
    lang?: Lang;
    term?: string;
    bookKey?: string;
    chapter?: string;
    approvalStatus?: string;
    page?: number;
    limit?: number;
}

interface LibraryChapter {
    id: string;
    title: string;
    order: number;
    content: string;
    normalizedContent: string;
    book: LibraryBook;
}
interface CreateLibraryChapterDto {
    title: string;
    order: number;
    lang: Lang;
    content: string;
    normalizedContent: string;
    bookId: string;
}

interface LibraryBook {
    id: string;
    title: string;
    slug: string;
    author: string;
    description: string;
    category: BookCategory;
    denomination: Denomination;
    church: Church;
    lang: Lang;
    year: number;
    approvalStatus: ApprovalStatus;
    chapters: LibraryChapter[];
    createdAt: Date;
    updatedAt: Date;
}

declare function normalizeText(text: string, lang: Lang): string;
declare function removeNaDiacritics(text: string): string;
declare function removeHebrewDiacritics(text: string): string;
declare function removeGreekDiacritics(text: string): string;
declare function removeArDiacritics(text: string): string;
declare function replaceWaslaAlef(text: string): string;
declare function normalizeArText(text: string): string;
declare function detectLanguage(text: string): Lang;
declare function buildJoinedText(verses: Verse[], lang: Lang): string;
declare function sanitizeWord(input: string): string;

declare function convertToSuperscript(num: number): string;

type ApiMessage = {
    message: string;
};

type PaginatedResult<T> = {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        lastPage: number;
    };
};

declare const locales: {
    ar: {
        book: {
            WholeBible: string;
            OldTestament: string;
            NewTestament: string;
            Torah: string;
            Historical: string;
            Wisdom: string;
            Prophetic: string;
            Gospels: string;
            Epistles: string;
            GEN: string;
            EXO: string;
            LEV: string;
            NUM: string;
            DEU: string;
            JOS: string;
            JDG: string;
            RUT: string;
            "1SA": string;
            "2SA": string;
            "1KI": string;
            "2KI": string;
            "1CH": string;
            "2CH": string;
            EZR: string;
            NEH: string;
            EST: string;
            JOB: string;
            PSA: string;
            PRO: string;
            ECC: string;
            SOL: string;
            ISA: string;
            JER: string;
            LAM: string;
            EZE: string;
            DAN: string;
            HOS: string;
            JOE: string;
            AMO: string;
            OBA: string;
            JON: string;
            MIC: string;
            NAH: string;
            HAB: string;
            ZEP: string;
            HAG: string;
            ZEC: string;
            MAL: string;
            MAT: string;
            MAR: string;
            LUK: string;
            JOH: string;
            ACT: string;
            ROM: string;
            "1CO": string;
            "2CO": string;
            GAL: string;
            EPH: string;
            PHI: string;
            COL: string;
            "1TH": string;
            "2TH": string;
            "1TI": string;
            "2TI": string;
            TIT: string;
            PHM: string;
            HEB: string;
            JAM: string;
            "1PE": string;
            "2PE": string;
            "1JO": string;
            "2JO": string;
            "3JO": string;
            JUD: string;
            REV: string;
        };
        writer: {
            moses: string;
            joshua: string;
            samuel: string;
            jeremiah: string;
            ezra: string;
            nehemiah: string;
            mordecai: string;
            david: string;
            solomon: string;
            isaiah: string;
            ezekiel: string;
            daniel: string;
            hosea: string;
            joel: string;
            amos: string;
            obadiah: string;
            jonah: string;
            micah: string;
            nahum: string;
            habakkuk: string;
            zephaniah: string;
            haggai: string;
            zechariah: string;
            malachi: string;
            matthew: string;
            mark: string;
            luke: string;
            john: string;
            paul: string;
            james: string;
            peter: string;
            jude: string;
        };
        common: {
            main: {
                exit: string;
                exitTitle: string;
                exitDialog: string;
                home: string;
                back: string;
                bible: string;
                bibleIndex: string;
                readMore: string;
                search: string;
                glossary: string;
                prev: string;
                next: string;
                add: string;
                clear: string;
                cancel: string;
                remove: string;
                noResult: string;
                searchWelcome: string;
                locale: string;
                contactUsTitle: string;
                contactUsDescription: string;
            };
            homepage: {
                title: string;
                description: string;
                bibleSectionHeading: string;
                bibleSectionParagraph: string;
                bibleSectionButton: string;
                messiahSectionHeading: string;
                messiahSectionParagraph1: string;
                messiahSectionParagraph2: string;
                messiahSectionButton: string;
                searchSectionHeading: string;
                searchSectionParagraph: string;
                searchSectionButton: string;
                glossarySectionHeading: string;
                glossarySectionParagraph: string;
                glossarySectionButton: string;
            };
            chapter: {
                title: string;
                showTranslation: string;
                hideTranslation: string;
            };
            searchEngine: {
                title: string;
                inviteMessage: string;
                searchButtonText: string;
                filterButtonText: string;
                resultsCount: string;
                resetSearch: string;
                queryTooShort: string;
                noBooksSelected: string;
            };
            glossary: {
                title: string;
                filter: string;
                filterPlaceholder: string;
            };
            library: {
                title: string;
                index: string;
            };
            signin: {
                email: string;
                displayName: string;
                login: string;
                googleLogin: string;
                facebookLogin: string;
                emailLogin: string;
                signup: string;
                password: string;
                confirmPassword: string;
                signupInvite: string;
                oldPassword: string;
                newPassword: string;
                resetPassword: string;
                sendResetLink: string;
                passwordInvite: string;
            };
            progress: {
                lastRead: string;
                oldTestament: string;
                newTestament: string;
            };
            userMenu: {
                featured: string;
                favorite: string;
                settings: string;
                logout: string;
            };
            profileSettings: {
                title: string;
                email: string;
                connectedAccounts: string;
                fontSize: string;
                small: string;
                medium: string;
                large: string;
                diacritizedText: string;
                deleteAccount: string;
            };
            toolbox: {
                title: string;
                copy: string;
                addToGlossary: string;
                addGlossaryTerm: string;
                addToFavorites: string;
                addToFeatured: string;
                progress: string;
                clearHighlighting: string;
                copiedToClipboard: string;
                lastReadSaved: string;
            };
            footer: {
                copyright: string;
                privacyPolicy: string;
                termsOfService: string;
            };
        };
        lang: {
            na: string;
            en: string;
            ar: string;
            he: string;
            fr: string;
            de: string;
            es: string;
            it: string;
            pt: string;
            ru: string;
            zh: string;
            ja: string;
            ko: string;
            tr: string;
            fa: string;
            ur: string;
            hi: string;
            bn: string;
            id: string;
            ms: string;
            th: string;
            nl: string;
            sv: string;
            no: string;
            da: string;
            fi: string;
            pl: string;
            cs: string;
            hu: string;
            ro: string;
            el: string;
            uk: string;
            vi: string;
            sr: string;
            hr: string;
            bg: string;
            sk: string;
            sl: string;
            lt: string;
            lv: string;
            et: string;
            tl: string;
            sw: string;
        };
        privacy: {
            title: string;
            intro: string;
            information: {
                title: string;
                name: string;
                email: string;
                preferences: string;
            };
            collection: {
                title: string;
                registration: string;
                thirdPartyLogin: string;
            };
            usage: {
                title: string;
                improveServices: string;
                sendEmails: string;
                personalization: string;
                ads: string;
            };
            thirdParty: {
                title: string;
                analytics: string;
                ads: string;
            };
            userRights: {
                title: string;
                edit: string;
                deleteAccount: string;
                optOutEmails: string;
            };
            dataDeletionInstructions: {
                title: string;
                description: string;
            };
            security: {
                title: string;
                encryption: string;
                accessControls: string;
                audits: string;
            };
            compliance: {
                title: string;
                description: string;
            };
            contact: {
                title: string;
                email: string;
            };
            lastUpdated: string;
        };
        terms: {
            title: string;
            intro: string;
            agreement: {
                title: string;
                description: string;
            };
            account: {
                title: string;
                responsibility: string;
                security: string;
            };
            usage: {
                title: string;
                lawful: string;
                prohibitedActivities: string;
            };
            contentRights: {
                title: string;
                ownership: string;
                license: string;
                translations: {
                    title: string;
                    ESV: {
                        owner: string;
                        license: string;
                        details: string;
                    };
                    SVD: {
                        owner: string;
                        license: string;
                        details: string;
                    };
                };
            };
            termination: {
                title: string;
                description: string;
            };
            disclaimer: {
                title: string;
                description: string;
            };
            liability: {
                title: string;
                description: string;
            };
            changes: {
                title: string;
                description: string;
            };
            contact: {
                title: string;
                email: string;
            };
            lastUpdated: string;
        };
        month: {
            gregorian: {
                "1": string;
                "2": string;
                "3": string;
                "4": string;
                "5": string;
                "6": string;
                "7": string;
                "8": string;
                "9": string;
                "10": string;
                "11": string;
                "12": string;
            };
            coptic: {
                "1": string;
                "2": string;
                "3": string;
                "4": string;
                "5": string;
                "6": string;
                "7": string;
                "8": string;
                "9": string;
                "10": string;
                "11": string;
                "12": string;
                "13": string;
            };
            hebrew: {
                "1": string;
                "2": string;
                "3": string;
                "4": string;
                "5": string;
                "6": string;
                "7": string;
                "8": string;
                "9": string;
                "10": string;
                "11": string;
                "12": string;
                "13": string;
            };
        };
        error: {
            unknownError: string;
            failedToFetch: string;
            failedToChangeLanguage: string;
            loginFailed: string;
            logoutFailed: string;
            accountLocked: string;
            userDuplication: string;
            userNotCreated: string;
            emailNotFound: string;
            userNotFound: string;
            profileNotFound: string;
            passwordInvalid: string;
            passwordMismatch: string;
            unauthorizedAccess: string;
            highlightVerse: string;
            highlightSingleVerseOnly: string;
            passwordTooShort: string;
            invalidOrExpiredToken: string;
            sessionExpired: string;
            sessionNotExist: string;
            noOldPasswordFound: string;
            progressNotFound: string;
            progressExceedLimit: string;
            verseGroupFavorited: string;
            verseGroupFeatured: string;
            glossaryNotFound: string;
            glossaryMissingTerm: string;
            glossaryTermExist: string;
        };
        message: {
            userCreated: string;
            userDeleted: string;
            passwordUpdated: string;
            passwordResetEmailSent: string;
            loggedInSuccessfully: string;
            loggedOutSuccessfully: string;
            userProfileUpdated: string;
            removedFromFavorites: string;
            addedToFavorites: string;
            addedToFeatured: string;
            addedToGlossary: string;
            connectedWithGlossary: string;
        };
    };
    en: {
        book: {
            WholeBible: string;
            OldTestament: string;
            NewTestament: string;
            Torah: string;
            Historical: string;
            Wisdom: string;
            Prophetic: string;
            Gospels: string;
            Epistles: string;
            GEN: string;
            EXO: string;
            LEV: string;
            NUM: string;
            DEU: string;
            JOS: string;
            JDG: string;
            RUT: string;
            "1SA": string;
            "2SA": string;
            "1KI": string;
            "2KI": string;
            "1CH": string;
            "2CH": string;
            EZR: string;
            NEH: string;
            EST: string;
            JOB: string;
            PSA: string;
            PRO: string;
            ECC: string;
            SOL: string;
            ISA: string;
            JER: string;
            LAM: string;
            EZE: string;
            DAN: string;
            HOS: string;
            JOE: string;
            AMO: string;
            OBA: string;
            JON: string;
            MIC: string;
            NAH: string;
            HAB: string;
            ZEP: string;
            HAG: string;
            ZEC: string;
            MAL: string;
            MAT: string;
            MAR: string;
            LUK: string;
            JOH: string;
            ACT: string;
            ROM: string;
            "1CO": string;
            "2CO": string;
            GAL: string;
            EPH: string;
            PHI: string;
            COL: string;
            "1TH": string;
            "2TH": string;
            "1TI": string;
            "2TI": string;
            TIT: string;
            PHM: string;
            HEB: string;
            JAM: string;
            "1PE": string;
            "2PE": string;
            "1JO": string;
            "2JO": string;
            "3JO": string;
            JUD: string;
            REV: string;
        };
        writer: {
            moses: string;
            joshua: string;
            samuel: string;
            jeremiah: string;
            ezra: string;
            nehemiah: string;
            mordecai: string;
            david: string;
            solomon: string;
            isaiah: string;
            ezekiel: string;
            daniel: string;
            hosea: string;
            joel: string;
            amos: string;
            obadiah: string;
            jonah: string;
            micah: string;
            nahum: string;
            habakkuk: string;
            zephaniah: string;
            haggai: string;
            zechariah: string;
            malachi: string;
            matthew: string;
            mark: string;
            luke: string;
            john: string;
            paul: string;
            james: string;
            peter: string;
            jude: string;
        };
        common: {
            main: {
                exit: string;
                exitTitle: string;
                exitDialog: string;
                home: string;
                back: string;
                bible: string;
                bibleIndex: string;
                readMore: string;
                search: string;
                glossary: string;
                prev: string;
                next: string;
                add: string;
                clear: string;
                cancel: string;
                remove: string;
                noResult: string;
                searchWelcome: string;
                locale: string;
                contactUsTitle: string;
                contactUsDescription: string;
            };
            homepage: {
                title: string;
                description: string;
                bibleSectionHeading: string;
                bibleSectionParagraph: string;
                bibleSectionButton: string;
                messiahSectionHeading: string;
                messiahSectionParagraph1: string;
                messiahSectionParagraph2: string;
                messiahSectionButton: string;
                searchSectionHeading: string;
                searchSectionParagraph: string;
                searchSectionButton: string;
                glossarySectionHeading: string;
                glossarySectionParagraph: string;
                glossarySectionButton: string;
            };
            chapter: {
                title: string;
                showTranslation: string;
                hideTranslation: string;
            };
            searchEngine: {
                title: string;
                inviteMessage: string;
                searchButtonText: string;
                filterButtonText: string;
                resultsCount: string;
                resetSearch: string;
                queryTooShort: string;
                noBooksSelected: string;
            };
            glossary: {
                title: string;
                filter: string;
                filterPlaceholder: string;
            };
            library: {
                title: string;
                index: string;
            };
            signin: {
                email: string;
                displayName: string;
                login: string;
                googleLogin: string;
                facebookLogin: string;
                emailLogin: string;
                signup: string;
                signupInvite: string;
                password: string;
                confirmPassword: string;
                oldPassword: string;
                newPassword: string;
                resetPassword: string;
                sendResetLink: string;
                passwordInvite: string;
            };
            progress: {
                lastRead: string;
                oldTestament: string;
                newTestament: string;
            };
            userMenu: {
                featured: string;
                favorite: string;
                settings: string;
                logout: string;
            };
            profileSettings: {
                title: string;
                email: string;
                connectedAccounts: string;
                fontSize: string;
                small: string;
                medium: string;
                large: string;
                diacritizedText: string;
                deleteAccount: string;
            };
            toolbox: {
                title: string;
                copy: string;
                addToGlossary: string;
                addGlossaryTerm: string;
                addToFavorites: string;
                addToFeatured: string;
                progress: string;
                clearHighlighting: string;
                copiedToClipboard: string;
                lastReadSaved: string;
            };
            footer: {
                copyright: string;
                privacyPolicy: string;
                termsOfService: string;
            };
        };
        lang: {
            na: string;
            en: string;
            ar: string;
            he: string;
            fr: string;
            de: string;
            es: string;
            it: string;
            pt: string;
            ru: string;
            zh: string;
            ja: string;
            ko: string;
            tr: string;
            fa: string;
            ur: string;
            hi: string;
            bn: string;
            id: string;
            ms: string;
            th: string;
            nl: string;
            sv: string;
            no: string;
            da: string;
            fi: string;
            pl: string;
            cs: string;
            hu: string;
            ro: string;
            el: string;
            uk: string;
            vi: string;
            sr: string;
            hr: string;
            bg: string;
            sk: string;
            sl: string;
            lt: string;
            lv: string;
            et: string;
            tl: string;
            sw: string;
        };
        privacy: {
            title: string;
            intro: string;
            information: {
                title: string;
                name: string;
                email: string;
                preferences: string;
            };
            collection: {
                title: string;
                registration: string;
                thirdPartyLogin: string;
            };
            usage: {
                title: string;
                improveServices: string;
                sendEmails: string;
                personalization: string;
                ads: string;
            };
            thirdParty: {
                title: string;
                analytics: string;
                ads: string;
            };
            userRights: {
                title: string;
                edit: string;
                deleteAccount: string;
                optOutEmails: string;
            };
            dataDeletionInstructions: {
                title: string;
                description: string;
            };
            security: {
                title: string;
                encryption: string;
                accessControls: string;
                audits: string;
            };
            compliance: {
                title: string;
                description: string;
            };
            contact: {
                title: string;
                email: string;
            };
            lastUpdated: string;
        };
        terms: {
            title: string;
            intro: string;
            agreement: {
                title: string;
                description: string;
            };
            account: {
                title: string;
                responsibility: string;
                security: string;
            };
            usage: {
                title: string;
                lawful: string;
                prohibitedActivities: string;
            };
            contentRights: {
                title: string;
                ownership: string;
                license: string;
                translations: {
                    title: string;
                    ESV: {
                        owner: string;
                        license: string;
                        details: string;
                    };
                    SVD: {
                        owner: string;
                        license: string;
                        details: string;
                    };
                };
            };
            termination: {
                title: string;
                description: string;
            };
            disclaimer: {
                title: string;
                description: string;
            };
            liability: {
                title: string;
                description: string;
            };
            changes: {
                title: string;
                description: string;
            };
            contact: {
                title: string;
                email: string;
            };
            lastUpdated: string;
        };
        month: {
            gregorian: {
                "1": string;
                "2": string;
                "3": string;
                "4": string;
                "5": string;
                "6": string;
                "7": string;
                "8": string;
                "9": string;
                "10": string;
                "11": string;
                "12": string;
            };
            coptic: {
                "1": string;
                "2": string;
                "3": string;
                "4": string;
                "5": string;
                "6": string;
                "7": string;
                "8": string;
                "9": string;
                "10": string;
                "11": string;
                "12": string;
                "13": string;
            };
            hebrew: {
                "1": string;
                "2": string;
                "3": string;
                "4": string;
                "5": string;
                "6": string;
                "7": string;
                "8": string;
                "9": string;
                "10": string;
                "11": string;
                "12": string;
                "13": string;
            };
        };
        error: {
            unknownError: string;
            failedToFetch: string;
            failedToChangeLanguage: string;
            loginFailed: string;
            logoutFailed: string;
            accountLocked: string;
            userDuplication: string;
            userNotCreated: string;
            emailNotFound: string;
            userNotFound: string;
            profileNotFound: string;
            passwordInvalid: string;
            passwordMismatch: string;
            unauthorizedAccess: string;
            highlightVerse: string;
            highlightSingleVerseOnly: string;
            passwordTooShort: string;
            invalidOrExpiredToken: string;
            sessionExpired: string;
            sessionNotExist: string;
            noOldPasswordFound: string;
            progressNotFound: string;
            progressExceedLimit: string;
            verseGroupFavorited: string;
            verseGroupFeatured: string;
            glossaryNotFound: string;
            glossaryMissingTerm: string;
            glossaryTermExist: string;
        };
        message: {
            userCreated: string;
            userDeleted: string;
            passwordUpdated: string;
            passwordResetEmailSent: string;
            loggedInSuccessfully: string;
            loggedOutSuccessfully: string;
            userProfileUpdated: string;
            removedFromFavorites: string;
            addedToFavorites: string;
            addedToFeatured: string;
            addedToGlossary: string;
            connectedWithGlossary: string;
        };
    };
};

declare const langMap: {
    na: string;
    en: string;
    ar: string;
    he: string;
    fr: string;
    de: string;
    es: string;
    it: string;
    pt: string;
    ru: string;
    zh: string;
    ja: string;
    ko: string;
    tr: string;
    fa: string;
    ur: string;
    hi: string;
    bn: string;
    id: string;
    ms: string;
    th: string;
    nl: string;
    sv: string;
    no: string;
    da: string;
    fi: string;
    pl: string;
    cs: string;
    hu: string;
    ro: string;
    el: string;
    uk: string;
    vi: string;
    sr: string;
    hr: string;
    bg: string;
    sk: string;
    sl: string;
    lt: string;
    lv: string;
    et: string;
    tl: string;
    sw: string;
};
declare const flagMap: Record<string, string>;

declare const BookMap: {
    GEN: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    EXO: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    LEV: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    NUM: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    DEU: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    JOS: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    JDG: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    RUT: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    "1SA": {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    "2SA": {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    "1KI": {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    "2KI": {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    "1CH": {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    "2CH": {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    EZR: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    NEH: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    EST: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    JOB: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    PSA: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    PRO: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    ECC: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    SOL: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    ISA: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    JER: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    LAM: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    EZE: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    DAN: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    HOS: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    JOE: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    AMO: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    OBA: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    JON: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    MIC: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    NAH: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    HAB: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    ZEP: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    HAG: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    ZEC: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    MAL: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    MAT: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    MAR: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    LUK: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    JOH: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    ACT: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    ROM: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    "1CO": {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    "2CO": {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    GAL: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    EPH: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    PHI: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    COL: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    "1TH": {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    "2TH": {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    "1TI": {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    "2TI": {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    TIT: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    PHM: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    HEB: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    JAM: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    "1PE": {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    "2PE": {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    "1JO": {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    "2JO": {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    "3JO": {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    JUD: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
    REV: {
        id: number;
        key: string;
        slug: string;
        title: {
            en: string;
            ar: string;
        };
        titleDiacrited: {
            en: string;
            ar: string;
        };
        titleFull: {
            en: string;
            ar: string;
        };
        writer: string;
        len: number;
        description: {
            en: string;
            ar: string;
        };
    };
};
declare const books: string[];
declare const bookList: string[];

/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
declare const Colors: {
    light: {
        text: string;
        background: string;
        primary: string;
        secondary: string;
        accent: string;
        highlight: string;
    };
    dark: {
        text: string;
        background: string;
        primary: string;
        secondary: string;
        accent: string;
        highlight: string;
    };
};

declare const ERROR_KEYS: {
    readonly UNKNOWN_ERROR: "error:unknownError";
    readonly EMAIL_NOT_FOUND: "error:emailNotFound";
    readonly USER_NOT_FOUND: "error:userNotFound";
    readonly PROFILE_NOT_FOUND: "error:profileNotFound";
    readonly USER_NOT_CREATED: "error:userNotCreated";
    readonly LOGIN_FAILED: "error:loginFailed";
    readonly LOGOUT_FAILED: "error:logoutFailed";
    readonly ACCOUNT_LOCKED: "error:accountLocked";
    readonly USER_DUPLICATION: "error:userDuplication";
    readonly PASSWORD_INVALID: "error:passwordInvalid";
    readonly PASSWORD_MISMATCH: "error:passwordMismatch";
    readonly PASSWORD_TOO_SHORT: "error:passwordTooShort";
    readonly INVALID_OR_EXPIRED_TOKEN: "error:invalidOrExpiredToken";
    readonly INVALID_REFRESH_TOKEN: "error:invalidRefreshToken";
    readonly SESSION_EXPIRED: "error:sessionExpired";
    readonly SESSION_NOT_EXIST: "error:sessionNotExist";
    readonly UNAUTHORIZED_ACCESS: "error:unauthorizedAccess";
    readonly FAILED_TO_FETCH: "error:failedToFetch";
    readonly FAILED_TO_CHANGE_LANGUAGE: "error:failedToChangeLanguage";
    readonly HIGHLIGHT_VERSE: "error:highlightVerse";
    readonly HIGHLIGHT_SINGLE_VERSE_ONLY: "error:highlightSingleVerseOnly";
    readonly NO_OLD_PASSWORD_FOUND: "error:noOldPasswordFound";
    readonly PROGRESS_NOT_FOUND: "error:progressNotFound";
    readonly PROGRESS_EXCEED_LIMIT: "error:progressExceedLimit";
    readonly VERSE_GROUP_FAVORITED: "error:verseGroupFavorited";
    readonly VERSE_GROUP_FEATURED: "error:verseGroupFeatured";
    readonly GLOSSARY_NOT_FOUND: "error:glossaryNotFound";
    readonly GLOSSARY_MISSING_TERM: "error:glossaryMissingTerm";
    readonly GLOSSARY_TERM_EXIST: "error:glossaryTermExist";
};

declare const MESSAGE_KEYS: {
    readonly UNKNOWN_SUCCESS: "message:unknownSuccess";
    readonly USER_CREATED: "message:userCreated";
    readonly USER_DELETED: "message:userDeleted";
    readonly PASSWORD_UPDATED: "message:passwordUpdated";
    readonly PASSWORD_RESET_EMAIL_SENT: "message:passwordResetEmailSent";
    readonly LOGGED_IN_SUCCESSFULLY: "message:loggedInSuccessfully";
    readonly LOGGED_OUT_SUCCESSFULLY: "message:loggedOutSuccessfully";
    readonly USER_PROFILE_UPDATED: "message:userProfileUpdated";
    readonly ADDED_TO_FAVORITES: "message:addedToFavorites";
    readonly ADDED_TO_FEATURED: "message:addedToFeatured";
    readonly ADDED_TO_GLOSSARY: "message:addedToGlossary";
    readonly CONNECTED_WITH_GLOSSARY: "message:connectedWithGlossary";
};

declare const PageMetadata: {
    search: {
        title: {
            en: string;
            ar: string;
        };
        description: {
            en: string;
            ar: string;
        };
    };
};

export { type ApiMessage, ApprovalStatus, AuditingAction, type AuditingRecord, AuthProvider, type BibleGlossary, type BibleGlossaryQuery, type BibleGlossaryTranslation, type Book, BookCategory, BookKey, BookMap, type Chapter, Church, ChurchToDenomination, Colors, type CreateLibraryChapterDto, DateCalendar, Denomination, ERROR_KEYS, type Favorite, type Featured, FeaturedPosition, type FeaturedText, GlossaryCategory, Lang, type LibraryBook, type LibraryChapter, MESSAGE_KEYS, PageMetadata, type PaginatedResult, Permission, type Profile, type ProfileStatistics, type Progress, SysLogLevel, ThemeMode, type User, UserRole, type Verse, type VerseGroup, type VerseResult, type VerseTranslation, bookList, books, buildJoinedText, convertToSuperscript, detectLanguage, flagMap, formatNumber, getBookKeyBySlug, hasPermission, isOldTestament, langMap, locales, normalizeArText, normalizeText, removeArDiacritics, removeGreekDiacritics, removeHebrewDiacritics, removeNaDiacritics, replaceWaslaAlef, resolveRenderLang, sanitizeWord };
