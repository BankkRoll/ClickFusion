"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDragModeEffect = void 0;
// src/utils/dragMode.ts
var react_1 = require("react");
var useDragModeEffect = function (effect, options) {
    var ref = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        var element = ref.current;
        if (!element || effect !== "dragmode")
            return;
        // Get initial position
        var rect = element.getBoundingClientRect();
        var initialLeft = rect.left;
        var initialTop = rect.top;
        // Create Canvas for Background
        var canvas = document.createElement("div");
        canvas.style.position = "fixed";
        canvas.style.left = "0";
        canvas.style.top = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.zIndex = "-1";
        canvas.style.backgroundColor =
            (options === null || options === void 0 ? void 0 : options.color) === "light"
                ? "rgba(255, 255, 255, 0.7)"
                : (options === null || options === void 0 ? void 0 : options.color) === "dark"
                    ? "rgba(0, 0, 0, 0.7)"
                    : "transparent";
        document.body.appendChild(canvas);
        // Preserve initial styles
        var originalStyle = {
            position: element.style.position,
            left: element.style.left,
            top: element.style.top,
            zIndex: element.style.zIndex,
            cursor: element.style.cursor,
        };
        var isDragging = false;
        var offsetX = 0, offsetY = 0;
        var startDrag = function (e) {
            isDragging = true;
            var clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
            var clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
            offsetX = clientX - initialLeft;
            offsetY = clientY - initialTop;
            element.style.cursor = "grabbing";
        };
        var doDrag = function (e) {
            if (!isDragging)
                return;
            var clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
            var clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
            var x = clientX - offsetX;
            var y = clientY - offsetY;
            var maxBoundX = (options === null || options === void 0 ? void 0 : options.maxWidth) || window.innerWidth;
            var maxBoundY = (options === null || options === void 0 ? void 0 : options.maxHeight) || window.innerHeight;
            var boundedX = Math.min(Math.max(0, x), maxBoundX);
            var boundedY = Math.min(Math.max(0, y), maxBoundY);
            element.style.left = "".concat(boundedX, "px");
            element.style.top = "".concat(boundedY, "px");
        };
        var stopDrag = function () {
            isDragging = false;
            element.style.cursor = "grab";
        };
        element.style.position = "fixed";
        element.style.left = "".concat(initialLeft, "px");
        element.style.top = "".concat(initialTop, "px");
        element.style.cursor = "grab";
        element.addEventListener("mousedown", startDrag);
        element.addEventListener("touchstart", startDrag);
        window.addEventListener("mousemove", doDrag);
        window.addEventListener("touchmove", doDrag);
        window.addEventListener("mouseup", stopDrag);
        window.addEventListener("touchend", stopDrag);
        return function () {
            element.removeEventListener("mousedown", startDrag);
            element.removeEventListener("touchstart", startDrag);
            window.removeEventListener("mousemove", doDrag);
            window.removeEventListener("touchmove", doDrag);
            window.removeEventListener("mouseup", stopDrag);
            window.removeEventListener("touchend", stopDrag);
            document.body.removeChild(canvas); // Remove canvas
            // Restore original styles
            Object.assign(element.style, originalStyle);
        };
    }, [effect, options]);
    return ref;
};
exports.useDragModeEffect = useDragModeEffect;
