# Imenik (Address-Book)

Ovaj projekt predstavlja projektni zadatak izrađen kroz stručnu praksu u tvrtki APIS IT d.o.o.. Projekt predstavlja mrežnu starnicu imanika u kojoj je moguća pohrana pojednikih kontakata sa sljedećim podacima o kontaktu: ime, prezime, datum rođenja, adresa stanovanja (Ulica i kućni broj), poštanski broj, broj telefona i email adresa. Omogućava uređivanje, dodavanje kontakta, a ovisno o privilegijama računa (radi li se o adminu ili običnom korisniku) obogućeno je i brisanje kontakata. Svaki korisnik ima popis svojih kontakata, a posebni administrator ima pristup svim kontaktima te su mu omogućene sve privilegije (dodavanje, urešivanje i brisanje).

## Korištene tehnologije

Aplikacija je izrađena korištenjem JavaScript razvojnog okvira [ReactJS](https://react.dev/). Za potrebe stilizacije korišten je CSS kao i CSS predproceski alat za stiliziranje [Syntactically Awesome Style Sheets -SASS](https://sass-lang.com/) (.scss). Kao BaaS uspuga korištena je okvir [Firebase](https://firebase.google.com/) koji je omogućio odtvarivanja prijave korisnika, kao i pohranu podataka.

## Strukutra

Zbog optimizacijskih razloga (brže ponovne izgradnje), webpack obrađuje samo datoteke koje se nalaze unutar /src direktorija. Unutar ovog dirktorija je sadržana glavna logika aplikacije jer upravo u njemu trebaju biti sadžane skriptne datoteka (.js) i datoteke za stilsko uređenje dokumenta (.css i .scss). U nastavku je moguće vidjeti strukturu /src direktorija.
<br/>

<div style="background-color: #333; color: white; padding: 10px; border-radius: 5px">

- /src
  - /api
  - /components
    - /contact-form
    - /header
    - /home
    - /login
    - /shared
  - /context
  - /data
  - /help
  - /hooks
  - /images
  - /pages
  - /styles
  - App.js
  - index.js

</div>
<br />

Dirketorij je strukturiran podjelom koponenti na dijelove vezane uz pojedine stranice: Login, Home i ContactForm.

## Pokretanje

### Instaliranje Node.js i Node Package Manger paketa

Kako bi bilo moguće pokretanje potrebno je imati instaliran Node.js odnosno Node Package Manger (NPM). Ukoliko nije instaliran instalacijkom paketu je moguće pristupiti putem ljedeće poveznice: [NodeJS Download page](https://nodejs.org/en/download).
Putem navedne poveznice pistupa se službenoj stranici gdje je moguće preuzeti instalcijske pakete LTS (Long-Term Support) ili Current verzije za odgovarajući operacijski sustav (Windows, MacOS, Linux). Preporuča se preuzimanje LTS verzije instalacijskog paketa. Nakon instalcije potrebno je pokrenuti instalcijki paket i sljediti upute. Nakon završetka instalacije možemo provjeriti je li ona bila uspješna upisivanjem sljedećih naredbi u naredbeni redak:

```bash
node -v
npm -v
```

Ukoliko kao ispis dobijemo verziju programa, instalacija je uspješna.

_Ovaj projekt je konkrentno razvijen na veriji Node.js-a v18.13.0 i s verzijom NPM-a 8.19.3._

### 1. Kloniranje repozitorija:

Prvo je potrebno klonirati repozitorij za što je moguće koristiti sljedeću _bash_ naredbu:

```bash
git clone https://github.com/LukaMarkic/address-book.git
```

### 2. Navigacija do direktorija:

Promijenite svoj trenutni direktorij na direktorij kloniranog projekta. Za navigaciju kroz direktorije moguće je korsiti _bash_ naredbu **cd**, a primjer njezinog poziva prikazan je u nastavku:

```bash
cd ./address-book
```

### 3. Instaliranje paketa i ovisnosti:

Kako bi pokratenje projekta bilo usješno potrebno je instalirati ovisnosi (eng. _Dependencies_). Navedeno je potrebno uraditi korištenjem upisivanje prikazane naredbe u naredbeni redak.

```bash
npm install
```

### 4. Pokretanje projekta (razvojog servera/izgradnja aplikacije):

Ukoliko smo gotovi s predhodnim koracima, možemo pokrenuti razvojni server kako bi se izvodila naša React aplikacija. Potrebno je koristi **start** naredbu.

```bash
npm start
```

Na ovaj način smo aplikaciju pokrenuli u razvojnom načinu rada, no ako je aplikacija spremna za distribuciju istu je moguće "izgraditi" korištnjem
**run build** naredbe.

```bash
npm run build
```