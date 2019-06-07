var container;
var camera, scene, renderer;
var group;
var startTime, mesh;
var controls;

function implement3DBlock() {
  container = document.createElement("div");
  // container.style.marginBottom = 260;
  const threeBlock = document.getElementsByClassName("threeDemension")[0];
  threeBlock.appendChild(container);
  const options = document.createElement("div");
  options.className = "options";
  options.innerHTML = `
    <div class="threeOptions">
      <label for="segments">Сегменты</label>
      <input id="segments" type="number" />
      <label for="color">Цвет</label>
      <input id="color" type="color" />
      <button onclick="drawWithOptions()">Отрисовать</button>
    </div>
  `;
  threeBlock.appendChild(options);
  init();
  animate();
}

function init(segments = 50, color = 0x4286f4) {
  container.innerHTML = "";
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(0, 300, 500);
  scene.add(camera);

  controls = new THREE.TrackballControls(camera);
  controls.rotateSpeed = 6.0;
  controls.zoomSpeed = 1.2;
  controls.addEventListener("change", render);

  const points = arrayCords.map(elem => new THREE.Vector2(elem.x, elem.y));
  addShape(points, color, segments);

  //
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(600, 600);
  container.appendChild(renderer.domElement);

  //
  startTime = Date.now();

  window.addEventListener("resize", onWindowResize, false);
}

function drawWithOptions() {
  const segments = +document.getElementById("segments").value;
  const color = document.getElementById("color").value;
  init(segments, color);
}

function addShape(points, color, segments) {
  var lathe = new THREE.LatheGeometry(points, segments);
  var edges = new THREE.WireframeGeometry(lathe);
  mesh = new THREE.Mesh(edges, new THREE.MeshBasicMaterial({ color }));
  mesh.material.side = THREE.DoubleSide;
  console.log(lathe.center().boundingBox.max.x);

  scene.add(mesh);

  // var geometry = new THREE.CircleGeometry(points[0].x - points[100].x, 32);
  // var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  // var circle = new THREE.Mesh(geometry, material);
  // circle.material.side = THREE.DoubleSide;
  // circle.rotation.x = Math.PI / 2;
  // circle.position.y = points[0].y;
  // scene.add(circle);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  controls.handleResize();
}

function animate() {
  var currentTime = Date.now();
  var time = (currentTime - startTime) / 1000;
  requestAnimationFrame(animate);
  // mesh.position.y = 0.8;
  // mesh.rotation.x = time * 0.5;
  // mesh.rotation.y = time * 0.2;
  // mesh.scale.setScalar(Math.cos(time) * 0.125 + 0.875);
  controls.update();
  renderer.render(scene, camera);
}
function render() {
  renderer.render(scene, camera);
}
