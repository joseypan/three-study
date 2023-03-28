import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  transparent: true,
  opacity: 0.5,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
// 点光源
// const pointLight = new THREE.PointLight(0xffffff, 1);
// // pointLight.position.set(100, 100, 100);
// pointLight.position.set(100, 0, 0);
// scene.add(pointLight);

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
// scene.add(pointLightHelper);

// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 100, 100);
directionalLight.target = mesh;
scene.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  10
);
scene.add(directionalLightHelper);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

controls.addEventListener("change", () => {
  renderer.render(scene, camera);
});

document.body.appendChild(renderer.domElement);
