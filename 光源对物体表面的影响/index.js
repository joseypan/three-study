import * as THREE from "three";

const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const geometry = new THREE.BoxGeometry(100, 100, 100);
// const material = new THREE.MeshBasicMaterial({
//   color: 0x00ffff,
//   transparent: true,
//   opacity: 0.5,
// });
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  transparent: true,
  opacity: 0.5,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const spotLight = new THREE.SpotLight(0xfffff, 1);
spotLight.position.set(110, 150, 0);
scene.add(spotLight);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

renderer.render(scene, camera);

document.body.appendChild(renderer.domElement);
