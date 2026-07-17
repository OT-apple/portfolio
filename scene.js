import * as THREE from "three";

const canvas = document.getElementById("cube-canvas");
if (!canvas) return;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
camera.position.z = 4;

scene.add(new THREE.AmbientLight(0xffffff, 0.65));
const key = new THREE.DirectionalLight(0xffd86b, 1);
key.position.set(3, 5, 4);
scene.add(key);

const geo = new THREE.BoxGeometry(1.1, 1.1, 1.1);
const mat = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  transmission: 0.92,
  thickness: 1,
  roughness: 0.05,
  metalness: 0,
  transparent: true,
});
const cube = new THREE.Mesh(geo, mat);
scene.add(cube);
cube.add(
  new THREE.LineSegments(
    new THREE.EdgesGeometry(geo),
    new THREE.LineBasicMaterial({ color: 0xffd86b, transparent: true, opacity: 0.35 })
  )
);

function resize() {
  const w = canvas.clientWidth || 100;
  const h = canvas.clientHeight || 100;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

resize();
window.addEventListener("resize", resize);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.008;
  cube.rotation.y += 0.012;
  renderer.render(scene, camera);
}

animate();
