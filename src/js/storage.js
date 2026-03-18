export function saveMatchData(data) {
  localStorage.setItem("movieMatchData", JSON.stringify(data));
}

export function getMatchData() {
  const data = localStorage.getItem("movieMatchData");
  return data ? JSON.parse(data) : null;
}

export function clearMatchData() {
  localStorage.removeItem("movieMatchData");
}