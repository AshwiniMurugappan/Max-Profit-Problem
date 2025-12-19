# 🚀 Mars Land: Maximum Profit Optimizer

A high-performance web dashboard designed to solve complex resource allocation and construction scheduling problems. This application calculates the global maximum profit for a Martian colony, accounting for the critical constraint that **construction takes time** and revenue only begins **after** a building is finished.

---

## 📋 Table of Contents
* [The Problem](#-the-problem)
* [Key Features](#-key-features)
* [Project Architecture](#-project-Architecture)
* [The Optimization Engine](#-the-optimization-engine)
* [UI/UX Design Philosophy](#-uiux-design-philosophy)
* [How to Run](#-how-to-run)

---

## 🏗️ The Problem 
Most resource optimizers use simple multiplication. However, in this scenario, time is the primary constraint:

* **Sequential Construction**: Only one building can be built at a time.
* **Delayed Earnings**: If a Theatre takes 5 units to build, it earns nothing during those 5 units. If the total time is 13 units, it only earns for the remaining 8 units.

### Property Specifications:

| Property | Build Time | Profit / Unit |
| :--- | :--- | :--- |
| **Theatre (T)** | 5 units | $1500 |
| **Pub (P)** | 4 units | $1000 |
| **Commercial Park (C)** | 10 units | $2000 |

---

## ✨ Key Features

### 1. Sequential Optimization Engine
The algorithm uses a brute-force nested search to evaluate every valid combination of buildings. It doesn't just find the highest count; it finds the highest earning potential based on the construction sequence.

### 2. High-End Glassmorphism UI
* **Backdrop Blur**: Utilizes `backdrop-filter: blur(15px)` for a modern, frosted-glass effect.
* **Shine Animation**: Custom CSS pseudo-elements create a "light sweep" effect when hovering over cards.
* **Theme Engine**: A robust data-theme switcher that swaps background assets and accent colors (Mars vs. Earth) using CSS Variables.

### 3. Dynamic Visualizations
* **Animated Counters**: Uses `requestAnimationFrame` to animate the profit total from $0 to the result for a premium feel.
* **Timeline Bar**: Dynamically generates a color-coded construction sequence to help users visualize the building order.

---

## 🛠️ Project Architecture 

* **HTML5**: Semantic structure using `<aside>` for sidebar navigation and `<main>` for dashboard content.
* **CSS3**:
    * Advanced Flexbox layouts with sticky positioning.
    * CSS Variables for real-time theme switching.
    * Keyframe animations and transitions for micro-interactions.
* **JavaScript (Vanilla)**:
    * Efficient DOM manipulation.
    * Mathematical optimization logic.
    * `toLocaleString()` for professional currency formatting.
 
### 📂 File Structure
* `index.html`: Semantic layout using `<aside>` for sticky navigation and `<main>` for data display.
* `style.css`: Advanced Flexbox layout, responsive scaling, and theme-switching logic.
* `script.js`: State management, optimization math, and UI animation logic.

---

## 🧮 The Optimization Engine
The core logic is found in the `calculateMaxProfit()` function. It evaluates building combinations where:

$$(CountT \times 5) + (CountP \times 4) + (CountC \times 10) \leq TotalTime$$

For every valid combination, it calculates:

$$\sum (RemainingTime \times ProfitPerUnit)$$

This ensures that we prioritize buildings that can be completed early enough to generate maximum revenue.

---

## 🎨 UI/UX Design Philosophy

### The "Shine" Micro-interaction
To add depth, I implemented a diagonal gradient beam that sweeps across the container on hover:

```css
.card::before {
    content: '';
    position: absolute;
    left: -150%;
    width: 50%;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent);
    transform: skewX(-25deg);
}
```

## 🚀 How to Run

* Clone this repository.

* Open index.html in any modern web browser.

* Input your total available time units and click Analyze Profit.
