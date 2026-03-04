console.log("script.js is working...");

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
    <button onclick="loadVocabularies(${lesson.level_no})" class="btn btn-outline btn-primary">
          <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>`;

    lessonsContainer.appendChild(lessonBtn);
  }
};

const loadVocabularies = async (level) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/level/${level}`,
  );
  const json = await res.json();

  const vocabularies = json.data;

  //   console.log(vocabularies);

  const vocabContainer = document.getElementById("vocabulary-container");
  vocabContainer.innerHTML = "";
  vocabContainer.classList.add("h-[670px]");
  vocabContainer.classList.add("overflow-y-scroll");

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
    console.log(vocabulary);
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
            <button id="word-1-details-btn" class="square-btn">
              <i class="fa-solid fa-circle-info"></i>
            </button>
            <button id="word-1-sound-btn" class="square-btn">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
        </div>`;

    vocabContainer.appendChild(vocabularyCard);
  });
};

loadLessons();
