import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
const width = window.innerWidth;
const height = window.innerHeight;
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(width, height);

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(100, 100, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
});

const group = new THREE.Group();
group.position.set(50, 0, 0);
const mesh = new THREE.Mesh(geometry, material);
const mesh1 = new THREE.Mesh(geometry, material);
mesh.position.set(150, 0, 0);
group.add(mesh);
group.add(mesh1);
scene.add(group);

const controls = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
const visibleBtn = document.querySelector(".visible-btn");
const invisibleBtn = document.querySelector(".invisible-btn");
const invisibleMaterial = document.querySelector(".invisible-materail");
visibleBtn.addEventListener("click", () => {
  mesh.visible = true;
});
invisibleBtn.addEventListener("click", () => {
  mesh.visible = false;
});
invisibleMaterial.addEventListener("click", () => {
  material.visible = false;
});

document.body.appendChild(renderer.domElement);
render();
