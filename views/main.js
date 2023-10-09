import * as THREE from 'three';
import { LDrawLoader } from 'three/addons/loaders/LDrawLoader.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const loader = new LDrawLoader();

renderer.setSize(734, 296);

// Get container for viewer window
const container = document.getElementById('webgl-container');


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement); // Add renderer to container
camera.position.z = 5;

// Pfad zu den Teilen
var partsLibraryPath = "/models/ldraw/officialLibrary/";
loader.setPartsLibraryPath(partsLibraryPath);

// Lade eine LDraw-Ressource
loader.load(
  // Ressourcen-URL
  'models/BUILD_Schere-Stein-Papier_v1.0.ldr',
  // Aufgerufen, wenn die Ressource geladen ist
  function (group) {
    // Füge die Gruppe zur Szene hinzu
    scene.add(group);
  },
  // Aufgerufen während des Ladevorgangs
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% geladen');
  },
  // Aufgerufen, wenn beim Laden Fehler auftreten
  function (error) {
    console.log('Ein Fehler ist aufgetreten');
  }
);

// Fehlerbehandlung
if (WebGL.isWebGLAvailable()) {
  // Initiiere Funktion oder andere Initialisierungen hier
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  container.appendChild(warning);
}
