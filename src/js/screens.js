export function showScreen(screen, screens) {
  screens.forEach(item => {
    item.style.display = "none";
  });

  screen.style.display = "block";
}