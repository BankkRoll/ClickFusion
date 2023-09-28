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
        var parent = element.parentElement;
        if (!parent)
            return;
        // Set parent to relative positioning
        parent.style.position = "relative";
        // Create canvas
        var canvas = document.createElement("canvas");
        var rect = element.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        // Initialize canvas position
        canvas.style.position = "absolute";
        canvas.style.left = "0";
        canvas.style.top = "0";
        // Set styles for canvas
        canvas.style.zIndex = "-1";
        if ((options === null || options === void 0 ? void 0 : options.color) === "light") {
            canvas.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
        }
        else if ((options === null || options === void 0 ? void 0 : options.color) === "dark") {
            canvas.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        }
        else {
            canvas.style.opacity = "0";
        }
        parent.appendChild(canvas);
        element.style.position = "absolute";
        element.style.zIndex = "1";
        element.style.cursor = "grab";
        var isDragging = false;
        var offsetX = 0, offsetY = 0;
        var startDrag = function (e) {
            isDragging = true;
            element.style.cursor = "grabbing";
            var pageX = "touches" in e ? e.touches[0].pageX : e.pageX;
            var pageY = "touches" in e ? e.touches[0].pageY : e.pageY;
            var rect = element.getBoundingClientRect();
            offsetX = pageX - (rect.left + window.scrollX);
            offsetY = pageY - (rect.top + window.scrollY);
        };
        var doDrag = function (e) {
            if (!isDragging)
                return;
            var pageX = "touches" in e ? e.touches[0].pageX : e.pageX;
            var pageY = "touches" in e ? e.touches[0].pageY : e.pageY;
            var x = pageX - offsetX;
            var y = pageY - offsetY;
            requestAnimationFrame(function () {
                element.style.left = "".concat(x - window.scrollX, "px");
                element.style.top = "".concat(y - window.scrollY, "px");
            });
        };
        var stopDrag = function () {
            isDragging = false;
            element.style.cursor = "grab";
        };
        element.addEventListener("mousedown", startDrag);
        element.addEventListener("touchstart", startDrag);
        window.addEventListener("mousemove", doDrag);
        window.addEventListener("touchmove", doDrag);
        window.addEventListener("mouseup", stopDrag);
        window.addEventListener("touchend", stopDrag);
        return function () {
            // Remove event listeners and cleanup
            element.removeEventListener("mousedown", startDrag);
            element.removeEventListener("touchstart", startDrag);
            window.removeEventListener("mousemove", doDrag);
            window.removeEventListener("touchmove", doDrag);
            window.removeEventListener("mouseup", stopDrag);
            window.removeEventListener("touchend", stopDrag);
            // Remove canvas
            parent.removeChild(canvas);
        };
    }, [effect, options]);
    return ref;
};
exports.useDragModeEffect = useDragModeEffect;
