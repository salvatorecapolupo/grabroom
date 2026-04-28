# 🧹 Grabroom / ClassVault 📂

grabroom.png

**[ITA]** Uno script potente per estrarre, rinominare e archiviare automaticamente tutti gli allegati da Google Classroom a Google Drive.  

**[ENG]** A powerful script to automatically extract, rename, and archive all attachments from Google Classroom to Google Drive.

---

## 🚀 Caratteristiche / Features

* **Deep Scan:** Estrae file da Compiti, Annunci e Materiali. / *Extracts files from Coursework, Announcements, and Materials.*
* **Smart Naming:** Rinominazione automatica `YYYYMMDD - TIPO - TITOLO - NOME.ext`. / *Auto-renaming for perfect chronological order.*
* **Pagination:** Gestisce corsi con centinaia di post. / *Handles large courses with hundreds of posts.*
* **Permission Fix:** Configurato per superare i blocchi comuni degli account scolastici. / *Bypasses common school account API restrictions.*

---

## 🛠️ Installazione / Setup

1.  **Script:** Crea un nuovo progetto su [script.google.com](https://script.google.com/).
2.  **Services:** Aggiungi `Google Classroom API` & `Drive API` nei Servizi. / *Add `Google Classroom API` & `Drive API` in Services.*
3.  **Manifest:** Copia il contenuto di `appsscript.json` per abilitare i permessi (OAuth Scopes). / *Copy `appsscript.json` content to enable OAuth Scopes.*
4.  **ID:** Inserisci l'ID del tuo corso nella variabile `courseId`. / *Insert your course ID into the `courseId` variable.*
5.  **Run:** Esegui la funzione `extractDeepClassroomArchive`. / *Run the `extractDeepClassroomArchive` function.*

---

## 📄 Manifest (appsscript.json)

Assicurati che il tuo file manifest includa questi permessi:  
*Make sure your manifest file includes these scopes:*

```json
"oauthScopes": [
    "https://www.googleapis.com/auth/classroom.courses.readonly",
    "https://www.googleapis.com/auth/classroom.coursework.me.readonly",
    "https://www.googleapis.com/auth/classroom.coursework.students.readonly",
    "https://www.googleapis.com/auth/classroom.announcements.readonly",
    "https://www.googleapis.com/auth/classroom.courseworkmaterials.readonly",
    "https://www.googleapis.com/auth/drive"
]
```

---

## 📂 Output Example

> `20260428 - MATERIALE - Dispense Chimica - tavola_periodica.pdf`  
> `20260430 - COMPITO - Esercizi Matematica - soluzioni.png`

---

## ⚖️ License
**MIT License** - Free to use and modify.
