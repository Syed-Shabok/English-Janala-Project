# 🌍 English Janala

<p align="left">
  <a href="https://syed-shabok.github.io/English-Janala-Project/" target="_blank">
    <img src="https://img.shields.io/badge/🚀%20Live%20Demo-Click%20Here-success?style=for-the-badge">
  </a>
</p>

English Janala (Bengali for "Window") is a sleek, dynamic web application designed to help learners expand their vocabulary through an intuitive interface. By fetching data dynamically from APIs, it provides an organized way to learn words by difficulty levels, complete with audio pronunciations and contextual examples.

---

## 🌟 Key Features

### 1. **Dynamic Level Progression**
- **Smart Fetching:** Lessons are loaded in real-time from the backend API.
- **Interactive UI:** High-contrast active states highlight the current lesson button for easy navigation.
- **Centered Design:** Follows a clean, Figma-inspired layout to keep the learner focused.

### 2. **Contextual Vocabulary Cards**
- **Quick Glance:** View word meanings and phonetic pronunciations instantly.
- **No-Data States:** Includes a friendly "No Word Found" message for empty categories.
- **Detailed Modals:** Click the details icon to see:
  - Example sentences for context.
  - Synonyms to broaden expression.
  - A dedicated "Close" button for smooth workflow.

### 3. **Smart Search & Pronunciation**
- **Instant Search:** A real-time search bar that filters words across all levels and automatically resets filters for broad results.
- **Native Audio:** Uses the browser's **Speech Synthesis API** to provide high-quality English pronunciation.

---

## 🛠️ Tech Stack & Implementation

| Layer | Technology |
| :--- | :--- |
| **Frontend** | HTML5, Tailwind CSS / CSS3 |
| **Logic** | Vanilla JavaScript (ES6+) |
| **API Handling** | Fetch API with Async/Await |
| **Voice Engine** | Web Speech Synthesis API |

### **Speech Engine Snippet**
```javascript
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US"; // Standard English Pronunciation
  window.speechSynthesis.speak(utterance);
}
