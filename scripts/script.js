console.log("script.js is working...");

// Fetches Lessons from API and Displays them as Buttons.
const loadLessons = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/levels/all",
  );
  const json = await response.json();

  const lessons = json.data;

  //   console.log(lessons);

  const lessonsContainer = document.getElementById("lessons-btn-container");
  lessonsContainer.innerHTML = "";

  for (let lesson of lessons) {
    const lessonBtn = document.createElement("div");
    lessonBtn.innerHTML = `
    <button id="lesson-${lesson.level_no}-btn" onclick="loadVocabularies(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
          <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>`;

    lessonsContainer.appendChild(lessonBtn);
  }
};

// Fetches Vocabularies from API.
const loadVocabularies = async (level) => {
  showLoadingSpinner(true);

  const res = await fetch(
    `https://openapi.programming-hero.com/api/level/${level}`,
  );
  const json = await res.json();

  const vocabularies = json.data;

  //   console.log(vocabularies);

  highlightBtn(level);

  displayVocabularies(vocabularies);

  showLoadingSpinner(false);
};

// Adds Highlight to selected Lesson Button.
const highlightBtn = async (id) => {
  const selectedBtn = document.getElementById(`lesson-${id}-btn`);

  //  console.log(selectedBtn);

  removeBtnHighlights();

  selectedBtn.classList.remove("btn-outline");
};

// Removes Highlight from all Lesson Buttons.
const removeBtnHighlights = () => {
  const lessonBtns = document.querySelectorAll(".lesson-btn");

  lessonBtns.forEach((lessonBtn) => {
    lessonBtn.classList.add("btn-outline");
  });
};

// Toggles the Modal of a given Vocabulary.
const showVocabularyModal = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/word/${id}`,
  );
  const json = await res.json();
  const vocabDetails = json.data;

  //   console.log(vocabDetails);

  const modal = document.getElementById("vocabulary_modal");
  const modalContent = document.getElementById("modal-content");

  modalContent.innerHTML = `
          <div class="space-y-8 p-4 border-3 border-[#EDF7FF] rounded-xl">
            <div class="space-y-2">
              <h2 class="text-3xl font-semibold">
                ${vocabDetails.word ? vocabDetails.word : "শব্দ পাওয়া যায়নি"} (<i class="fa-solid fa-microphone-lines"></i>:
                <span>${vocabDetails.pronunciation ? vocabDetails.pronunciation : "উচ্চারণ পাওয়া যায়নি"}</span>)
              </h2>
            </div>

            <div class="space-y-2">
              <p class="text-2xl font-semibold">Meaning</p>
              <p class="font-bangla text-2xl font-medium">${vocabDetails.meaning ? vocabDetails.meaning : "অর্থ পাওয়া যায়নি"}</p>
            </div>

            <div class="space-y-2">
              <p class="text-2xl font-semibold">Example</p>
              <p class="font-bangla text-2xl font-medium">
                ${vocabDetails.sentence ? vocabDetails.sentence : "উদাহরণ পাওয়া যায়নি"}
              </p>
            </div>

            <div class="space-y-2">
              <p class="font-bangla text-2xl font-medium">সমার্থক শব্দ গুলো</p>
              <div id="synonyms-container" class="flex gap-2">
              </div>
            </div>
          </div>`;

  const synonymsContainer = document.getElementById("synonyms-container");

  const synonyms = vocabDetails.synonyms;

  if (synonyms.length === 0) {
    synonymsContainer.innerHTML = `<p class="font-bangla text-2xl font-medium">সমার্থক শব্দ পাওয়া যায়নি</p>`;
  }

  synonyms.forEach((synonym) => {
    const synonymBadge = document.createElement("div");
    synonymBadge.innerHTML = `<div class="badge badge-soft badge-primary py-5 text-black">
                  ${synonym}
                </div>`;

    synonymsContainer.appendChild(synonymBadge);
  });

  modal.showModal();
};

// Displays a Spinner while Content is being loaded.
const showLoadingSpinner = (isLoading) => {
  const spinner = document.getElementById("spinner");
  const vocabContainer = document.getElementById("vocabulary-container");
  ("no-option-selected");

  if (isLoading) {
    spinner.classList.remove("hidden");
    vocabContainer.classList.add("hidden");
  } else {
    spinner.classList.add("hidden");
    vocabContainer.classList.remove("hidden");
  }
};

// Displays a given list of Vocabularies.
const displayVocabularies = (vocabularies) => {
  const vocabContainer = document.getElementById("vocabulary-container");
  vocabContainer.innerHTML = "";

  if (vocabularies.length < 4) {
    vocabContainer.classList.remove("h-[670px]");
    vocabContainer.classList.remove("overflow-y-scroll");
  }

  if (vocabularies.length >= 4) {
    vocabContainer.classList.add("h-[670px]");
    vocabContainer.classList.add("overflow-y-scroll");
  }

  if (vocabularies.length === 0) {
    vocabContainer.classList.remove("h-[670px]");
    vocabContainer.classList.remove("overflow-y-scroll");
    vocabContainer.innerHTML = `<!-- Shows when there is an empty lesson -->
        <div
          id="no-option-selected"
          class="text-center font-bangla space-y-6 col-span-full p-10"
        >
          <img
            src="./assets/alert-error.png"
            class="mx-auto"
            alt="Alert Icon"
          />
          <p class="text-[#79716B]">
            এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
          </p>
          <h3 class="text-2xl md:text-4xl font-medium">নেক্সট Lesson এ যান</h3>
        </div>`;
  }

  vocabularies.forEach((vocabulary) => {
    const vocabularyCard = document.createElement("div");
    vocabularyCard.innerHTML = `
    <div id="word-1" class="bg-white space-y-10 h-75 p-8 rounded-lg flex flex-col justify-center">
          <div class="space-y-5 text-center min-h-[80px]">
            <h3 class="text-2xl xl:text-3xl font-bold">${vocabulary.word ? vocabulary.word : "শব্দ পাওয়া যায়নি"}</h3>
            <p class="text-lg xl:text-xl">Meaning /Pronunciation</p>
            <h3 class="text-2xl xl:text-3xl font-semibold font-bangla text-[#18181B]">
              ${vocabulary.meaning ? vocabulary.meaning : "অর্থ পাওয়া যায়নি"} / ${vocabulary.pronunciation ? vocabulary.pronunciation : "উচ্চারণ পাওয়া যায়নি"}
            </h3>
          </div>

          <div class="flex justify-between ">
            <button onclick="showVocabularyModal(${vocabulary.id})" id="word-1-details-btn" class="square-btn">
              <i class="fa-solid fa-circle-info"></i>
            </button>
            <button onclick="pronounceWord('${vocabulary.word}')" id="word-1-sound-btn" class="square-btn">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
        </div>`;

    vocabContainer.appendChild(vocabularyCard);
  });
};

// Displays a Message when Searched Vocabulary is not found.
const showNotFoundMessage = () => {
  const vocabContainer = document.getElementById("vocabulary-container");
  vocabContainer.innerHTML = "";

  vocabContainer.classList.remove("h-[670px]");
  vocabContainer.classList.remove("overflow-y-scroll");
  vocabContainer.innerHTML = `<!-- Shows when searched Vocabulary is not found -->
        <div
          id="no-option-selected"
          class="text-center font-bangla space-y-6 col-span-full p-10"
        >
          <img
            src="./assets/alert-error.png"
            class="mx-auto"
            alt="Alert Icon"
          />
          <p class="text-[#79716B]">
            Vocabulary খুঁজে পাওয়া যাই নি।  
          </p>
          <h3 class="text-2xl md:text-4xl font-medium">আবার চেষ্টা করুন।</h3>
        </div>`;
};

// Plays Pronunciation of given word.
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

// Search Bar Implementation for searching Vocabularies.
document.getElementById("search-btn").addEventListener("click", async () => {
  const searchBar = document.getElementById("search-bar");
  const userInput = searchBar.value.trim().toLowerCase();
  //   console.log(userInput);

  removeBtnHighlights();
  showLoadingSpinner(true);

  const res = await fetch("https://openapi.programming-hero.com/api/words/all");
  const json = await res.json();
  const vocabularies = json.data;

  const filteredVocabularies = vocabularies.filter((vocabulary) =>
    vocabulary.word.toLowerCase().includes(userInput),
  );

  displayVocabularies(filteredVocabularies);

  if (filteredVocabularies.length === 0) {
    showNotFoundMessage();
  }

  showLoadingSpinner(false);
});

// Custom made toggle for viewing answers to questions. Uses the Event Delegation Technique.
document
  .getElementById("questions-container")
  .addEventListener("click", (event) => {
    if (event.target.closest(".expand-btn")) {
      const question = event.target.closest(".question-bar");
      const answer = question.querySelector(".answer");
      const icon = question.querySelector(".icon");

      answer.classList.toggle("show");
      icon.classList.toggle("rotate");

      if (answer.classList.contains("show")) {
        icon.classList.replace("fa-plus", "fa-minus");
      } else {
        icon.classList.replace("fa-minus", "fa-plus");
      }
    }
  });

loadLessons();
