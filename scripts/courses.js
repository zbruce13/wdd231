const courses = [
  { code: "WDD130", name: "Web Fundamentals", credits: 3, type: "WDD", completed: true },
  { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 3, type: "WDD", completed: true },
  { code: "WDD231", name: "Web Frontend Development", credits: 3, type: "WDD", completed: false },
  { code: "CSE111", name: "Programming with Functions", credits: 3, type: "CSE", completed: false },
  { code: "CSE210", name: "Programming with Classes", credits: 3, type: "CSE", completed: false }
];

const container = document.querySelector("#courseContainer");
const allBtn = document.querySelector("#all");
const wddBtn = document.querySelector("#wdd");
const cseBtn = document.querySelector("#cse");
const totalCredits = document.querySelector("#totalCredits");

function displayCourses(list) {
    container.innerHTML = "";
    list.forEach(course => {
        const div = document.createElement("div");
        div.classList.add("course");
        if (course.completed) div.classList.add("completed");
        div.textContent = `${course.code} — ${course.name}`;
        container.appendChild(div);
    });
    const credits = list.reduce((total, course) => total + course.credits, 0);
    totalCredits.textContent = `Total Credits: ${credits}`;
}

displayCourses(courses);
allBtn.addEventListener("click", () => displayCourses(courses));
wddBtn.addEventListener("click", () => displayCourses(courses.filter(c => c.type === "WDD")));
cseBtn.addEventListener("click", () => displayCourses(courses.filter(c => c.type === "CSE")));
