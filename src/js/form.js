export function setupGenreButtons(containers, genres) {
  containers.forEach(container => {
    genres.forEach(genre => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = genre;

      btn.addEventListener("click", function () {
        const card = container.closest(".user-card");
        const currentType = container.dataset.type;
        const oppositeType = currentType === "favorite" ? "avoid" : "favorite";

        const oppositeContainer = card.querySelector(
          `.genres[data-type="${oppositeType}"]`
        );

        const oppositeButtons = oppositeContainer.querySelectorAll("button");

        oppositeButtons.forEach(otherBtn => {
          if (otherBtn.textContent === genre) {
            otherBtn.classList.remove("active");
          }
        });

        btn.classList.toggle("active");
      });

      container.appendChild(btn);
    });
  });
}

export function setupMoodButtons(containers, moods) {
  containers.forEach(container => {
    moods.forEach(mood => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = mood;

      btn.addEventListener("click", function () {
        const allBtns = container.querySelectorAll("button");
        allBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      });

      container.appendChild(btn);
    });
  });
}

export function getUserData(card) {
  const name = card.querySelector("input").value.trim();

  const favoriteBtns = card.querySelectorAll(
    '.genres[data-type="favorite"] button.active'
  );

  const avoidBtns = card.querySelectorAll(
    '.genres[data-type="avoid"] button.active'
  );

  const moodBtn = card.querySelector(".moods button.active");

  const favorites = [];
  favoriteBtns.forEach(btn => favorites.push(btn.textContent));

  const avoid = [];
  avoidBtns.forEach(btn => avoid.push(btn.textContent));

  const mood = moodBtn ? moodBtn.textContent : null;

  return {
    name,
    favorites,
    avoid,
    mood
  };
}

export function isValidUser(user) {
  if (!user.name) return false;
  if (user.favorites.length === 0) return false;
  if (!user.mood) return false;
  return true;
}

export function resetForm(userCards) {
  userCards.forEach(card => {
    const input = card.querySelector("input");
    input.value = "";

    const activeGenres = card.querySelectorAll(".genres button.active");
    activeGenres.forEach(btn => btn.classList.remove("active"));

    const activeMood = card.querySelector(".moods button.active");
    if (activeMood) {
      activeMood.classList.remove("active");
    }
  });
}