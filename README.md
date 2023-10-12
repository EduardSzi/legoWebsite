# lego::lab Website

########### 1. BESCHREIBUNG DES SYSTEMS ######################

Backend: 
  - Node.js, 
  - verzicht auf CMS System da zu aufwendig gemessen am Nutzen (z.B. Contentful),
  - keine Datenbank; die Lego Modelle werden auf den Server abgelegt.
  
Frontend: 
  - AJAX,
  - Bootstrap als Design-Framework,
  - Verzicht auf ejs-Templates da zu aufwendig im Vergleich zum Nutzen.
  
Als kostenlose IDE bietet sich Microsoft Studio Code an.

########### 2. INSTALLATION AUF NEUER UMGEBUNG #####################################

 - Node.js runterladen/installieren und Systemvariable aktualisieren (https://nodejs.org/en/download)
   -> Gegencheck im Terminal mit: "node -v"
 - Installiere die Abhängigkeiten deines Projektes z.B. mit dem cmd oder  
  bash terminal aus deinem Projektzerzeichnis aus:
                                                   "npm install" und 
                                                   "npm install popper.js" und
												                           "npm install cors"
                                                   "npm install --save three"

########### 3. SERVER LOKAL AUSFÜHREN #####################################
 - Starte den Server aus dem VS Code Terminal mit: "node index.js" (es sollte eine Ausgabe folgen, dass der Server auf http://localhost:3000 läuft)
 - http://localhost:3000 ausführen in einem Broswer (Website sollte jetzt sichtbar sein)

ANMERKUNG:
- index.js:      Dies ist ein grundlegender Startpunkt. 
                 Hier werden die Router für Express gesetzt und das Backend gemanaged.
- views/main.js: Hier wird die Logik für den LDraw Viewer implementiert und die entsprechende Kommunikation mit der bots.html Website.
- Einige Skripte sind lokal im Projekt eingebunden, andere widerum über CDN als web ressource. 

########### 4. NEUES LDR MODELL IN PROJEKT EINBINDEN #####################################

 - 1) .ldr Datei im Ordner 'models' ablegen (z.B. 'truck.ldr')
 - 2) 'modelList.json' Datei aus 'models' Ordner anpassen.
      
      Dazu den Namen der Modell Datei ohne Extension im JSON Array einfügen (siehe Beispiel weiter unten).
    
      Z.B. falls das Modell 'car.ldr' schon vorhanden war und 'truck.ldr' neu hinzugefügt werden soll, sollte die JSON Datei wie folgt aussehen:
      {
        "models": ["car", "truck"]
      }
 
