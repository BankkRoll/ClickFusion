"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCoolModeEffect = void 0;
// src/utils/coolMode.ts
// Credits: Adapted from https://github.com/rainbow-me/rainbowkit/blob/main/site/lib/useCoolMode.ts
var react_1 = require("react");
var useCoolModeEffect = function (effect, options) {
    var ref = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        if (ref.current && effect === "coolmode") {
            // Initialization of the particle effect
            return applyParticleEffect(ref.current, options);
        }
    }, [effect, options]);
    return ref;
};
exports.useCoolModeEffect = useCoolModeEffect;
// Singleton pattern for generating or fetching the particle effect container
var getContainer = function () {
    var id = "_coolMode_effect";
    var existingContainer = document.getElementById(id);
    if (existingContainer) {
        return existingContainer;
    }
    var container = document.createElement("div");
    container.setAttribute("id", id);
    container.setAttribute("style", "overflow:hidden; position:fixed; height:100%; top:0; left:0; right:0; bottom:0; pointer-events:none; z-index:2147483647");
    document.body.appendChild(container);
    return container;
};
var instanceCounter = 0;
// Core logic for applying particle effects
var applyParticleEffect = function (element, options) {
    instanceCounter++;
    var defaultParticle = "circle";
    var particleType = (options === null || options === void 0 ? void 0 : options.particle) || defaultParticle;
    var sizes = [15, 20, 25, 35, 45];
    var limit = 45;
    var particles = [];
    var autoAddParticle = false;
    var mouseX = 0;
    var mouseY = 0;
    var container = getContainer();
    // Function to generate a single particle
    function generateParticle() {
        var size = (options === null || options === void 0 ? void 0 : options.size) || sizes[Math.floor(Math.random() * sizes.length)];
        var speedHorz = (options === null || options === void 0 ? void 0 : options.speedHorz) || Math.random() * 10;
        var speedUp = (options === null || options === void 0 ? void 0 : options.speedUp) || Math.random() * 25;
        var spinVal = Math.random() * 360;
        var spinSpeed = Math.random() * 35 * (Math.random() <= 0.5 ? -1 : 1);
        var top = mouseY - size / 2;
        var left = mouseX - size / 2;
        var direction = Math.random() <= 0.5 ? -1 : 1;
        var particle = document.createElement("div");
        if (particleType === "circle") {
            var svgNS = "http://www.w3.org/2000/svg";
            var circleSVG = document.createElementNS(svgNS, "svg");
            var circle = document.createElementNS(svgNS, "circle");
            circle.setAttributeNS(null, "cx", (size / 2).toString());
            circle.setAttributeNS(null, "cy", (size / 2).toString());
            circle.setAttributeNS(null, "r", (size / 2).toString());
            circle.setAttributeNS(null, "fill", "hsl(".concat(Math.random() * 360, ", 70%, 50%)"));
            circleSVG.appendChild(circle);
            circleSVG.setAttribute("width", size.toString());
            circleSVG.setAttribute("height", size.toString());
            particle.appendChild(circleSVG);
        }
        else {
            particle.innerHTML = "<img src=\"".concat(particleType, "\" width=\"").concat(size, "\" height=\"").concat(size, "\" style=\"border-radius: 50%\">");
        }
        particle.style.position = "absolute";
        particle.style.transform = "translate3d(".concat(left, "px, ").concat(top, "px, 0px) rotate(").concat(spinVal, "deg)");
        container.appendChild(particle);
        particles.push({
            direction: direction,
            element: particle,
            left: left,
            size: size,
            speedHorz: speedHorz,
            speedUp: speedUp,
            spinSpeed: spinSpeed,
            spinVal: spinVal,
            top: top,
        });
    }
    // Update existing particles' positions and other properties
    function refreshParticles() {
        particles.forEach(function (p) {
            p.left = p.left - p.speedHorz * p.direction;
            p.top = p.top - p.speedUp;
            p.speedUp = Math.min(p.size, p.speedUp - 1);
            p.spinVal = p.spinVal + p.spinSpeed;
            if (p.top >=
                Math.max(window.innerHeight, document.body.clientHeight) + p.size) {
                particles = particles.filter(function (o) { return o !== p; });
                p.element.remove();
            }
            p.element.setAttribute("style", [
                "position:absolute",
                "will-change:transform",
                "top:".concat(p.top, "px"),
                "left:".concat(p.left, "px"),
                "transform:rotate(".concat(p.spinVal, "deg)"),
            ].join(";"));
        });
    }
    var animationFrame;
    var lastParticleTimestamp = 0;
    var particleGenerationDelay = 30;
    // Animation loop for particles
    function loop() {
        var currentTime = performance.now();
        if (autoAddParticle &&
            particles.length < limit &&
            currentTime - lastParticleTimestamp > particleGenerationDelay) {
            generateParticle();
            lastParticleTimestamp = currentTime;
        }
        refreshParticles();
        animationFrame = requestAnimationFrame(loop);
    }
    loop();
    var isTouchInteraction = "ontouchstart" in window;
    var tap = isTouchInteraction ? "touchstart" : "mousedown";
    var tapEnd = isTouchInteraction ? "touchend" : "mouseup";
    var move = isTouchInteraction ? "touchmove" : "mousemove";
    var updateMousePosition = function (e) {
        var _a, _b;
        if ("touches" in e) {
            mouseX = (_a = e.touches) === null || _a === void 0 ? void 0 : _a[0].clientX;
            mouseY = (_b = e.touches) === null || _b === void 0 ? void 0 : _b[0].clientY;
        }
        else {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }
    };
    var tapHandler = function (e) {
        updateMousePosition(e);
        autoAddParticle = true;
    };
    var disableAutoAddParticle = function () {
        autoAddParticle = false;
    };
    element.addEventListener(move, updateMousePosition, { passive: true });
    element.addEventListener(tap, tapHandler, { passive: true });
    element.addEventListener(tapEnd, disableAutoAddParticle, { passive: true });
    element.addEventListener("mouseleave", disableAutoAddParticle, {
        passive: true,
    });
    // Cleanup logic
    return function () {
        element.removeEventListener(move, updateMousePosition);
        element.removeEventListener(tap, tapHandler);
        element.removeEventListener(tapEnd, disableAutoAddParticle);
        element.removeEventListener("mouseleave", disableAutoAddParticle);
        // Cancel animation loop once animations are done
        var interval = setInterval(function () {
            if (animationFrame && particles.length === 0) {
                cancelAnimationFrame(animationFrame);
                clearInterval(interval);
                // Clean up container if this is the last instance
                if (--instanceCounter === 0) {
                    container.remove();
                }
            }
        }, 500);
    };
};
