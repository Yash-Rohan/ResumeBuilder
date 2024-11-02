document.getElementById("generateButton").addEventListener("click", generateResume);

function generateResume(event) {
    event.preventDefault();

    // Collecting Personal Information
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    // Education Information
    const highschoolInstitution = document.getElementById("highschool-institution").value.trim();
    const highschoolYear = document.getElementById("highschool-year").value.trim();
    const highschoolCgpa = document.getElementById("highschool-cgpa").value.trim();

    const universityInstitution = document.getElementById("university-institution").value.trim();
    const universityDegree = document.getElementById("university-degree").value.trim();
    const universityYear = document.getElementById("university-year").value.trim();
    const universityCgpa = document.getElementById("university-cgpa").value.trim();

    // Links
    const github = document.getElementById("github").value.trim();
    const linkedin = document.getElementById("linkedin").value.trim();
    const leetcode = document.getElementById("leetcode").value.trim();
    const gfg = document.getElementById("gfg").value.trim();

    // Work Experience
    const company = document.getElementById("company").value.trim();
    const position = document.getElementById("position").value.trim();
    const expYear = document.getElementById("exp_year").value.trim();

    // Skills and Hobbies
    const skills = document.getElementById("skills").value.trim();
    const hobbies = document.getElementById("hobbies").value.trim();

    // Basic validation
    if (!name || !email || !phone) {
        alert("Please fill in the required fields: Name, Email, Phone.");
        return;
    }

    // Get selected resume format
    const resumeFormat = document.querySelector('input[name="resumeFormat"]:checked').value;

    // Initialize jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Set margins
    const marginLeft = 20;
    let yPosition = 20;

    // Name and Contact Information
    doc.setFont("times", "bold");
    doc.setFontSize(20);
    doc.text(name.toUpperCase(), 105, yPosition, { align: "center" });
    yPosition += 10;
    doc.setFontSize(12);

    // Contact information
    const contactText = `${address} | 📞 ${phone} | ✉️ ${email}`;
    doc.text(contactText, marginLeft, yPosition);
    yPosition += 15;

    // Determine format layout
    if (resumeFormat === "format1") {
        // Education Section for Format 1
        doc.setFontSize(14);
        doc.text("EDUCATION", marginLeft, yPosition);
        doc.line(marginLeft, yPosition + 5, 190, yPosition + 5);
        yPosition += 15;

        doc.setFont("times", "normal");
        doc.setFontSize(12);

        // High School Details
        doc.text("High School:", marginLeft, yPosition);
        yPosition += 10; 
        doc.text(highschoolInstitution, marginLeft + 30, yPosition);
        yPosition += 10; 
        doc.text(`Year of Passing: ${highschoolYear}`, marginLeft + 30, yPosition);
        yPosition += 10; 
        doc.text(`CGPA: ${highschoolCgpa}`, marginLeft + 30, yPosition);
        yPosition += 20; 

        // University Details
        doc.text("University:", marginLeft, yPosition);
        yPosition += 10; 
        doc.text(universityInstitution, marginLeft + 30, yPosition);
        yPosition += 10; 
        doc.text(`Degree: ${universityDegree}`, marginLeft + 30, yPosition);
        yPosition += 10; 
        doc.text(`Year of Graduation: ${universityYear}`, marginLeft + 30, yPosition);
        yPosition += 10; 
        doc.text(`CGPA: ${universityCgpa}`, marginLeft + 30, yPosition);
        yPosition += 20; 

        // Links Section
        doc.setFontSize(14);
        doc.text("LINKS", marginLeft, yPosition);
        doc.line(marginLeft, yPosition + 5, 190, yPosition + 5);
        yPosition += 15;

        doc.setFontSize(12);
        doc.text(`GitHub: ${github}`, marginLeft, yPosition);
        yPosition += 10;
        doc.text(`LinkedIn: ${linkedin}`, marginLeft, yPosition);
        yPosition += 10;
        doc.text(`LeetCode: ${leetcode}`, marginLeft, yPosition);
        yPosition += 10;
        doc.text(`GeeksforGeeks: ${gfg}`, marginLeft, yPosition);
        yPosition += 20;

        // Work Experience Section
        doc.setFontSize(14);
        doc.text("WORK EXPERIENCE", marginLeft, yPosition);
        doc.line(marginLeft, yPosition + 5, 190, yPosition + 5);
        yPosition += 15;

        doc.setFontSize(12);
        doc.text(`Company: ${company}`, marginLeft, yPosition);
        yPosition += 10;
        doc.text(`Position: ${position}`, marginLeft, yPosition);
        yPosition += 10;
        doc.text(`Years of Experience: ${expYear}`, marginLeft, yPosition);
        yPosition += 20;

        // Skills Section
        doc.setFontSize(14);
        doc.text("SKILLS", marginLeft, yPosition);
        doc.line(marginLeft, yPosition + 5, 190, yPosition + 5);
        yPosition += 15;

        doc.setFontSize(12);
        const skillsArray = skills.split(',').map(skill => skill.trim());
        const skillLines = skillsArray.join(' • ');
        const skillsHeight = doc.getTextDimensions(skillLines).h; // Calculate height of skills
        if (yPosition + skillsHeight > 290) { // Check for overflow
            yPosition += 10; // Add spacing before new page
            doc.addPage(); // Create new page if needed
            yPosition = 20; // Reset position
        }
        doc.text(skillLines, marginLeft, yPosition);
        yPosition += 20;

        // Hobbies Section
        doc.setFontSize(14);
        doc.text("HOBBIES", marginLeft, yPosition);
        doc.line(marginLeft, yPosition + 5, 190, yPosition + 5);
        yPosition += 15;

        doc.setFontSize(12);
        const hobbiesArray = hobbies.split(',').map(hobby => hobby.trim());
        const hobbyLines = hobbiesArray.join(' • ');
        const hobbiesHeight = doc.getTextDimensions(hobbyLines).h; // Calculate height of hobbies
        if (yPosition + hobbiesHeight > 290) { // Check for overflow
            yPosition += 10; // Add spacing before new page
            doc.addPage(); // Create new page if needed
            yPosition = 20; // Reset position
        }
        doc.text(hobbyLines, marginLeft, yPosition);
        yPosition += 20;
        
    } else if (resumeFormat === "format2") {
        // Education Section for Format 2
        doc.setFontSize(14);
        doc.text("EDUCATION", marginLeft, yPosition);
        doc.line(marginLeft, yPosition + 5, 190, yPosition + 5);
        yPosition += 15;

        // Reorganize the educational information
        doc.setFont("times", "normal");
        doc.setFontSize(12);

        // Combine High School and University details
        doc.text("High School: " + highschoolInstitution + " | Year: " + highschoolYear + " | CGPA: " + highschoolCgpa, marginLeft, yPosition);
        yPosition += 10; 
        doc.text("University: " + universityInstitution + " | Degree: " + universityDegree + " | Year: " + universityYear + " | CGPA: " + universityCgpa, marginLeft, yPosition);
        yPosition += 20; 

        // Links Section
        doc.setFontSize(14);
        doc.text("LINKS", marginLeft, yPosition);
        doc.line(marginLeft, yPosition + 5, 190, yPosition + 5);
        yPosition += 15;

        doc.setFontSize(12);
        doc.text(`GitHub: ${github}`, marginLeft, yPosition);
        yPosition += 10;
        doc.text(`LinkedIn: ${linkedin}`, marginLeft, yPosition);
        yPosition += 10;
        doc.text(`LeetCode: ${leetcode}`, marginLeft, yPosition);
        yPosition += 10;
        doc.text(`GeeksforGeeks: ${gfg}`, marginLeft, yPosition);
        yPosition += 20;

        // Work Experience Section
        doc.setFontSize(14);
        doc.text("WORK EXPERIENCE", marginLeft, yPosition);
        doc.line(marginLeft, yPosition + 5, 190, yPosition + 5);
        yPosition += 15;

        doc.setFontSize(12);
        doc.text(`Company: ${company}`, marginLeft, yPosition);
        yPosition += 10;
        doc.text(`Position: ${position}`, marginLeft, yPosition);
        yPosition += 10;
        doc.text(`Years of Experience: ${expYear}`, marginLeft, yPosition);
        yPosition += 20;

        // Skills Section
        doc.setFontSize(14);
        doc.text("SKILLS", marginLeft, yPosition);
        doc.line(marginLeft, yPosition + 5, 190, yPosition + 5);
        yPosition += 15;

        doc.setFontSize(12);
        const skillsArray = skills.split(',').map(skill => skill.trim());
        const skillLines = skillsArray.join(' • ');
        doc.text(skillLines, marginLeft, yPosition);
        yPosition += 20;

        // Hobbies Section
        doc.setFontSize(14);
        doc.text("HOBBIES", marginLeft, yPosition);
        doc.line(marginLeft, yPosition + 5, 190, yPosition + 5);
        yPosition += 15;

        doc.setFontSize(12);
        const hobbiesArray = hobbies.split(',').map(hobby => hobby.trim());
        const hobbyLines = hobbiesArray.join(' • ');
        doc.text(hobbyLines, marginLeft, yPosition);
        yPosition += 20;
    }

    // Save the PDF
    doc.save(`${name}_Resume.pdf`);
}
