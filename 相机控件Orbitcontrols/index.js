import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(100, 100, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

controls.addEventListener("change", () => {
  console.log("position", camera.position);
  renderer.render(scene, camera);
});

document.body.appendChild(renderer.domElement);
