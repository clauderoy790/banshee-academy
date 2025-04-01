# Banshee Academy

<p align="center">
  <img src="banshee-academy/src/assets/images/banshee-academy-logo-alpha.png" width="200" alt="Banshee Academy Logo">
</p>

A Progressive Web App (PWA) designed to help Warcraft 3 players memorize the resource costs of buildings, units, and upgrades across all races, with a focus on the Undead faction.

## 📱 Live Demo

Check out the live application: [Banshee Academy](https://clauderoy790.github.io/banshee-academy/)

## ✨ Features

- **Progressive Web App**: Install on mobile or desktop devices for offline use
- **Multi-Race Support**: Practice with Undead, Human, Night Elf, and Orc
- **Learning Mode**: Browse through cards to study resource costs
- **Game Mode**: Test your knowledge with timed challenges
- **Difficulty Levels**: Easy (Buildings only, 30s), Medium (Buildings and units, 20s), Hard (Buildings, units, and upgrades, 10s) per card
- **Progress Tracking**: Track your best streaks for each race and difficulty
- **Responsive Design**: Works on all device sizes
- **Race-Specific Audio**: Themed background music for each race

## 🚀 Technologies Used

- Angular 19
- PWA (Progressive Web App)
- Local Storage for progress tracking
- Service Workers for offline capabilities
- CSS Animations for a polished user experience

## 🛠️ Development Setup

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- Angular CLI (v19.0.0 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/clauderoy790/banshee-academy.git
   cd banshee-academy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run start
   ```

4. Open your browser and navigate to `http://localhost:4200/`

### Building for Production

```bash
ng build --configuration=production
```

The build artifacts will be stored in the `dist/banshee-academy` directory.

## 📝 Project Structure

```
banshee-academy/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── splash-screen/
│   │   │   ├── main-menu/
│   │   │   ├── mode-selection/
│   │   │   ├── difficulty-selection/
│   │   │   ├── learning-mode/
│   │   │   ├── game-screen/
│   │   │   └── shared/
│   │   │       └── mute-button/
│   │   ├── models/
│   │   ├── services/
│   │   └── ...
│   ├── assets/
│   │   ├── images/
│   │   │   ├── cards/
│   │   │   └── icons/
│   │   └── sounds/
│   └── ...
└── ...
```

## 🎯 Future Enhancements

- Additional card categories (Heroes, Abilities)
- Spaced repetition system for more effective learning
- Multiplayer quiz mode
- Custom card sets for personalized practice
- Statistics and learning analytics
- Achievement system

## 💡 Inspiration

This project was inspired by the need to master Warcraft 3's economic aspects, particularly for new players learning the Undead race. The app name "Banshee Academy" pays homage to one of the most iconic Undead units.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- Blizzard Entertainment for Warcraft 3
- All the resources and communities that have documented Warcraft 3 game data
- The Angular team for their excellent framework and PWA support

---

Made with 💜 by Claude
