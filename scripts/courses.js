const courses = [
  { code: "WDD131", title: "Dynamic Web Fundamentals", credits: 3, type: "wdd", completed: true },
  { code: "WDD231", title: "Web Frontend Development", credits: 3, type: "wdd", completed: false },
  { code: "CSE110", title: "Intro to Programming", credits: 3, type: "cse", completed: true }
];

function makeCourseCard(course) {
  const div = document.createElement("div");
  div.className = "course-card";
  if (course.completed) div.style.borderColor = "#0a8";
  div.innerHTML = `
    <strong>${course.code}</strong> — ${course.title}
    <div>Credits: ${course.credits}</div>
    <div>Type: ${course.type.toUpperCase()}</div>
    <div>${course.completed ? "Completed" : "Not completed"}</div>
  `;
  return div;
}

function renderCourses(filter = "all") {
  const list = document.getElementById("course-list");
  const creditNode = document.getElementById("credit-count");
  if (!list || !creditNode) return;

  let filtered = courses.slice();
  if (filter === "wdd") filtered = filtered.filter(c => c.type === "wdd");
  if (filter === "cse") filtered = filtered.filter(c => c.type === "cse");

  list.innerHTML = "";
  filtered.forEach(c => list.appendChild(makeCourseCard(c)));

  const totalCredits = filtered.reduce((sum, c) => sum + (c.credits || 0), 0);
  creditNode.textContent = totalCredits;
}

document.addEventListener("DOMContentLoaded", () => {
  renderCourses("all");

  document.querySelectorAll(".controls button").forEach(btn => {
    btn.addEventListener("click", () => {
      const f = btn.getAttribute("data-filter");
      renderCourses(f);
    });
  });
});