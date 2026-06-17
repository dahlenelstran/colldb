import csv

CSV_FILE = "legoCSV.csv"
SQL_FILE = "legoInsert.sql"

RELEVANT_COLUMNS = ["Theme", "Set Number", "Set Name", "Release Date", "Minifigures", "Piece Count", "MSRP"]

themes = {}
theme_id_counter = 1
sets = []
skipped_sets = []

with open(CSV_FILE, encoding="utf-8-sig") as f:
    reader = csv.DictReader(f)
    line_number = 2  # Data starts at line 2 (after header)
    for row in reader:
        if not all(row.get(col, "").strip() for col in RELEVANT_COLUMNS):
            skipped_sets.append((line_number, row))
            line_number += 1
            continue

        theme = row["Theme"].strip()
        if theme not in themes:
            themes[theme] = theme_id_counter
            theme_id_counter += 1

        try:
            set_number = row["Set Number"].strip()
            set_name = row["Set Name"].replace("'", "''").strip()
            year = int(row["Release Date"].strip())
            minifigs = int(row["Minifigures"].strip())
            pieces = int(row["Piece Count"].strip())
            msrp = row["MSRP"].strip().replace("$", "")
            if msrp == "":
                msrp = "NULL"
            else:
                msrp = float(msrp)
            theme_id = themes[theme]
            sets.append({
                "set_number": set_number,
                "title": set_name,
                "year": year,
                "minifigs": minifigs,
                "pieces": pieces,
                "msrp": msrp,
                "theme_id": theme_id
            })
        except Exception:
            skipped_sets.append((line_number, row))
        line_number += 1

with open(SQL_FILE, "w", encoding="utf-8") as f:
    # Write theme inserts with explicit IDs, using OVERRIDING SYSTEM VALUE
    f.write("-- Insert unique themes\n")
    for theme, theme_id in themes.items():
        f.write(f"INSERT INTO lego_themes (id, title, licensed) OVERRIDING SYSTEM VALUE VALUES ({theme_id}, '{theme.replace('\'', '\'\'')}', FALSE);\n")
    f.write("\n")

    # Write inserts for lego sets
    f.write("-- Insert lego sets\n")
    for s in sets:
        msrp_value = "NULL" if s["msrp"] == "NULL" else s["msrp"]
        f.write(
            "INSERT INTO lego (set_number, title, year, minifigs, pieces, msrp, theme_id) "
            f"VALUES ('{s['set_number']}', '{s['title']}', {s['year']}, {s['minifigs']}, {s['pieces']}, {msrp_value}, {s['theme_id']});\n"
        )
    f.write("\n")

    # Report skipped sets with line numbers
    if skipped_sets:
        f.write("-- Skipped sets due to missing/invalid data (line numbers in CSV provided):\n")
        for line_num, row in skipped_sets:
            f.write(f"-- Line {line_num}: {row}\n")

print(f"Done! SQL INSERT statements written to {SQL_FILE}.")
if skipped_sets:
    print(f"Skipped {len(skipped_sets)} sets due to missing or invalid data. See the end of the SQL file for details.")