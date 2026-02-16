# IT_Profil

Jednoduchý start webu — otevřete `index.html` v prohlížeči.

Projekt byl rozšířen: část obsahu (`name`, `skills`, `interests`, `projects`) se nyní načítá dynamicky ze souboru `profile.json` pomocí `app.js`.

Součásti projektu:

- index.html — základní stránka (nyní s placeholdery `#name`, `#skills`, `#interests`, `#projects`)
- styles.css — styly
- app.js — skript, který načítá `profile.json` a vykresluje obsah
- profile.json — data profilu (jméno, dovednosti, zájmy, projekty)

Spuštění lokálně:

1. Otevřete `index.html` přímo v prohlížeči (pro fetch některé prohlížeče mohou vyžadovat lokální server).
2. Doporučené: spustit jednoduchý server v adresáři projektu, např. `python3 -m http.server` a otevřít `http://localhost:8000`.

Poznámka: historie commitů v tomto repozitáři používá Conventional Commits (např. `feat(...)`, `style(...)`, `docs(...)`).
