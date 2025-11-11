document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generateHTMLBtn");

  function escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  generateBtn.addEventListener("click", () => {
    // Gather form data
    const firstName = document.getElementById("first-name").value;
    const middleName = document.getElementById("middle-name").value;
    const lastName = document.getElementById("last-name").value;
    const nickname = document.getElementById("nickname").value;
    const mascotAdj = document.getElementById("mascot-adj").value;
    const mascotAnimal = document.getElementById("mascot-animal").value;
    const divider = document.getElementById("divider").value;
    const caption = document.getElementById("caption").value;
    const statementText = document.getElementById("statement-text").value;
    const personalBackground = document.getElementById("personal-background").value;
    const academicBackground = document.getElementById("academic-background").value;
    const computers = document.getElementById("computers").value;
    const funnyItem = document.getElementById("funny-item").value;
    const share = document.getElementById("share").value;
    const quote = document.getElementById("quote").value;
    const author = document.getElementById("author").value;

    // Handle courses
    const courses = Array.from(document.querySelectorAll("#courses-container .course")).map((course) => {
      const dept = course.querySelector("[name='department']").value;
      const num = course.querySelector("[name='number']").value;
      const courseName = course.querySelector("[name='course-name']").value;
      const reason = course.querySelector("[name='reason']").value;
      return { dept, num, courseName, reason };
    });

    // Build HTML string
    let htmlOutput = `
    <h2>Introduction HTML</h2>
    <h3>${firstName} ${middleName} ${lastName} ${divider} ${nickname} ★ ${mascotAdj} ${mascotAnimal}</h3>
    <figure>
        <figcaption>${caption}</figcaption>
    </figure>
    <p>${statementText}</p>
    <ul>
        <li><strong>Personal Background:</strong> ${personalBackground}</li>
        <li><strong>Academic Background:</strong> ${academicBackground}</li>
        <li><strong>Primary Computers:</strong> ${computers}</li>
    </ul>
    <h4>Courses</h4>
    <ul>`;

    courses.forEach((c) => {
      htmlOutput += `
    <li><strong>${c.dept} ${c.num} - ${c.courseName}:</strong> ${c.reason}</li>`;
    });

    htmlOutput += `
    </ul>
    <p><strong>Funny/Interesting Item:</strong> ${funnyItem}</p>`;

    if (share.trim()) {
      htmlOutput += `<p><strong>Something to Share:</strong> ${share}</p>`;
    }

    htmlOutput += `
    <blockquote>"${quote}" — ${author}</blockquote>`;

    // Escape and display HTML
    const escaped = escapeHTML(htmlOutput);
    const main = document.querySelector("main");
    main.innerHTML = `
      <h2>Introduction HTML</h2>
      <section>
        <pre><code class="language-html">${escaped}</code></pre>
      </section>
    `;

    // Apply syntax highlighting
    if (window.hljs) {
      hljs.highlightAll();
    }
  });
});