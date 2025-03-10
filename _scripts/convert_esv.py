import xml.etree.ElementTree as ET

# Mapping of book names to their abbreviations
book_abbreviations = {
    "Genesis": "GEN", "Exodus": "EXO", "Leviticus": "LEV", "Numbers": "NUM",
    "Deuteronomy": "DEU", "Joshua": "JOS", "Judges": "JDG", "Ruth": "RUT",
    "1 Samuel": "1SA", "2 Samuel": "2SA", "1 Kings": "1KI", "2 Kings": "2KI",
    "1 Chronicles": "1CH", "2 Chronicles": "2CH", "Ezra": "EZR", "Nehemiah": "NEH",
    "Esther": "EST", "Job": "JOB", "Psalms": "PSA", "Proverbs": "PRO",
    "Ecclesiastes": "ECC", "Song of Songs": "SOL", "Isaiah": "ISA", "Jeremiah": "JER",
    "Lamentations": "LAM", "Ezekiel": "EZE", "Daniel": "DAN", "Hosea": "HOS",
    "Joel": "JOE", "Amos": "AMO", "Obadiah": "OBA", "Jonah": "JON",
    "Micah": "MIC", "Nahum": "NAH", "Habakkuk": "HAB", "Zephaniah": "ZEP",
    "Haggai": "HAG", "Zechariah": "ZEC", "Malachi": "MAL", "Matthew": "MAT",
    "Mark": "MAR", "Luke": "LUK", "John": "JOH", "Acts": "ACT",
    "Romans": "ROM", "1 Corinthians": "1CO", "2 Corinthians": "2CO", "Galatians": "GAL",
    "Ephesians": "EPH", "Philippians": "PHI", "Colossians": "COL",
    "1 Thessalonians": "1TH", "2 Thessalonians": "2TH", "1 Timothy": "1TI",
    "2 Timothy": "2TI", "Titus": "TIT", "Philemon": "PHM", "Hebrews": "HEB",
    "James": "JAM", "1 Peter": "1PE", "2 Peter": "2PE", "1 John": "1JO",
    "2 John": "2JO", "3 John": "3JO", "Jude": "JUD", "Revelation": "REV"
}

# Input and output file paths
input_file = "./ESV.xml"
output_file = "./ESV_Bible_2001_cleaned.txt"

# Parse the XML file
tree = ET.parse(input_file)
root = tree.getroot()

output_lines = []

# Iterate over books
for book in root.findall("b"):
    book_name = book.get("n")
    book_abbr = book_abbreviations.get(book_name, book_name[:3].upper())  # Default to first 3 letters if not found
    
    # Iterate over chapters
    for chapter in book.findall("c"):
        chapter_number = chapter.get("n")
        
        # Iterate over verses
        for verse in chapter.findall("v"):
            verse_number = verse.get("n")
            verse_text = verse.text.strip()
            
            # Format the line as "BOOK CHAPTER:VERSE Text"
            output_lines.append(f"{book_abbr} {chapter_number}:{verse_number} {verse_text}")

# Write output to file
with open(output_file, "w", encoding="utf-8") as f:
    f.write("\n".join(output_lines))

print(f"Processing complete. Cleaned file saved as {output_file}")
