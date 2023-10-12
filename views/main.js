import * as THREE from 'three';
import { LDrawLoader } from 'three/addons/loaders/LDrawLoader.js';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

function init() {

  // Reset camera to initial position and rotation
  camera.position.copy(initialCameraPosition);
  camera.rotation.copy(initialCameraRotation);

  // Reset controls
  controls.reset();

  // Set camera position
  camera.position.x = 150;
  camera.position.y = 150;
  camera.position.z = 250;

  // Set background color
  renderer.setClearColor(0xb3b3b3);

  // Activate shadows
  renderer.shadowMap.enabled = true;

  // Initialize controls
  controls.enableZoom = true;
}

function animate() {
  requestAnimationFrame(animate);

  // Update controls
  controls.update();

  renderer.render(scene, camera);
}

function onWindowResize() {

  camera.aspect = ratio;
  camera.updateProjectionMatrix();

  renderer.setSize( container.innerWidth, container.innerHeight );
}

// Function to load a new model based on the selected option
async function loadModel(modelName) {
  // Assuming models are in the "models" folder
  const modelPath = `/models/${modelName}.ldr`;

  // Clear the existing scene
  scene.children = [];

  // Load the new model
  loader.load(
    modelPath,
    function (group) {
      legoModel = group;
      // Rotate the loaded model 180 degrees around the x-axis
      legoModel.rotation.x = Math.PI;
      legoModel.traverse(function (child) {
        if (child.isMesh) {
          // Set material to Phong material
          //child.material = new THREE.MeshPhongMaterial({ color: 0xaaaaaa, specular: 0x111111, shininess: 200 });
          // OR set material to Lambert material
          //child.material = new THREE.MeshLambertMaterial({ color: 0xaaaaaa });
        }
      });
      scene.add(legoModel);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    function (error) {
      console.log('An error occurred');
    }
  );
}

// Function to fetch the list of model names
async function fetchModelList() {
  try {
    // Assuming you have an endpoint that provides the list of models
    const response = await fetch('/models/modelList');
    const data = await response.json();

    // Populate the dropdown with model names
    const modelSelect = document.getElementById('modelSelect');
    data.models.forEach((modelName) => {
      const option = document.createElement('option');
      option.value = modelName;
      option.text = modelName;
      modelSelect.add(option);
    });

    // Trigger loading the default model
    const defaultModel = modelSelect.value;
    loadModel(defaultModel);
  } catch (error) {
    console.error('Error fetching model list:', error);
  }
}

// Call the function to fetch and populate the model list
fetchModelList();

// Renderer
const renderer = new THREE.WebGLRenderer();
const ratio = window.devicePixelRatio;
renderer.setPixelRatio(ratio);
// Desired height
const windowHeight = 469;
// Calculate the width to maintain the natural aspect ratio
const windowWidth = (windowHeight / window.innerHeight) * window.innerWidth;
// Set window size for viewer window
renderer.setSize(windowWidth, windowHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;

const pmremGenerator = new THREE.PMREMGenerator( renderer );

// Scene
const scene = new THREE.Scene();
scene.environment = pmremGenerator.fromScene( new RoomEnvironment( renderer ) ).texture;
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1000);

// Add light
scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Store initial camera position and rotation
const initialCameraPosition = new THREE.Vector3(0, 0, 400);
const initialCameraRotation = new THREE.Euler(0, 0, 0);

const loader = new LDrawLoader();

// Path to the parts
var partsLibraryPath = "/models/ldraw/officialLibrary/";
loader.setPartsLibraryPath(partsLibraryPath);

// Load materials
await loader.preloadMaterials('models/ldraw/officialLibrary/LDCfgalt.ldr');

const shadingButtonActive = false;

const controls = new OrbitControls(camera, renderer.domElement);

let legoModel;

// Call init function
init();

// Get container for viewer window
const container = document.getElementById('webgl-container');

// Add renderer to container
container.appendChild(renderer.domElement);

// Error handling
if (WebGL.isWebGLAvailable()) {
  // Initiate functions or other initializations here
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  container.appendChild(warning);
}

$(document).ready(function () {

  $("#resetBtn").click(function () {
    init();
    animate();
    return false;
  });

  $("#bkgColorBtn").click(function () {

    $('#model-bg-color').click();

  });

  $('#model-bg-color').on('change', function (e) {
    renderer.setClearColor(e.target.value);
    animate();
  });
});

// Event listener for mouse down (left-click)
let isMouseDown = false;
container.addEventListener('mousedown', (event) => {
  if (event.button === controls.mouseButtons.LEFT) {
    isMouseDown = true;
  }
});

// Event listener for mouse up
container.addEventListener('mouseup', (event) => {
  if (event.button === controls.mouseButtons.LEFT) {
    isMouseDown = false;
  }
});

// Event listener for mouse move
container.addEventListener('mousemove', (event) => {
  if (isMouseDown) {
    // Accumulate the rotation based on mouse movement
    camera.rotation.x -= event.movementY / window.innerHeight * 2 * Math.PI;

    // Restrict vertical rotation within a certain range (e.g., between -PI/2 and PI/2)
    camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));

    // Rotate the model based on mouse movement
    camera.rotation.y -= event.movementX / window.innerWidth * 2 * Math.PI;
  }
});

// Event listener for mouse leave
container.addEventListener('mouseleave', () => {
  isMouseDown = false;
});

// Event listener for resize
window.addEventListener( 'resize', onWindowResize );

// Event listener for changes in the dropdown
document.getElementById('modelSelect').addEventListener('change', function () {
  const selectedModel = this.value;
  loadModel(selectedModel);
});

