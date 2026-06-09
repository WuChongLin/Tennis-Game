# 🎾 Tennis Game

Un gioco di tennis interattivo realizzato con **HTML5, CSS3 e JavaScript Vanilla** (senza librerie esterne).

## Caratteristiche

### 🎮 Modalità di Gioco

- **Single Player**: Gioca contro un AI Bot con intelligenza artificiale adattiva
- **Multiplayer**: Modalità locale per 2 giocatori sulla stessa tastiera

### 🎯 Caratteristiche Tecniche

- ✅ Fisica della palla realistica (velocità, rimbalzi, effetti)
- ✅ Controlli fluidi e responsivi
- ✅ Grafica moderna con animazioni
- ✅ Design responsive (desktop e tablet)
- ✅ Sistema di punteggio in tempo reale
- ✅ AI intelligente che si adatta al gioco

## 🎮 Come Giocare

### Controlli

#### Single Player
- **W** - Muovi la racchetta verso l'alto
- **S** - Muovi la racchetta verso il basso

#### Multiplayer
- **Giocatore 1**: W (su) - S (giù)
- **Giocatore 2**: ↑ (su) - ↓ (giù)

### Regole

- La palla rimbalza sui bordi superiore e inferiore
- Colpisci la palla con la racchetta per rimbalzarla verso l'avversario
- Se la palla esce dal lato opposto al tuo, l'avversario segna un punto
- La velocità della palla aumenta leggermente ad ogni colpo

## 📁 Struttura del Progetto

```
Tennis-Game/
├── index.html      # Struttura HTML
├── styles.css      # Stili CSS
├── game.js         # Logica del gioco
└── README.md       # Documentazione
```

## 🚀 Come Avviare

1. Clona il repository:
   ```bash
   git clone https://github.com/WuChongLin/Tennis-Game.git
   ```

2. Apri il file `index.html` nel tuo browser

3. Scegli la modalità di gioco e inizia a giocare!

## 🛠️ Tecnologie Utilizzate

- **HTML5 Canvas** - Rendering della grafica
- **CSS3** - Styling e animazioni
- **JavaScript Vanilla** - Logica del gioco e controlli
- **RequestAnimationFrame** - Loop di gioco ottimizzato

## 📊 Funzionalità Principali

### Game Objects

- **Ball**: Palla con fisica realistica
- **Paddle**: Racchette controllabili
- **Score**: Sistema di punteggio

### Meccaniche

- Collisione palla-racchetta
- Collisione palla-bordi
- Sistema di scoring automatico
- AI per single player
- Controlli multi-player

## 🎨 Personalizzazione

Puoi personalizzare il gioco modificando le seguenti variabili in `game.js`:

```javascript
// Dimensioni della palla
ball.radius = 8;

// Velocità della racchetta
paddle1.speed = 6;

// Velocità iniziale della palla
ball.speedX = 5;
ball.speedY = 5;

// Difficoltà dell'AI (single player)
const difficulty = 5;
```

## 🌟 Possibili Miglioramenti Futuri

- [ ] Suoni e effetti audio
- [ ] Diverse livelli di difficoltà per l'AI
- [ ] Modalità online multiplayer (WebSocket)
- [ ] Effetti visivi avanzati
- [ ] Statistiche e ranking
- [ ] Temi personalizzabili
- [ ] Mobile touch controls

## 📝 Licenza

Questo progetto è libero da usare e modificare.

## 👤 Autore

WuChongLin

---

Divertiti a giocare! 🎾
