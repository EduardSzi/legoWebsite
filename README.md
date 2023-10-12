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

   Anmerkung: Es kann sein, dass beim Hinzufügen einer neuen .ldr Datei beim Rendern scheinbar Lego Parts fehlen.
              Dies passiert z.B. bei der Konvertierung aus der .io Datei in die .ldr.
              Grund: Das selbe LEGO Bauteil kann z.B. in Spike Prime und EV3 eine andere Bauteilnr. haben, obwohl physikalisch identisch.
                     Beim Exportieren mit der neuesten Lego Studio Version kann es sein, dass die Spike Prime Teilnenr. in die LDR Datei kommt,
                     statt die EV3 Nr., was dann zu einem Fehler führt.
              Lösung: Alle Parts Namen die in den Fehlermeldungen aus dem Web Developer Console vorkommen kopieren
                      und nachschauen, ob das Teil im Parts Tracker zu finden ist: https://library.ldraw.org/tracker/list
                      Falls gefunden: alles OK (der Tracker nutzt die offizielen Teile; wenn der Tracker sie finden, dann findet sie das eigene Projeckt auch)
                      Falls nicht gefunden: nach dem Teil googeln und eine frühere Teile-Nr. finden und damit dann die alte Versin in der .LDR Datei ersetzen.

                      Bsp.: Im Stein Schere Papier Modell war ein Teil mit "39367pb02.dat" (vermutlich neuere Teilenr) angegeben statt mit "39367p02.dat" (alte Teilenr).
                      Nach dem Anpassen in der LDR Datei, wurde das Modell dann auch korrekt angezeigt.

                      Änderungen und Fehler in den LDR Dateien werden unter 'models/readme_models.md' dokumentiert.

 
