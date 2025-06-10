import * as THREE from "https://cdn.skypack.dev/three@0.129.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

const controlButton = document.getElementById('control_button');
const rotate = document.getElementById('rotate_table');
const orbit = document.getElementById('orbit_table');
const Container = document.getElementById('container');
const pauseButton = document.getElementById('pause_button');


//scene, camara and renderer
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 5000 );
camera.position.z = 100;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const controls = new OrbitControls(camera, renderer.domElement);
const textureLoader = new THREE.TextureLoader();

//create  sphere 
function createSphere(texture, radius, width, height, materialType) {
  const sphereData = new THREE.SphereGeometry(radius, width, height);
  const Image = textureLoader.load(texture);
  const material = materialType === 'standard' ? new THREE.MeshStandardMaterial({ map: Image }) : new THREE.MeshBasicMaterial({ map: Image });
  return new THREE.Mesh(sphereData, material);
}

// sun
const sun = createSphere('textures/sun.jpg', 20, 100, 100, 'basic');
sun.position.set(0, 0, 0);
scene.add(sun);

//  light source
const light = new THREE.PointLight(0xffffff, 3, 0);
light.position.copy(sun.position);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);


// planets data

  const planetData = [
  { name: "Mercury", size: 12, distance: 50, orbitSpeed: 0.02, texture: "public/textures/mercury.jpg", rotation_speed: 0.002 },
  { name: "Venus", size: 12, distance: 90, orbitSpeed: 0.025, texture: "public/textures/venus.jpg", rotation_speed: 0.002 },
  { name: "Earth", size: 12, distance: 140, orbitSpeed: 0.021, texture: "public/textures/earth.jpg", rotation_speed: 0.02 },
  { name: "Mars", size: 12, distance: 200, orbitSpeed: 0.02, texture: "public/textures/mars.jpg", rotation_speed: 0.02 },
  { name: "Jupiter", size: 12, distance: 270, orbitSpeed: 0.015, texture: "public/textures/jupiter.jpg", rotation_speed: 0.02 },
  { name: "Saturn", size: 12, distance: 350, orbitSpeed: 0.012, texture: "public/textures/saturn.jpg", rotation_speed: 0.02 },
  { name: "Uranus", size: 12, distance: 430, orbitSpeed: 0.01, texture: "public/textures/uranus.jpg", rotation_speed: 0.02 },
  { name: "Neptune", size: 12, distance: 500, orbitSpeed: 0.005, texture: "public/textures/neptune.jpg", rotation_speed: 0.02 }
];

// orbit line
function create_axis(radius) {
  const segments = 80;
  const geometry = new THREE.BufferGeometry();
  const points = [];
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * 2 * Math.PI;
    points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
  }

  geometry.setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ 
    color: 0xffffff, 
    opacity: 0.3, 
    transparent: true,
  });

  return new THREE.LineLoop(geometry, material);
}

// adding planets 
const planets = [];
planetData.forEach(data => {
  const mesh = createSphere(data.texture, data.size, 32, 32, 'standard');
  mesh.position.set(data.distance, 0, 0);
  scene.add(mesh);

  planets.push({ name: data.name, mesh, distance: data.distance, angle: 0, orbitSpeed: data.orbitSpeed, rotation_speed: data.rotation_speed });
  scene.add(create_axis(data.distance));
});

// stars
function stars(count = 15000) {
  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1,
    transparent: true,
    opacity: 0.8
  });

  const positions = [];

  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 20000;
    const y = (Math.random() - 0.5) * 20000;
    const z = (Math.random() - 0.5) * 20000;
    positions.push(x, y, z);
  }

  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
}

// buttons and keeping them intially hidden
let initial_visible = false;

function visibleText() {
  if (initial_visible) {
    Container.style.display = 'flex'; 
    pauseButton.style.display = 'block';
    controlButton.textContent = 'Hide Controls';
  } else {
    Container.style.display = 'none';
    pauseButton.style.display = 'none';
    controlButton.textContent = 'Show Controls';
  }
}

controlButton.addEventListener('click', () => {
  initial_visible = !initial_visible;
  visibleText();
});

// control table about orbit and rotation speed.
planetData.forEach((data, index) => {
  const table1 = document.createElement('table');
  table1.textContent = `${data.name} Orbit Speed:`;
  table1.style.display = 'block';

  const orbitData = document.createElement('input');
  orbitData.type = 'range';
  orbitData.min = 0;
  orbitData.max = 0.05;
  orbitData.step = 0.01;
  orbitData.value = data.orbitSpeed;
  orbitData.style.width = '100%';

  const value = document.createElement('span');
  value.textContent = data.orbitSpeed.toFixed(2);

  orbitData.addEventListener('input', e => {
    const newSpeed = parseFloat(e.target.value);
    planets[index].orbitSpeed = newSpeed;
    value.textContent = newSpeed.toFixed(2);
  });

  table1.appendChild(value);
  rotate.appendChild(table1);
  rotate.appendChild(orbitData);

  // orbit
  const table2 = document.createElement('table');
  table2.textContent = `${data.name} Rotation Speed:`;
  table2.style.display = 'block';

  const rotateData = document.createElement('input');
  rotateData.type = 'range';
  rotateData.min = 0;
  rotateData.max = 0.05;
  rotateData.step = 0.01;
  rotateData.value = data.rotation_speed;
  rotateData.style.width = '100%';

  const value1 = document.createElement('span');
  value1.textContent = data.rotation_speed.toFixed(3);

  rotateData.addEventListener('input', e => {
    const newRotSpeed = parseFloat(e.target.value);
    planets[index].rotation_speed = newRotSpeed;
    value1.textContent = newRotSpeed.toFixed(3);
  });

  table2.appendChild(value1);
  orbit.appendChild(table2);
  orbit.appendChild(rotateData);
});

// pause button
let isPaused = false;
pauseButton.addEventListener('click', () => {
  isPaused = !isPaused;
  pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
});

//animation 
function animate() {
  requestAnimationFrame(animate);
  if (!isPaused) {
    planets.forEach(planet => {
      planet.angle += planet.orbitSpeed;
      planet.mesh.position.x = Math.cos(planet.angle) * planet.distance;
      planet.mesh.position.z = Math.sin(planet.angle) * planet.distance;
      planet.mesh.rotation.y += planet.rotation_speed;
    });
  }
  controls.update();
  renderer.render(scene, camera);
}

// window responsive
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// functions
visibleText();
stars();
animate();
