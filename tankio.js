const languages = [
  ["sk", "SK"],
  ["cs", "CZ"],
  ["hu", "HU"],
  ["fi", "FI"],
  ["sv", "SV"],
  ["en", "EN"]
];

const copy = {
  en: {
    home: {
      eyebrow: "App information",
      title: "Tankio",
      lead: "Travel cost calculator for fuel, tolls, saved trips, nearby fuel stations, and PDF exports.",
      supportTitle: "Support",
      supportText: "For help, feedback, or privacy questions, contact support.",
      privacyLink: "Privacy Policy",
      supportLink: "Support"
    },
    privacy: {
      eyebrow: "Privacy",
      title: "Privacy Policy",
      lead: "Tankio works without an account, advertising, or cross-app tracking. Data stays on your device unless a feature needs a map or exchange-rate service to complete your request.",
      updated: "Effective July 9, 2026",
      contactText: "Questions about privacy or data can be sent to support.",
      sections: [
        ["What the app stores", "Tankio may save your app settings, fuel and trip values, saved routes, notes, language, theme, highway pass reminder settings, expiration dates, and the last selected or detected location used by app features. This information is stored locally on your device."],
        ["Location and maps", "Location is used only after permission is granted. It can be used for route calculations, current-location features, and nearby fuel station search. Map and place results are provided through Apple Maps, MapKit, Core Location, and system geocoding."],
        ["Nearby fuel stations", "Station names, addresses, and distances come from Apple Maps search results. Results are informational, may be incomplete or out of date, and are not stored by Tankio as a long-term station database."],
        ["External map apps", "If you open a destination or station in Google Maps, Waze, Apple Maps, or a browser, the selected place is passed to that service. The external service then handles the request under its own terms and privacy policy."],
        ["Currency rates", "Currency conversion uses European Central Bank reference rates through Frankfurter. Tankio sends only the currency request needed for conversion. Rates are informational and may be delayed."],
        ["Notifications", "If enabled, Tankio schedules local highway pass reminders on your device. These reminders are not used for advertising or tracking."],
        ["PDF exports", "PDF trip summaries are generated locally from the values shown in the app. You choose if and where to share them. Tankio PDFs are informational and are not accounting, tax, or financial advice documents."],
        ["Support and deletion", "If you contact support, your email is used only to respond to your request. Saved trips can be deleted in the app. Removing the app deletes its local app data. Location and notification permissions can be changed in iOS Settings."],
        ["Website", "These pages are hosted as a static GitHub Pages site. Tankio does not add cookies, advertising pixels, or analytics scripts to them."]
      ]
    },
    support: {
      eyebrow: "Support",
      title: "Tankio Support",
      lead: "For help, feedback, or privacy questions, contact support by email.",
      contactTitle: "Contact",
      issueTitle: "Reporting an issue",
      issueText: "Please include the app version, iPhone model, iOS version, selected language, and a short description of what happened.",
      privacyLink: "Privacy Policy"
    }
  },
  sk: {
    home: {
      eyebrow: "Informácie o aplikácii",
      title: "Tankio",
      lead: "Kalkulačka cestovných nákladov na palivo, diaľničné poplatky, uložené jazdy, blízke čerpacie stanice a PDF exporty.",
      supportTitle: "Podpora",
      supportText: "Ak potrebuješ pomoc, chceš poslať spätnú väzbu alebo sa opýtať na súkromie, napíš na podporu.",
      privacyLink: "Zásady súkromia",
      supportLink: "Podpora"
    },
    privacy: {
      eyebrow: "Súkromie",
      title: "Zásady súkromia",
      lead: "Tankio funguje bez účtu, reklám a sledovania naprieč aplikáciami. Dáta zostávajú v zariadení, pokiaľ funkcia nepotrebuje mapovú alebo kurzovú službu na vybavenie tvojej požiadavky.",
      updated: "Platné od 9. júla 2026",
      contactText: "Otázky k súkromiu alebo dátam môžeš poslať na podporu.",
      sections: [
        ["Čo aplikácia ukladá", "Tankio môže v zariadení uložiť nastavenia aplikácie, hodnoty paliva a jazdy, uložené trasy, poznámky, jazyk, vzhľad, nastavenia upozornení na diaľničnú známku, dátumy platnosti a poslednú zvolenú alebo zistenú polohu použitú funkciami aplikácie."],
        ["Poloha a mapy", "Poloha sa používa iba po povolení. Slúži na výpočet trás, funkcie aktuálnej polohy a vyhľadanie blízkych čerpacích staníc. Výsledky máp a miest poskytujú Apple Maps, MapKit, Core Location a systémové geokódovanie."],
        ["Čerpacie stanice", "Názvy, adresy a vzdialenosti staníc pochádzajú z vyhľadávania Apple Maps. Výsledky sú informačné, nemusia byť úplné ani vždy aktuálne a Tankio ich neukladá ako dlhodobú databázu staníc."],
        ["Externé mapy", "Ak otvoríš cieľ alebo stanicu v Google Maps, Waze, Apple Maps alebo prehliadači, vybrané miesto sa odovzdá danej službe. Tá potom požiadavku spracuje podľa vlastných podmienok a zásad súkromia."],
        ["Meny a kurzy", "Prepočet mien používa referenčné kurzy Európskej centrálnej banky cez službu Frankfurter. Tankio posiela iba požiadavku potrebnú na prepočet. Kurzy sú informačné a môžu mať oneskorenie."],
        ["Notifikácie", "Ak ich zapneš, Tankio vytvorí lokálne upozornenia na diaľničnú známku priamo v zariadení. Nepoužívajú sa na reklamu ani sledovanie."],
        ["PDF exporty", "PDF súhrny jázd sa vytvárajú lokálne z hodnôt zobrazených v aplikácii. Sám rozhodneš, či a kam ich zdieľaš. PDF z Tankio slúži len informatívne a nie je účtovným, daňovým ani finančným odporúčaním."],
        ["Podpora a vymazanie", "Ak napíšeš na podporu, email sa použije iba na odpoveď. Uložené jazdy môžeš vymazať v aplikácii. Odstránením aplikácie sa odstránia jej lokálne dáta. Povolenia polohy a notifikácií sa menia v nastaveniach iOS."],
        ["Web", "Tieto stránky sú staticky hostované cez GitHub Pages. Tankio do nich nepridáva cookies, reklamné pixely ani analytické skripty."]
      ]
    },
    support: {
      eyebrow: "Podpora",
      title: "Podpora Tankio",
      lead: "Ak potrebuješ pomoc, chceš poslať spätnú väzbu alebo sa opýtať na súkromie, napíš email.",
      contactTitle: "Kontakt",
      issueTitle: "Nahlásenie problému",
      issueText: "Prosím prilož verziu aplikácie, model iPhonu, verziu iOS, zvolený jazyk a krátky opis toho, čo sa stalo.",
      privacyLink: "Zásady súkromia"
    }
  },
  cs: {
    home: {
      eyebrow: "Informace o aplikaci",
      title: "Tankio",
      lead: "Kalkulačka cestovních nákladů na palivo, dálniční poplatky, uložené jízdy, blízké čerpací stanice a PDF exporty.",
      supportTitle: "Podpora",
      supportText: "Pokud potřebuješ pomoc, chceš poslat zpětnou vazbu nebo se zeptat na soukromí, napiš na podporu.",
      privacyLink: "Zásady soukromí",
      supportLink: "Podpora"
    },
    privacy: {
      eyebrow: "Soukromí",
      title: "Zásady soukromí",
      lead: "Tankio funguje bez účtu, reklam a sledování napříč aplikacemi. Data zůstávají v zařízení, pokud daná funkce nepotřebuje mapovou nebo kurzovou službu k vyřízení tvého požadavku.",
      updated: "Platné od 9. července 2026",
      contactText: "Otázky k soukromí nebo datům můžeš poslat na podporu.",
      sections: [
        ["Co aplikace ukládá", "Tankio může v zařízení uložit nastavení aplikace, hodnoty paliva a jízdy, uložené trasy, poznámky, jazyk, vzhled, nastavení upozornění na dálniční známku, data platnosti a poslední zvolenou nebo zjištěnou polohu použitou funkcemi aplikace."],
        ["Poloha a mapy", "Poloha se používá pouze po povolení. Slouží k výpočtu tras, funkcím aktuální polohy a vyhledání blízkých čerpacích stanic. Výsledky map a míst poskytují Apple Maps, MapKit, Core Location a systémové geokódování."],
        ["Čerpací stanice", "Názvy, adresy a vzdálenosti stanic pocházejí z vyhledávání Apple Maps. Výsledky jsou informativní, nemusí být úplné ani vždy aktuální a Tankio je neukládá jako dlouhodobou databázi stanic."],
        ["Externí mapy", "Pokud otevřeš cíl nebo stanici v Google Maps, Waze, Apple Maps nebo prohlížeči, vybrané místo se předá dané službě. Ta potom požadavek zpracuje podle vlastních podmínek a zásad soukromí."],
        ["Měny a kurzy", "Přepočet měn používá referenční kurzy Evropské centrální banky přes službu Frankfurter. Tankio posílá pouze požadavek potřebný pro přepočet. Kurzy jsou informativní a mohou mít zpoždění."],
        ["Notifikace", "Pokud je zapneš, Tankio vytvoří lokální upozornění na dálniční známku přímo v zařízení. Nepoužívají se pro reklamu ani sledování."],
        ["PDF exporty", "PDF souhrny jízd se vytvářejí lokálně z hodnot zobrazených v aplikaci. Sám rozhodneš, zda a kam je budeš sdílet. PDF z Tankio je pouze informativní a není účetním, daňovým ani finančním doporučením."],
        ["Podpora a vymazání", "Pokud napíšeš na podporu, email se použije pouze k odpovědi. Uložené jízdy můžeš vymazat v aplikaci. Odstraněním aplikace se odstraní její lokální data. Povolení polohy a notifikací se mění v nastavení iOS."],
        ["Web", "Tyto stránky jsou staticky hostované přes GitHub Pages. Tankio do nich nepřidává cookies, reklamní pixely ani analytické skripty."]
      ]
    },
    support: {
      eyebrow: "Podpora",
      title: "Podpora Tankio",
      lead: "Pokud potřebuješ pomoc, chceš poslat zpětnou vazbu nebo se zeptat na soukromí, napiš email.",
      contactTitle: "Kontakt",
      issueTitle: "Nahlášení problému",
      issueText: "Prosím přilož verzi aplikace, model iPhonu, verzi iOS, zvolený jazyk a krátký popis toho, co se stalo.",
      privacyLink: "Zásady soukromí"
    }
  },
  hu: {
    home: {
      eyebrow: "Alkalmazásinformáció",
      title: "Tankio",
      lead: "Útiköltség-kalkulátor üzemanyaghoz, útdíjakhoz, mentett utakhoz, közeli töltőállomásokhoz és PDF exporthoz.",
      supportTitle: "Támogatás",
      supportText: "Segítség, visszajelzés vagy adatvédelmi kérdés esetén írj a támogatásnak.",
      privacyLink: "Adatvédelmi tájékoztató",
      supportLink: "Támogatás"
    },
    privacy: {
      eyebrow: "Adatvédelem",
      title: "Adatvédelmi tájékoztató",
      lead: "A Tankio fiók, hirdetések és alkalmazások közötti követés nélkül működik. Az adatok az eszközön maradnak, kivéve ha egy funkció térképes vagy árfolyam-szolgáltatást használ a kérés teljesítéséhez.",
      updated: "Hatályos: 2026. július 9.",
      contactText: "Adatvédelmi vagy adatkezelési kérdéssel a támogatásnak írhatsz.",
      sections: [
        ["Mit tárol az alkalmazás", "A Tankio helyben tárolhatja az alkalmazás beállításait, az üzemanyag- és úti adatokat, mentett útvonalakat, jegyzeteket, nyelvet, megjelenést, autópálya-matrica emlékeztetőket, lejárati dátumokat, valamint az alkalmazásfunkciókhoz használt utolsó kiválasztott vagy észlelt helyet."],
        ["Helyzet és térképek", "A helyzetadatot csak engedély után használja az alkalmazás. Erre útvonaltervezéshez, aktuális helyzethez és közeli töltőállomások kereséséhez lehet szükség. A térképes és helykeresési eredményeket az Apple Maps, a MapKit, a Core Location és a rendszer geokódolása biztosítja."],
        ["Töltőállomások", "Az állomások neve, címe és távolsága Apple Maps keresési eredményekből származik. Az eredmények tájékoztató jellegűek, lehetnek hiányosak vagy elavultak, és a Tankio nem tárolja őket hosszú távú állomás-adatbázisként."],
        ["Külső térképek", "Ha egy célt vagy állomást Google Mapsben, Waze-ben, Apple Mapsben vagy böngészőben nyitsz meg, a kiválasztott hely átkerül az adott szolgáltatáshoz. A kérést ezután az adott szolgáltatás saját feltételei és adatvédelmi szabályai szerint kezeli."],
        ["Pénznemek és árfolyamok", "A pénznemváltás az Európai Központi Bank referenciaárfolyamait használja a Frankfurter szolgáltatáson keresztül. A Tankio csak az átváltáshoz szükséges kérést küldi el. Az árfolyamok tájékoztató jellegűek és késhetnek."],
        ["Értesítések", "Bekapcsolás esetén a Tankio helyi autópálya-matrica emlékeztetőket hoz létre az eszközön. Ezeket nem használja hirdetésre vagy követésre."],
        ["PDF export", "A PDF úti összesítők helyben készülnek az alkalmazásban látható értékekből. Te döntöd el, megosztod-e őket és hová. A Tankio PDF fájljai tájékoztató jellegűek, nem számviteli, adózási vagy pénzügyi tanácsadási dokumentumok."],
        ["Támogatás és törlés", "Ha írsz a támogatásnak, az emailedet csak válaszadásra használjuk. A mentett utak törölhetők az alkalmazásban. Az alkalmazás eltávolítása törli a helyi alkalmazásadatokat. A helyzet- és értesítési engedélyek az iOS beállításaiban módosíthatók."],
        ["Weboldal", "Ezek az oldalak statikus GitHub Pages oldalként futnak. A Tankio nem ad hozzájuk sütiket, hirdetési pixeleket vagy analitikai szkripteket."]
      ]
    },
    support: {
      eyebrow: "Támogatás",
      title: "Tankio támogatás",
      lead: "Segítség, visszajelzés vagy adatvédelmi kérdés esetén írj emailt.",
      contactTitle: "Kapcsolat",
      issueTitle: "Hiba bejelentése",
      issueText: "Kérlek írd meg az alkalmazás verzióját, az iPhone modelljét, az iOS verzióját, a kiválasztott nyelvet és röviden azt, mi történt.",
      privacyLink: "Adatvédelmi tájékoztató"
    }
  },
  fi: {
    home: {
      eyebrow: "Sovelluksen tiedot",
      title: "Tankio",
      lead: "Matkakululaskuri polttoaineelle, tietulleille, tallennetuille matkoille, lähimmille huoltoasemille ja PDF-vienneille.",
      supportTitle: "Tuki",
      supportText: "Jos tarvitset apua, haluat antaa palautetta tai kysyä tietosuojasta, ota yhteyttä tukeen.",
      privacyLink: "Tietosuojakäytäntö",
      supportLink: "Tuki"
    },
    privacy: {
      eyebrow: "Tietosuoja",
      title: "Tietosuojakäytäntö",
      lead: "Tankio toimii ilman käyttäjätiliä, mainoksia tai sovellusten välistä seurantaa. Tiedot pysyvät laitteellasi, ellei jokin toiminto tarvitse kartta- tai valuuttakurssipalvelua pyyntösi toteuttamiseen.",
      updated: "Voimassa 9. heinäkuuta 2026 alkaen",
      contactText: "Tietosuojaan tai tietoihin liittyvät kysymykset voi lähettää tukeen.",
      sections: [
        ["Mitä sovellus tallentaa", "Tankio voi tallentaa laitteelle sovelluksen asetuksia, polttoaine- ja matka-arvoja, tallennettuja reittejä, muistiinpanoja, kielen, ulkoasun, tiemaksumuistutusten asetuksia, päättymispäiviä sekä viimeksi valitun tai havaitun sijainnin, jota sovelluksen toiminnot käyttävät."],
        ["Sijainti ja kartat", "Sijaintia käytetään vain luvan jälkeen. Sitä voidaan käyttää reittilaskentaan, nykyisen sijainnin toimintoihin ja lähimpien huoltoasemien hakuun. Kartta- ja paikkatulokset tulevat Apple Mapsin, MapKitin, Core Locationin ja järjestelmän geokoodauksen kautta."],
        ["Huoltoasemat", "Asemien nimet, osoitteet ja etäisyydet tulevat Apple Mapsin hakutuloksista. Tulokset ovat suuntaa-antavia, eivät välttämättä täydellisiä tai aina ajan tasalla, eikä Tankio tallenna niitä pysyvänä asematietokantana."],
        ["Ulkoiset kartat", "Jos avaat kohteen tai aseman Google Mapsissa, Wazessa, Apple Mapsissa tai selaimessa, valittu paikka välitetään kyseiselle palvelulle. Sen jälkeen palvelu käsittelee pyynnön omien ehtojensa ja tietosuojakäytäntönsä mukaisesti."],
        ["Valuutat ja kurssit", "Valuuttamuunnos käyttää Euroopan keskuspankin viitekursseja Frankfurter-palvelun kautta. Tankio lähettää vain muunnokseen tarvittavan pyynnön. Kurssit ovat tiedoksi ja voivat päivittyä viiveellä."],
        ["Ilmoitukset", "Kun ilmoitukset ovat käytössä, Tankio luo paikallisia tiemaksumuistutuksia laitteellesi. Niitä ei käytetä mainontaan tai seurantaan."],
        ["PDF-viennit", "PDF-yhteenvedot luodaan paikallisesti sovelluksessa näkyvistä arvoista. Päätät itse, jaatko ne ja mihin. Tankion PDF-tiedostot ovat vain tiedoksi, eivät kirjanpito-, vero- tai talousneuvonta-asiakirjoja."],
        ["Tuki ja poistaminen", "Jos otat yhteyttä tukeen, sähköpostiasi käytetään vain vastauksen antamiseen. Tallennetut matkat voi poistaa sovelluksessa. Sovelluksen poistaminen poistaa sen paikalliset tiedot. Sijainti- ja ilmoitusluvat voi muuttaa iOS-asetuksissa."],
        ["Verkkosivu", "Nämä sivut ovat staattisia GitHub Pages -sivuja. Tankio ei lisää niihin evästeitä, mainospikseleitä tai analytiikkaskriptejä."]
      ]
    },
    support: {
      eyebrow: "Tuki",
      title: "Tankio-tuki",
      lead: "Jos tarvitset apua, haluat antaa palautetta tai kysyä tietosuojasta, lähetä sähköpostia.",
      contactTitle: "Yhteys",
      issueTitle: "Ongelman ilmoittaminen",
      issueText: "Liitä mukaan sovelluksen versio, iPhone-malli, iOS-versio, valittu kieli ja lyhyt kuvaus siitä, mitä tapahtui.",
      privacyLink: "Tietosuojakäytäntö"
    }
  },
  sv: {
    home: {
      eyebrow: "Appinformation",
      title: "Tankio",
      lead: "Resekostnadskalkylator för bränsle, vägavgifter, sparade resor, närliggande bensinstationer och PDF-exporter.",
      supportTitle: "Support",
      supportText: "Kontakta supporten om du behöver hjälp, vill lämna feedback eller har frågor om integritet.",
      privacyLink: "Integritetspolicy",
      supportLink: "Support"
    },
    privacy: {
      eyebrow: "Integritet",
      title: "Integritetspolicy",
      lead: "Tankio fungerar utan konto, annonser eller spårning mellan appar. Data stannar på din enhet om inte en funktion behöver en kart- eller växelkursstjänst för att slutföra din begäran.",
      updated: "Gäller från 9 juli 2026",
      contactText: "Frågor om integritet eller data kan skickas till supporten.",
      sections: [
        ["Vad appen sparar", "Tankio kan spara appinställningar, bränsle- och resevärden, sparade rutter, anteckningar, språk, tema, inställningar för vägavgifts- eller vinjettpåminnelser, giltighetsdatum och den senast valda eller upptäckta platsen som används av appens funktioner. Informationen sparas lokalt på din enhet."],
        ["Plats och kartor", "Plats används endast efter att du har gett tillstånd. Den kan användas för ruttberäkning, funktioner för aktuell plats och sökning efter närliggande bensinstationer. Kart- och platsresultat tillhandahålls via Apple Maps, MapKit, Core Location och systemets geokodning."],
        ["Bensinstationer", "Stationernas namn, adresser och avstånd kommer från Apple Maps sökresultat. Resultaten är informativa, kan vara ofullständiga eller inaktuella och sparas inte av Tankio som en långsiktig stationsdatabas."],
        ["Externa kartor", "Om du öppnar en destination eller station i Google Maps, Waze, Apple Maps eller en webbläsare skickas den valda platsen till den tjänsten. Därefter hanterar den externa tjänsten begäran enligt sina egna villkor och sin integritetspolicy."],
        ["Valutor och kurser", "Valutakonvertering använder Europeiska centralbankens referenskurser via Frankfurter. Tankio skickar endast den valutaförfrågan som behövs för konverteringen. Kurserna är informativa och kan vara fördröjda."],
        ["Notiser", "Om du aktiverar dem skapar Tankio lokala påminnelser på din enhet. De används inte för annonsering eller spårning."],
        ["PDF-exporter", "PDF-sammanfattningar skapas lokalt från värdena som visas i appen. Du väljer själv om och var du delar dem. Tankio-PDF:er är endast informativa och är inte bokförings-, skatte- eller finansiella rådgivningsdokument."],
        ["Support och radering", "Om du kontaktar supporten används ditt email endast för att svara på din fråga. Sparade resor kan tas bort i appen. Om du tar bort appen raderas dess lokala appdata. Plats- och notisbehörigheter kan ändras i iOS-inställningarna."],
        ["Webbplats", "Dessa sidor är statiska GitHub Pages-sidor. Tankio lägger inte till cookies, annonspixlar eller analysskript."]
      ]
    },
    support: {
      eyebrow: "Support",
      title: "Tankio Support",
      lead: "Skicka ett email om du behöver hjälp, vill lämna feedback eller har frågor om integritet.",
      contactTitle: "Kontakt",
      issueTitle: "Rapportera ett problem",
      issueText: "Skicka gärna med appversion, iPhone-modell, iOS-version, valt språk och en kort beskrivning av vad som hände.",
      privacyLink: "Integritetspolicy"
    }
  }
};

function getInitialLanguage() {
  const saved = localStorage.getItem("tankio_site_language");
  if (copy[saved]) return saved;
  const browser = (navigator.language || "en").slice(0, 2).toLowerCase();
  return copy[browser] ? browser : "en";
}

function valueFor(path, lang) {
  return path.split(".").reduce((current, key) => current && current[key], copy[lang]);
}

function renderSections(lang) {
  const target = document.querySelector("[data-sections]");
  if (!target) return;
  const sections = valueFor(`${document.body.dataset.page}.sections`, lang) || [];
  target.innerHTML = sections.map(([title, body]) => `<article class="section"><h2>${title}</h2><p>${body}</p></article>`).join("");
}

function applyLanguage(lang) {
  const selected = copy[lang] ? lang : "en";
  document.documentElement.lang = selected === "cs" ? "cs" : selected === "sk" ? "sk" : selected === "hu" ? "hu" : selected === "fi" ? "fi" : selected === "sv" ? "sv" : "en";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const text = valueFor(node.dataset.i18n, selected);
    if (text) node.textContent = text;
  });
  renderSections(selected);
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.lang === selected ? "true" : "false");
  });
  localStorage.setItem("tankio_site_language", selected);
}

function buildLanguageBar() {
  const bar = document.querySelector("[data-language-bar]");
  if (!bar) return;
  languages.forEach(([code, label]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.lang = code;
    button.textContent = label;
    button.addEventListener("click", () => applyLanguage(code));
    bar.appendChild(button);
  });
}

buildLanguageBar();
applyLanguage(getInitialLanguage());
