import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  logarithmicDepthBuffer: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);
camera.position.set(100 * 6, 100 * 6, 200 * 6);
camera.lookAt(0, 0, 0);

const geometry = new THREE.PlaneGeometry(250, 250);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(geometry, material);
const geometry2 = new THREE.PlaneGeometry(300, 300);
const material2 = new THREE.MeshLambertMaterial({
  color: 0x0000ff,
  side: THREE.DoubleSide,
});
const mesh1 = new THREE.Mesh(geometry2, material2);
mesh1.rotateX(-Math.PI / 2);
mesh.rotateX(-Math.PI / 2);
mesh1.position.y = 1;
scene.add(mesh);
scene.add(mesh1);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const axesHelper = new THREE.AxesHelper(80);
scene.add(axesHelper);

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render();
// 创建orbitcontrols
const controls = new OrbitControls(camera, renderer.domElement);
document.body.appendChild(renderer.domElement);
