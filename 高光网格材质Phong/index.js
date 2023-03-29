import * as THREE from "three";
import { PointLight } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/addons/libs/stats.module.js";

const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(100, 0, 0); //单独设置这个没有反应，是因为OrbitControls会影响lookAt的设置

const geometry = new THREE.BoxGeometry(100, 100, 100); //长方体
// const geometry = new THREE.SphereGeometry(50);//球体
// const geometry = new THREE.CylinderGeometry(50, 100, 100); //圆台体
// const geometry = new THREE.PlaneGeometry(100, 100); //矩形平面
// const geometry = new THREE.CircleGeometry(100); //圆形平面
const material = new THREE.MeshPhongMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide,
  shininess: 20,
  specular: 0x444444, //高光部分的颜色
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(100, 10, 50);
// directionalLight.target = mesh;
scene.add(pointLight);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

const stats = new Stats();
document.body.appendChild(stats.domElement);

function render() {
  stats.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(100, 0, 0);
controls.update();

document.body.appendChild(renderer.domElement);

window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight); //如果只设置setSize会导致物体变形
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
