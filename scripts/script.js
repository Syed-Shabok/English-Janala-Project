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
    <button class="btn btn-outline btn-primary">
          <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>`;

    lessonsContainer.appendChild(lessonBtn);
  }
};

loadLessons();
