import * as THREE from 'three';
import { LDrawLoader } from 'three/addons/loaders/LDrawLoader.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Set working variables
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const loader = new LDrawLoader();

// Set camera position
camera.position.z = 400;

// Set background color
renderer.setClearColor(0x8f8b8a);
// Activate shadows
renderer.shadowMap.enabled = true;

// Set window size for viewer window
renderer.setSize(824, 469);

// Get container for viewer window
const container = document.getElementById('webgl-container');

// Add renderer to container
container.appendChild(renderer.domElement); 

// Path to the parts
var partsLibraryPath = "/models/ldraw/officialLibrary/";
loader.setPartsLibraryPath(partsLibraryPath);

// Load materials
await loader.preloadMaterials( 'models/ldraw/officialLibrary/LDCfgalt.ldr' );

// Load LDraw-Ressource
loader.load(
  // Ressource URL
  'models/BUILD_Schere-Stein-Papier_v1.0.ldr',
  // Called, when ressource is loaded
  function (group) {
    // Add group to scene
    scene.add(group);
  },
  // Called while loading process
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% geladen');
  },
  // Called, when error appears
  function (error) {
    console.log('Ein Fehler ist aufgetreten');
  }
);

// Error handling
if (WebGL.isWebGLAvailable()) {
  // Initiiere Funktion oder andere Initialisierungen hier
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  container.appendChild(warning);
}

$(document).ready( function() {


  $("#resetBtn").click(function(){
    $("#fileform").transition('show');
    $("#progress").transition('show');
    $('#buttonBar').transition('hide');
    $("#canvas").transition('hide');
    $("#webgl").api("remove loading");
    return false;
  });

  $("#bkgColorBtn").click(function(){
    $('#model-bg-color').click();
  });

  $("#physicalBtn").click(function(){
    $("#webgl").api("set loading");
    if (scene.loader.physicalRenderingAge > 0) {
      scene.setPhysicalRenderingAge(0);
    }
    else {
      scene.setPhysicalRenderingAge(20);
    }
  });

  $('#model-bg-color').on('change', function (e) {
      LDR.Options.bgColor = parseInt(e.target.value.replace(/^#/, ''), 16);
      $("#bkgColorBtn").css('background-color', e.target.value);
      $("#canvas").css('background', e.target.value);
      scene.scene.background = new THREE.Color(LDR.Options.bgColor);
      scene.render();
  });
});
