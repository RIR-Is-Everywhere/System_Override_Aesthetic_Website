/* 
   Code_RIR | Omni-Central Masterpiece Three.js Logic
   Extreme High-Fidelity Fluid Hologram (Cyan & Pink)
*/

function initThreeHero() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    // Dynamic performance scaling: lighter pixel ratio on mobile devices
    const isMobile = window.innerWidth < 768;
    const pixelRatio = isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5);
    
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    
    // Position camera slightly further back to frame the symbiote
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3.6;

    // Responsive density geometry: less vertices on mobile for extreme performance
    const detailLevel = isMobile ? 64 : 150;
    const geometry = new THREE.IcosahedronGeometry(1.5, detailLevel); 
    
    // Venom-like glossy shader with extreme displacement
    const material = new THREE.ShaderMaterial({
        uniforms: { 
            uTime: { value: 0 }, 
            uBaseColor: { value: new THREE.Color("#00f2ff") }, // Neon Cyan
            uReflectColor: { value: new THREE.Color("#ff007f") }, // Neon Pink
            uMouse: { value: new THREE.Vector2(0, 0) }
        },
        vertexShader: `
            varying vec3 vNormal;
            varying vec3 vViewPosition;
            varying float vNoise;
            uniform float uTime;
            uniform vec2 uMouse;
            
            // Simplex noise via trigonometric hash
            vec3 hash(vec3 p) {
                p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
                         dot(p, vec3(269.5, 183.3, 246.1)),
                         dot(p, vec3(113.5, 271.9, 124.6)));
                return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
            }
            float noise(vec3 p) {
                vec3 i = floor(p); vec3 f = fract(p); vec3 u = f*f*(3.0-2.0*f);
                return mix(mix(mix(dot(hash(i+vec3(0,0,0)),f-vec3(0,0,0)), 
                                   dot(hash(i+vec3(1,0,0)),f-vec3(1,0,0)),u.x),
                               mix(dot(hash(i+vec3(0,1,0)),f-vec3(0,1,0)), 
                                   dot(hash(i+vec3(1,1,0)),f-vec3(1,1,0)),u.x),u.y),
                           mix(mix(dot(hash(i+vec3(0,0,1)),f-vec3(0,0,1)), 
                                   dot(hash(i+vec3(1,0,1)),f-vec3(1,0,1)),u.x),
                               mix(dot(hash(i+vec3(0,1,1)),f-vec3(0,1,1)), 
                                   dot(hash(i+vec3(1,1,1)),f-vec3(1,1,1)),u.x),u.y),u.z);
            }

            void main() {
                // Liquid, stretchy venom noise
                float n = noise(position * 1.2 + uTime * 0.8) * 0.6;
                
                // Secondary sharp noise for tentacles/viscosity
                n += noise(position * 3.0 - uTime * 1.5) * 0.2;
                
                // Mouse interaction stretching
                float mouseDist = distance(position.xy, uMouse * 3.0);
                n += smoothstep(2.0, 0.0, mouseDist) * 0.4;
                
                vec3 newPos = position + normal * n;
                vNoise = n;
                
                vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
                vViewPosition = -mvPosition.xyz;
                
                // Recalculate normals for lighting
                vNormal = normalize(normalMatrix * normal * (1.0 + n*0.5));
                
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vNormal;
            varying vec3 vViewPosition;
            varying float vNoise;
            
            uniform vec3 uBaseColor;
            uniform vec3 uReflectColor;
            
            void main() {
                vec3 normal = normalize(vNormal);
                vec3 viewDir = normalize(vViewPosition); // Camera direction
                
                // Fresnel effect for glossy rim lighting
                float fresnel = dot(viewDir, normal);
                fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
                fresnel = pow(fresnel, 3.0);
                
                // Intense specular highlight simulation
                vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
                float specular = pow(max(dot(normal, lightDir), 0.0), 60.0);
                
                // Mix venom shape with intense neon cyan and pink gradients
                vec3 finalColor = mix(uBaseColor, uReflectColor, vNoise * 2.5 + 0.5);
                finalColor += uReflectColor * fresnel * 1.5;
                finalColor += vec3(1.0) * specular * 0.8;
                
                // Semi-transparent glowing liquid
                gl_FragColor = vec4(finalColor, 0.7);
            }
        `,
        transparent: true,
        wireframe: false // Must be false for solid liquid
    });

    const mesh = new THREE.Mesh(geometry, material); 
    scene.add(mesh);
    
    // Mouse Interaction
    let targetX = 0;
    let targetY = 0;
    document.addEventListener('mousemove', (e) => {
        targetX = (e.clientX / window.innerWidth) * 2 - 1;
        targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    function animate() { 
        requestAnimationFrame(animate); 
        
        // Advance time
        material.uniforms.uTime.value += 0.01; 
        
        // Smoothly interpolate mouse uniform
        material.uniforms.uMouse.value.x += (targetX - material.uniforms.uMouse.value.x) * 0.05;
        material.uniforms.uMouse.value.y += (targetY - material.uniforms.uMouse.value.y) * 0.05;
        
        // Constant rotation combined with mouse tilt
        mesh.rotation.y += 0.003; 
        mesh.rotation.x += (targetY * 0.1 - mesh.rotation.x) * 0.05;
        mesh.rotation.y += (targetX * 0.1 - mesh.rotation.y) * 0.05;
        
        renderer.render(scene, camera); 
    }
    
    animate();

    // Scale on resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Execute on window.onload to hide initial WebGL compilation lag behind the preloader
window.addEventListener('load', initThreeHero);
