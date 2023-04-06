import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);
camera.position.set(100, 100, 200);
camera.lookAt(0, 0, 0);

const axesHelper = new THREE.AxesHelper(80);
scene.add(axesHelper);

// 创建矩形平面
const planeGeometry = new THREE.PlaneGeometry(100, 30);
const textLoader = new THREE.TextureLoader();
const texture = textLoader.load("../assets/earth.jpeg");

texture.wrapS = THREE.RepeatWrapping;
texture.repeat.x = 20;
function moveTexture() {
  texture.offset.x += 0.05;
  requestAnimationFrame(moveTexture);
}
moveTexture();
// requestAnimationFrame(moveTexture);
const planeMaterial = new THREE.MeshLambertMaterial({
  map: texture,
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(planeGeometry, planeMaterial);
mesh.rotateX(-Math.PI / 2);
scene.add(mesh);

// 添加灯光
const ambientLight = new THREE.AmbientLight("0xffffff", 1);
scene.add(ambientLight);

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render();
// 创建orbitcontrols
const controls = new OrbitControls(camera, renderer.domElement);
document.body.appendChild(renderer.domElement);
