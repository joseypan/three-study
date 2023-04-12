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
camera.position.set(100, 100, 200);
camera.lookAt(0, 0, 0);

const R = 100;
const N = 50;
const sp = (2 * Math.PI) / N;
const cx = 200;
const cy = 100;
const arr = [];
for (let i = 0; i < N; i++) {
  const angle = i * sp;
  const x = cx + R * Math.cos(angle);
  const y = cy + R * Math.sin(angle);
  // const vector = new THREE.Vector3(x, y, 0);
  const vector = new THREE.Vector2(x, y);
  arr.push(vector);
}
const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(arr);
const material = new THREE.LineBasicMaterial({
  color: 0xff0000,
});
const line = new THREE.LineLoop(geometry, material);
scene.add(line);

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
