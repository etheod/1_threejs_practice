
$(function() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);
  var renderer = new THREE.WebGLRenderer({antialias:true});
  
//backgroundColor is black
  renderer.setClearColor(0xdddddd);
  //size of the renderer it assigns the size of window when loaded
  renderer.setSize(window.innerWidth, window.innerHeight);

  //enable  shadows in rendering
  renderer.shadowMap.Enabled=true;
  //smooth produced shadows
  renderer.shadowMapSoft=true;
  
  
//bazw ena systhma axonwn dhladh apo poy tha metraei to 0,0,0
  var axis = new THREE.AxisHelper(10);
  scene.add(axis);

  //proairetiko vohthikiko grid
  var grid=new THREE.GridHelper(50,5);
  var color=new THREE.Color("rgb(255,0,0)");
  grid.setColors(color,0x000000);
  scene.add(grid);
  
  //add plane
  var planeGeometry=new THREE.PlaneGeometry(50,50);
  var planeMaterial=new THREE.MeshLambertMaterial({
	  color:0xa0adaf,
	  side: THREE.DoubleSide
	  });
  var plane=new THREE.Mesh(planeGeometry,planeMaterial);
  plane.rotation.x = -Math.PI/2; //-90 degrees around the xaxis 
	//IMPORTANT, draw on both sides 
    //plane.doubleSided = true; 
  plane.receiveShadow=true;
  scene.add(plane);
  
  //bazoyme ta stoixeia ths gewmetrias kai to material kai meta ta kanoyme ena antikeimeno Mesh 
  var torGeometry = new THREE.TorusKnotGeometry( 3, 1, 64, 64); 
  var torMaterial = new THREE.MeshLambertMaterial({
	  color: 0xffff00
	  });
  var torusKnot = new THREE.Mesh(torGeometry,  shaderMat);
  
  torusKnot.position.x = -15;
  torusKnot.position.y = 6;
  torusKnot.position.z = 2.5;
  torusKnot.castShadow = true;
  scene.add( torusKnot );
  
  //bazoyme ta stoixeia ths gewmetrias kai to material kai meta ta kanoyme ena antikeimeno Mesh 
  var cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
  
  //dhmiourgw to shader pou 8elw gia ton kyvo
  var shaderNew={
	  vertexShader:document.getElementById("vs0").textContent,
	  fragmentShader:document.getElementById("fs0").textContent
  }
  //dhmiourgw to material pou 8a exei to shader kai 8a xrhsimopoihsw ayto to material gia to cube mesh
  var shaderMat=new THREE.ShaderMaterial({
	  
	  name:"shaderNew"
	 
	  });
  
  //diaforetiko material
  var cubeMaterial = new THREE.MeshLambertMaterial({
	  color: 0xff0000
	  });
	  
  //var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  var cube = new THREE.Mesh(cubeGeometry, shaderMat);
  //poy xekinaei to antikeimeno - h 8esh toy	
  cube.position.x = 2.5;
  cube.position.y = 2.5;
  cube.position.z = 2.5;
  cube.castShadow=true;
  //to prosthetw sthn skhnh
  scene.add(cube);
  
  
  /*create text*/ 
  /*var textGeometry = new THREE.TextGeometry('Hello  World', {font: 'helvetiker',size:2, height:1}); 
  var textMaterial = new THREE.MeshPhongMaterial( { color: 0xff9000 } ); 
  var text = new THREE.Mesh( textGeometry, textMaterial ); 
  text.position.x = 15;
  text.position.y = 6;
  text.position.z = 2.5;
  text.castShadow = true;
  scene.add( text ); */

   //// Start of TextGeometry
var loader = new THREE.FontLoader();
loader.load( 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_bold.typeface.js', function ( font ) {
    var textGeometry = new THREE.TextGeometry( "THREE.JS", {
        font: font,
        size: 2, // font size
        height: 1, // how much extrusion (how thick / deep are the letters)
        curveSegments: 12,
        bevelThickness: .1,
        bevelSize: 0.1,
        bevelEnabled: true
    });
    textGeometry.computeBoundingBox(); //einai to plaisio toy xwroy toy antikeimenoy san //kyvos
    var textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
    text = new THREE.Mesh( textGeometry, textMaterial ); // την εχω κανει αυτοματα global variable
    text.position.x = 15;
    text.position.y = 1;
    text.position.z = 2.5;
    text.castShadow = true;
    text.receiveShadow = true;
    scene.add(text);
});
// End TextGeometry
  
  
  
  var spotLight=new THREE.SpotLight(0xffffff);
  spotLight.position.set(10,10,15);
  spotLight.castShadow=true;
  scene.add(spotLight);
  
/*  var spotLightHelper = new THREE.SpotLightHelper( spotLight );
scene.add( spotLightHelper );
  spotLightHelper.update();
  */
  
  
   //h thesh ths kameras
  camera.position.x = 60;
  camera.position.y = 30;
  camera.position.z = 60;
  //h kamera koitaei th skhnh= new
  camera.lookAt(scene.position);

  // Add OrbitControls so that we can pan around with the mouse.
  var controls = new THREE.OrbitControls(camera);
  controls.addEventListener( 'change', render );
  
  //when we call the gui controls its going to control these variables
  //h lista me ta controls pou tha exei to interface kai arxikopoihmenes oi times
  var guiControls=new function(){
	  this.rotationX=0;
	  this.rotationY=0;
	  this.rotationZ=0;
	  
	  //gia to spotlight
	  this.lightX = 20;
      this.lightY = 35;
      this.lightZ = 40;
      this.intensity = 1;     
      this.distance = 0;
      this.angle = 1.570;
      this.exponent = 0;
      this.shadowCameraNear = 10;
      this.shadowCameraFar = 100;
      this.shadowCameraFov = 50;
      this.shadowCameraVisible=true;
      this.shadowMapWidth=1028;
      this.shadowMapHeight=1028;
      this.shadowBias=0;
      this.shadowDarkness=0.5;   
      this.target = cube;
  }
  
  /*adds spot light with starting parameters*/
        var spotLight = new THREE.SpotLight(0xffffff);
		spotLight.visible=true;
        spotLight.castShadow = true;
        spotLight.position.set (20, 35, 40);
        spotLight.intensity = guiControls.intensity;        
        spotLight.distance = guiControls.distance;
        spotLight.angle = guiControls.angle;
        spotLight.exponent = guiControls.exponent;
        spotLight.shadow.camera.near = guiControls.shadowCameraNear;
        spotLight.shadow.camera.far = guiControls.shadowCameraFar;
        spotLight.shadow.camera.fov = guiControls.shadowCameraFov;
        spotLight.shadow.camera.visible = guiControls.shadowCameraVisible;
        spotLight.shadow.bias = guiControls.shadowBias;
        spotLight.shadow.darkness = guiControls.shadowDarkness;
		
        scene.add(spotLight);
  
  
  //edw ta prostherw sto gui me ta onomata tous kai ta oria tous
  var datGui= new dat.GUI();
  datGui.add(guiControls, "rotationX", 0,1);
  datGui.add(guiControls, "rotationY", 0,1);
  datGui.add(guiControls, "rotationZ", 0,1);
	//controls gia spotlight
  datGui.add(guiControls, 'target', ['cube', 'torusKnot','text']).onChange(function(){
            if (guiControls.target == 'cube'){
                spotLight.target =  cube;
            }   
            else if (guiControls.target == 'torusKnot'){
                spotLight.target =  torusKnot;
            }   
            else if (guiControls.target == 'text'){
                spotLight.target =  text;
            }
        }); 
        datGui.add(guiControls, 'intensity',0.01, 5).onChange(function(value){
            spotLight.intensity = value;
        });     
        datGui.add(guiControls, 'distance',0, 1000).onChange(function(value){
            spotLight.distance = value;
        }); 
        datGui.add(guiControls, 'angle',0.001, 1.570).onChange(function(value){
            spotLight.angle = value;
        });     
        datGui.add(guiControls, 'exponent',0 ,50 ).onChange(function(value){
            spotLight.exponent = value;
        });
        datGui.add(guiControls, 'shadowCameraNear',0,100).name("Near").onChange(function(value){        
            spotLight.shadow.camera.near = value;
            spotLight.shadow.camera.updateProjectionMatrix();        
        });
        datGui.add(guiControls, 'shadowCameraFar',0,5000).name("Far").onChange(function(value){
            spotLight.shadow.camera.far = value;
            spotLight.shadow.camera.updateProjectionMatrix();
        });
         datGui.add(guiControls, 'shadowCameraFov',1,180).name("Fov").onChange(function(value){
            spotLight.shadow.camera.fov = value;
            spotLight.shadow.camera.updateProjectionMatrix();
        });
         datGui.add(guiControls, 'shadowCameraVisible').onChange(function(value){
            spotLight.shadow.camera.visible = value;
            spotLight.shadow.camera.updateProjectionMatrix();
        });
         datGui.add(guiControls, 'shadowBias',0,1).onChange(function(value){
            spotLight.shadow.bias = value;
            spotLight.shadow.camera.updateProjectionMatrix();
        });
         datGui.add(guiControls, 'shadowDarkness',0,1).onChange(function(value){
            spotLight.shadow.darkness = value;
            spotLight.shadow.camera.updateProjectionMatrix();
        });
    datGui.close();
  
   //rotate ton kyvo gyrw apo ton x axona
   function animate(){
	  render();
	  //create a loop that causes the renderer to draw the scene 60 times per second.
	  requestAnimationFrame(animate);
	  stats.update();  

	  //controls.update();
      renderer.render(scene, camera);
  }
  
  function render() {

        //cube.rotation.x +=.1 //me statheri timi
	  cube.rotation.x += guiControls.rotationX; //mesw function
	  //cube.rotation.y +=.1;
	   cube.rotation.y += guiControls.rotationY;
	  //cube.rotation.z +=.1;
	   cube.rotation.z += guiControls.rotationZ;

        spotLight.position.x = guiControls.lightX;
        spotLight.position.y = guiControls.lightY;
        spotLight.position.z = guiControls.lightZ;
    
    }
  
  
    //prepei na kalesw th function
  renderer.render(scene, camera);
  $("#webGL-container").append(renderer.domElement);
 /*stats*/
        var stats = new Stats();        
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';     
        $("#webGL-container").append( stats.domElement );
  
  //on document load and if the document(the page) resizes
  $(window).resize(function(){


        SCREEN_WIDTH = window.innerWidth;
        SCREEN_HEIGHT = window.innerHeight;

        camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
        camera.updateProjectionMatrix();

        renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
		});
  
  
  
  animate();
 
  
  
});
