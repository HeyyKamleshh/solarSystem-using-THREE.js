# 🌌 3D Solar System Simulation

This project is a **3D visualization of the solar system** using **Three.js**, containing planets orbiting the Sun and  rotating on their own axes, and enhanced with interactive controls. It is **fully responsive** project, deployed on **Vercel**, and version-controlled via **GitHub**.

## 🔗 Live Demo
[Click here to view the project on  Vercel](https://solar-system-using-three-js-g69x.vercel.app/)

---
## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/HeyyKamleshh/solarSystem-using-THREE.js.git
cd solarSystem-using-THREE
```
### 2. Install dependencies
```bash
npm install
```
### 3. Start development server
```bash
npm run dev
```

## 🚀 Features

- ☀️ Realistic 3D model of the solar system with:
  - Sun at the center emitting light.
  - Planets orbiting in their respectuve orbit around the sun and rotating on their on own axis.
  - Stars in background.
- 🕹️ Interactive UI controls to:
  - Adjust **orbital** and **rotation** speed of each planet using the control table sliders.
  - **Pause/Resume** the animation.
- 📱 Responsive design — works on both **desktop** and **mobile** devices.

---

## 🛠️ Technologies Used

- **Three.js** – for 3D rendering and animation.
- **JavaScript** – core logic and interactivity.
- **HTML/CSS** – structure and styling.
- **Vercel** – for deployment.
- **Git & GitHub** – for version control.

---
## 📂 Project Structure
```bash
root/
│
├── public/textures/ # Contains images
│
├── src/ 
│ └── script.js
│
├── index.html 
├── style.css
├── package.json
├──package-lock.json
├── README.md 

```

## 🧠 How It Works

- Planets are created using `THREE.SphereGeometry` with respective textures, radius and Material.
- The Sun uses `MeshBasicMaterial` to glow, while planets use `MeshStandardMaterial` to reflect light.
- A `PointLight` is placed at the center (Sun) to simulate sunlight and a ambient light is added to provide  sufficient light .
- Each planet orbits around the Sun using trigonometric calculations, and rotates on its own axis.
- Orbit paths are visualized using `THREE.LineLoop`.
- Background stars are randomly placed `THREE.Points`.
- A pause button is added to pause/resume the animation.

---

## 📸 Screenshots 
![image](https://github.com/user-attachments/assets/e87949b2-8379-48ed-819e-c9122101aef1)

---

![image](https://github.com/user-attachments/assets/273fc183-83d3-4581-b0c3-780e42a9f81a)

