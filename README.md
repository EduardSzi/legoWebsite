# lego::lab Website

########### 1. BESCHREIBUNG DES SYSTEMS ######################

Backend: 
  - Node.js, 
  - verzicht auf CMS System da zu aufwendig gemessen am Nutzen (z.B. Contentful),
  - keine Datenbank; die Lego Modelle werden auf den Server abgelegt.
  
Frontend: 
  - AJAX 
  - Verzicht auf ejs-Templates da zu aufwendig relativ zum Nutzen,
  - Bootstrap als Design-Framework.
  
Als kostenlose IDE bietet sich Microsoft Studio Code an (oder z.B. Webstorm von Jetbrains -> Lizenz muss über Jetbrains Education Programm beantragt werden).

########### 2. AUSFÜHRUNG #####################################

 - Node.js runterladen/installieren und Systemvariable aktualisieren (https://nodejs.org/en/download)
   -> Gegencheck im Terminal mit: "node -v"
 - Installiere die Abhängigkeiten deines Projektes z.B. mit dem cmd oder  
  bash terminal aus deinem Projektzerzeichnis aus:
                                                   "npm install" und 
                                                   "npm install popper.js" und
												                           "npm install cors"
                                                   "npm install --save three"
 - Starte den Server aus dem VS Code Terminal mit: "node index.js" (es sollte eine Ausgabe folgen, dass der Server auf http://localhost:3000 läuft)

ANMERKUNG:
- script.js: Dies ist ein grundlegender Startpunkt. 
Du musst die Routen und Ansichten entsprechend deiner Anforderungen erweitern und anpassen. 
Denke daran, die Umgebungsvariablen in der .env-Datei mit den tatsächlichen Daten zu füllen und
 sicherzustellen, dass du die benötigten Node.js-Pakete installierst (Express).
 
