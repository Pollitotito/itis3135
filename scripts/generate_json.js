document.addEventListener("DOMContentLoaded", () => {
  const generateJSONBtn = document.getElementById("generateJSONBtn");

  function escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  generateJSONBtn.addEventListener("click", () => {
    // Collect data from form fields
    const introData = {
      firstName: document.getElementById("first-name").value,
      preferredName: document.getElementById("nickname").value,
      middleInitial: document.getElementById("middle-name").value,
      lastName: document.getElementById("last-name").value,
      divider: document.getElementById("divider").value,
      mascotAdjective: document.getElementById("mascot-adj").value,
      mascotAnimal: document.getElementById("mascot-animal").value,
      image: document.getElementById("picture").value || "images/default.jpg",
      imageCaption: document.getElementById("caption").value,
      personalStatement: document.getElementById("statement-text").value,
      personalBackground: document.getElementById("personal-background").value,
      professionalBackground: "N/A", // not in form
      academicBackground: document.getElementById("academic-background").value,
      subjectBackground: "N/A", // not in form
      primaryComputer: document.getElementById("computers").value,

      courses: Array.from(
        document.querySelectorAll("#courses-container .course")
      ).map((course) => ({
        department: course.querySelector("[name='department']").value,
        number: course.querySelector("[name='number']").value,
        name: course.querySelector("[name='course-name']").value,
        reason: course.querySelector("[name='reason']").value
      })),

      links: [
        { name: "GitHub", href: "https://github.com/Pollitotito" },
        { name: "GitHub Page", href: "https://Pollitotito.github.io/" },
        { name: "freeCodeCamp", href: "https://www.freecodecamp.org/diegomendoza" },
        { name: "Codecademy", href: "https://www.codecademy.com/profiles/net3354821146" },
        { name: "LinkedIn", href: "http://www.linkedin.com/in/diego-mendoza7" }
      ]
    };

    // Convert JSON object to formatted string
    const jsonOutput = JSON.stringify(introData, null, 2);
    const escaped = escapeHTML(jsonOutput);

    // Replace form with JSON display
    const main = document.querySelector("main");
    main.innerHTML = `
      <h2>Introduction JSON</h2>
      <section>
        <pre><code class="language-json">${escaped}</code></pre>
      </section>
    `;

    // Highlight JSON
    if (window.hljs) {
      hljs.highlightAll();
    }
  });
});