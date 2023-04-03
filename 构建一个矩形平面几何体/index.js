import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
const width = window.innerWidth;
const height = window.innerHeight;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(100, 100, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const vertices = new Float32Array([
  0, 0, 0, 80, 0, 0, 80, 80, 0, 0, 0, 0, 80, 80, 0, 0, 80, 0,
]);
const attributes = new THREE.BufferAttribute(vertices, 3);
const geometry = new THREE.BufferGeometry();
geometry.attributes.position = attributes;
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const line = new THREE.Mesh(geometry, material);
scene.add(line);

const controls = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

document.body.appendChild(renderer.domElement);
render();
