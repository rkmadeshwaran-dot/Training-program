let students = [];

        function addStudent() {
            const nameInput = document.getElementById('StudentName');
            const gradeInput = document.getElementById('grade');
            
            const name = nameInput.value.trim();
            const grade = parseFloat(gradeInput.value);

            if (name === '') {
                alert('Please enter a student name');
                return;
            }

            if (isNaN(grade) || grade < 0 || grade > 100) {
                alert('Please enter a valid grade between 0 and 100');
                return;
            }

            students.push({ name: name, grade: grade });

            nameInput.value = '';
            gradeInput.value = '';
        }

        function displayStudent() {
            const gradesList = document.getElementById('gradesList');
            
            if (students.length === 0) {
                gradesList.innerHTML = '<li style="list-style: none; color: #999;">No students added yet</li>';
                return;
            }

            gradesList.innerHTML = '';
            students.forEach(student => {
                const li = document.createElement('li');
                li.textContent = `${student.name} - ${student.grade}`;
                gradesList.appendChild(li);
            });
        }

        function calculateAverage() {
            const averageDisplay = document.getElementById('averageDisplay');
            
            if (students.length === 0) {
                averageDisplay.textContent = 'No students to calculate average';
                return;
            }

            const total = students.reduce((sum, student) => sum + student.grade, 0);
            const average = (total / students.length).toFixed(2);

            averageDisplay.textContent = `Average Grade: ${average}`;
        }