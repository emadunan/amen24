### Download original scripts of old testament from tanach.us

BOOKS=("Genesis" "Exodus" "Leviticus" "Numbers" "Deuteronomy" "Joshua" "Judges" "1%20Samuel" "2%20Samuel" "1%20Kings" "2%20Kings" "Isaiah" "Jeremiah" "Ezekiel" "Hosea" "Joel" "Amos" "Obadiah" "Jonah" "Micah" "Nahum" "Habakkuk" "Zephaniah" "Haggai" "Zechariah" "Malachi" "Psalms" "Proverbs" "Job" "Song%20of%20songs" "Ruth" "Lamentations" "Ecclesiastes" "Esther" "Daniel" "Ezra" "Nehemiah" "1%20Chronicles" "2%20Chronicles");

for BOOK_NAME in ${BOOKS[@]};
do
  # Replace %20 with space for filename
  FILE_NAME=$(echo ${BOOK_NAME} | sed 's/%20/ /g')
  
  # Use curl to download
  curl -o "../content/WLC/${FILE_NAME}.txt" "https://www.tanach.us/Server.txt?${BOOK_NAME}*&content=Accents"
done
