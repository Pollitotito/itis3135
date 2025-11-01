function showFormResults() {
  const form = document.getElementById("introForm");
  const data = new FormData(form);
  const imageFile = data.get("picture");
  const imageURL = imageFile && imageFile.size > 0 ? URL.createObjectURL(imageFile) : "image/Diego&chele.jpg";

  // Collect courses
  const courses = [];
  document.querySelectorAll(".course").forEach((courseDiv) => {
    const department = courseDiv.querySelector('input[name="department"]').value;
    const number = courseDiv.querySelector('input[name="number"]').value;
    const courseName = courseDiv.querySelector('input[name="course-name"]').value;
    const reason = courseDiv.querySelector('input[name="reason"]').value;
    courses.push({ department, number, courseName, reason });
  });

  // Build HTML for courses
  const coursesHTML = courses.map((c) => `
    <li><strong>${c.department} ${c.number} – ${c.courseName}:</strong> ${c.reason}</li>
  `).join("");

  // Build the final layout
  document.querySelector("main").innerHTML = `
  <body>
  <div class="front-introduction">
  <main>
    <h2 class="center">${data.get("last-name")}, ${data.get("first-name")} ${data.get("middle-name") || ""}</h2>
    <p class="center">${data.get("statement")}<br><span class="italicized">${data.get("first-name")[0]}.${data.get("last-name")[0]}. ${data.get("date")}.</span></p>
    <h3 class="center">${data.get("first-name")} ${data.get("last-name")} ${data.get("divider")} ${data.get("mascot-adj")} ${data.get("mascot-animal")}</h3>

    <img class="foto-diego" src="${imageURL}" alt="${data.get("caption")}">
    <p class="center"><i>${data.get("caption")}</i></p>

    <p class="justified">${data.get("statement-text")}</p>

    <ul>
      <li><strong>Personal Background:</strong> ${data.get("personal-background")}</li>
      <li><strong>Academic Background:</strong> ${data.get("academic-background")}</li>
      <li><strong>Primary Computers:</strong> ${data.get("computers")}</li>
      <li><strong>Courses I’m Taking & Why:</strong>
        <ul>${coursesHTML}</ul>
      </li>
      <li><strong>Funny/Interesting Item to Remember Me by:</strong> ${data.get("funny-item")}</li>
      ${data.get("share") ? `<li><strong>Something to Share:</strong> ${data.get("share")}</li>` : ""}
    </ul>

    <p class="center">“${data.get("quote")}”<br> ― ${data.get("author")}</p>

    <div class="center">
      <button id="resetPage">Reset Form</button>
    </div>
    </main>
  </div>
  </body>
  `;

  // Reload page button
  document.getElementById("resetPage").addEventListener("click", () => location.reload());
}

// Wait until everything loads
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("introForm");
  const clearButton = document.getElementById("clearButton");
  const addCourseButton = document.getElementById("add-course");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    showFormResults();
  });

  clearButton.addEventListener("click", () => {
    form.querySelectorAll("input, textarea").forEach((el) => {
      if (!["submit", "button", "reset", "file"].includes(el.type)) el.value = "";
    });
  });

  addCourseButton.addEventListener("click", () => {
    const container = document.getElementById("courses-container");
    const div = document.createElement("div");
    div.classList.add("course");
    div.innerHTML = `
      <input type="text" name="department" placeholder="Department" required>
      <input type="text" name="number" placeholder="Number" required>
      <input type="text" name="course-name" placeholder="Course Name" required>
      <input type="text" name="reason" placeholder="Reason" required>
      <button type="button" class="delete-course">Delete</button>
    `;
    container.appendChild(div);
    div.querySelector(".delete-course").addEventListener("click", () => div.remove());
  });
});
