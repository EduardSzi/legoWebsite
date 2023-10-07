# legoWebsite

Backend: 
  - Node.js, 
  - Contentful als leichtgewichtigess CMS,
  - keine Datenbank; die Lego Modelle werden auf den Server abgelegt.
  
Frontend: 
  - AJAX + ejs-Templates,
  - Bootstrap als Design-Framework.
  
Als kostenlose IDE bietet sich Microsoft Studio Code an (oder z.B. Webstorm von Jetbrains -> Lizenz muss über Jetbrains Education Programm beantragt werden).

script.js: Dies ist ein grundlegender Startpunkt. 
Du musst die Routen und Ansichten entsprechend deiner Anforderungen erweitern und anpassen. 
Denke daran, die Umgebungsvariablen in der .env-Datei mit den tatsächlichen Daten zu füllen und
 sicherzustellen, dass du die benötigten Node.js-Pakete installierst (Express, EJS).
 
 Requirements um auf eigene Maschine am Projekt zu arbeiten:
 - Node.js installieren und Systemvariable aktualisieren (https://nodejs.org/en/download)
   -> Gegencheck im Terminal mit: "node -v"
 - Installiere die Abhängigkeiten deines Projekts: "npm install"
 - Starte den Server mit: "node index.js" (es sollte eine Ausgabe folgen, dass der Server auf http://localhost:3000 läuft)