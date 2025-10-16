
  // Admin credentials (stored in memory - in production, use proper authentication)
       const adminCredentials = {
           username: "admin",
           password: "admin123"
       };

       let isAdminLoggedIn = false;

       // Data Storage
       let courses = [
           {
               id: 1,
               title: "JavaScript Fundamentals",
               description: "Test your knowledge of core JavaScript concepts",
               questions: [
                   {
                       question: "What is the output of typeof null?",
                       options: ["null", "undefined", "object", "number"],
                       correct: 2
                   },
                   {
                       question: "Which method is used to add an element to the end of an array?",
                       options: ["push()", "pop()", "shift()", "unshift()"],
                       correct: 0
                   },
                   {
                       question: "What does 'this' keyword refer to in JavaScript?",
                       options: ["The function itself", "The global object", "The current execution context", "undefined"],
                       correct: 2
                   },
                   {
                       question: "Which of the following is not a primitive data type?",
                       options: ["String", "Number", "Array", "Boolean"],
                       correct: 2
                   },
                   {
                       question: "What is closure in JavaScript?",
                       options: ["A way to end a function", "A function with access to parent scope", "A type of loop", "An error handler"],
                       correct: 1
                   }
               ]
           },
           {
               id: 2,
               title: "HTML & CSS Basics",
               description: "Master the fundamentals of web design",
               questions: [
                   {
                       question: "Which HTML tag is used for the largest heading?",
                       options: ["<h6>", "<h1>", "<head>", "<header>"],
                       correct: 1
                   },
                   {
                       question: "What does CSS stand for?",
                       options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
                       correct: 0
                   },
                   {
                       question: "Which property is used to change the background color?",
                       options: ["color", "bgcolor", "background-color", "background"],
                       correct: 2
                   },
                   {
                       question: "How do you select an element with id 'demo'?",
                       options: [".demo", "#demo", "demo", "*demo"],
                       correct: 1
                   },
                   {
                       question: "Which HTML attribute specifies an alternate text for an image?",
                       options: ["title", "alt", "src", "longdesc"],
                       correct: 1
                   }
               ]
           },
           {
               id: 3,
               title: "Python Programming",
               description: "Challenge yourself with Python questions",
               questions: [
                   {
                       question: "What is the output of print(type([]))?",
                       options: ["<class 'array'>", "<class 'list'>", "<class 'tuple'>", "<class 'dict'>"],
                       correct: 1
                   },
                   {
                       question: "Which keyword is used to create a function in Python?",
                       options: ["function", "def", "func", "define"],
                       correct: 1
                   },
                   {
                       question: "What is the correct way to create a dictionary?",
                       options: ["d = []", "d = ()", "d = {}", "d = <>"],
                       correct: 2
                   },
                   {
                       question: "Which operator is used for exponentiation in Python?",
                       options: ["^", "**", "//", "%%"],
                       correct: 1
                   },
                   {
                       question: "What is the output of '3' + '3' in Python?",
                       options: ["6", "33", "'33'", "Error"],
                       correct: 1
                   }
               ]
           }
       ];

       let currentCourse = null;
       let currentQuestion = 0;
       let userAnswers = [];
       let userName = "";
       let quizStartTime = null;
       let timerInterval = null;
       let leaderboard = {};

       // Admin Login
       function adminLogin() {
           const username = document.getElementById('loginUsername').value.trim();
           const password = document.getElementById('loginPassword').value;
           const errorMsg = document.getElementById('loginError');

           if (username === adminCredentials.username && password === adminCredentials.password) {
               isAdminLoggedIn = true;
               errorMsg.classList.remove('show');
               document.getElementById('loginUsername').value = '';
               document.getElementById('loginPassword').value = '';
               showPage('adminPage');
               showAdminSection('dashboard');
           } else {
               errorMsg.classList.add('show');
           }
       }

       function adminLogout() {
           isAdminLoggedIn = false;
           showPage('courseSelectionPage');
       }

       function showAdminLogin() {
           showPage('loginPage');
       }

       // Initialize app
       function init() {
           loadLeaderboard();
           loadRecentQuizzes();
           renderCourses();
           applyTheme();
       }

       // Theme Management
       function toggleTheme() {
           const current = document.body.getAttribute('data-theme');
           const newTheme = current === 'dark' ? 'light' : 'dark';
           document.body.setAttribute('data-theme', newTheme);
       }

       function applyTheme() {
           const saved = 'light';
           document.body.setAttribute('data-theme', saved);
       }

       // Render Courses
       function renderCourses() {
           const grid = document.getElementById('courseGrid');
           grid.innerHTML = courses.map(course => `
               <div class="course-card">
                   <h3>${course.title}</h3>
                   <p>${course.description}</p>
                   <div class="input-group">
                       <label>Your Name:</label>
                       <input type="text" id="name-${course.id}" placeholder="Enter your name">
                       <div class="error-message" id="error-${course.id}">Please enter your name</div>
                   </div>
                   <button class="btn btn-primary" onclick="startQuiz(${course.id})">Start Quiz</button>
               </div>
           `).join('');

           const adminBtn = document.createElement('div');
           adminBtn.innerHTML = '<button class="btn btn-secondary" onclick="showAdminLogin()"><i class="bxr bx-lock-keyhole-open"></i>  Admin Access</button>';
           adminBtn.style.marginTop = '2rem';
           grid.parentElement.appendChild(adminBtn);
       }

       // Start Quiz
       function startQuiz(courseId) {
           const nameInput = document.getElementById(`name-${courseId}`);
           const errorMsg = document.getElementById(`error-${courseId}`);
           
           if (!nameInput.value.trim()) {
               errorMsg.classList.add('show');
               return;
           }

           userName = nameInput.value.trim();
           currentCourse = courses.find(c => c.id === courseId);
           currentQuestion = 0;
           userAnswers = new Array(currentCourse.questions.length).fill(null);
           
           document.getElementById('quizCourseName').textContent = currentCourse.title;
           document.getElementById('quizUserName').textContent = userName;
           document.getElementById('userDisplay').textContent = userName;
           
           showPage('quizPage');
           startTimer();
           renderQuestion();
       }

       // Timer
       function startTimer() {
           quizStartTime = Date.now();
           timerInterval = setInterval(() => {
               const elapsed = Math.floor((Date.now() - quizStartTime) / 1000);
               const mins = Math.floor(elapsed / 60);
               const secs = elapsed % 60;
               document.getElementById('timer').textContent = 
                   `Time: ${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
           }, 1000);
       }

       function stopTimer() {
           clearInterval(timerInterval);
       }

       // Render Question
       function renderQuestion() {
           const q = currentCourse.questions[currentQuestion];
           document.getElementById('questionText').textContent = 
               `Question ${currentQuestion + 1} of ${currentCourse.questions.length}: ${q.question}`;
           
           const optionsHTML = q.options.map((opt, idx) => `
               <label class="answer-option ${userAnswers[currentQuestion] === idx ? 'selected' : ''}">
                   <input type="radio" name="answer" value="${idx}" 
                       ${userAnswers[currentQuestion] === idx ? 'checked' : ''}
                       onchange="selectAnswer(${idx})">
                   ${opt}
               </label>
           `).join('');
           
           document.getElementById('answerOptions').innerHTML = optionsHTML;
           
           const progress = ((currentQuestion + 1) / currentCourse.questions.length) * 100;
           document.getElementById('progressFill').style.width = progress + '%';
           
           document.getElementById('backBtn').disabled = currentQuestion === 0;
           document.getElementById('nextBtn').textContent = 
               currentQuestion === currentCourse.questions.length - 1 ? 'Finish' : 'Next →';
       }

       function selectAnswer(idx) {
           userAnswers[currentQuestion] = idx;
           renderQuestion();
       }

       function previousQuestion() {
           if (currentQuestion > 0) {
               currentQuestion--;
               renderQuestion();
           }
       }

       function nextQuestion() {
           if (currentQuestion < currentCourse.questions.length - 1) {
               currentQuestion++;
               renderQuestion();
           } else {
               finishQuiz();
           }
       }

       // Finish Quiz
       function finishQuiz() {
           stopTimer();
           
           let correct = 0;
           currentCourse.questions.forEach((q, idx) => {
               if (userAnswers[idx] === q.correct) correct++;
           });
           
           const percentage = Math.round((correct / currentCourse.questions.length) * 100);
           
           if (!leaderboard[currentCourse.id]) {
               leaderboard[currentCourse.id] = [];
           }
           leaderboard[currentCourse.id].push({
               name: userName,
               score: percentage,
               date: new Date().toLocaleDateString()
           });
           leaderboard[currentCourse.id].sort((a, b) => b.score - a.score);
           saveLeaderboard();
           
           saveRecentQuiz();
           
           document.getElementById('finalScore').textContent = percentage + '%';
           document.getElementById('scoreText').textContent = 
               `You got ${correct} out of ${currentCourse.questions.length} questions correct!`;
           
           const reviewHTML = currentCourse.questions.map((q, idx) => {
               const isCorrect = userAnswers[idx] === q.correct;
               return `
                   <div class="review-item ${isCorrect ? 'correct' : 'incorrect'}">
                       <strong>Q${idx + 1}: ${q.question}</strong><br>
                       Your answer: ${userAnswers[idx] !== null ? q.options[userAnswers[idx]] : 'Not answered'}<br>
                       ${!isCorrect ? `Correct answer: ${q.options[q.correct]}<br>` : ''}
                       ${isCorrect ? ' Correct Answer ' : ' Wrong Answer'}
                   </div>
               `;
           }).join('');
           document.getElementById('questionReview').innerHTML = reviewHTML;
           
           displayLeaderboard();
           
           showPage('resultsPage');
       }

       // Leaderboard
       function displayLeaderboard() {
           const data = leaderboard[currentCourse.id] || [];
           const tbody = document.getElementById('leaderboardBody');
           tbody.innerHTML = data.slice(0, 10).map((entry, idx) => `
               <tr ${entry.name === userName ? 'class="highlight"' : ''}>
                   <td>${idx + 1}</td>
                   <td>${entry.name}</td>
                   <td>${entry.score}%</td>
                   <td>${entry.date}</td>
               </tr>
           `).join('');
       }

       function saveLeaderboard() {
           // Store in memory only
           window.leaderboardData = leaderboard;
       }

       function loadLeaderboard() {
           if (window.leaderboardData) {
               leaderboard = window.leaderboardData;
           }
       }

       // Recent Quizzes
       function saveRecentQuiz() {
           let recent = window.recentQuizzesData || [];
           recent.unshift({
               courseId: currentCourse.id,
               courseName: currentCourse.title,
               userName: userName,
               date: new Date().toLocaleString()
           });
           recent = recent.slice(0, 5);
           window.recentQuizzesData = recent;
       }

       function loadRecentQuizzes() {
           const recent = window.recentQuizzesData || [];
           if (recent.length > 0) {
               document.getElementById('recentQuizzesSection').style.display = 'block';
               document.getElementById('recentQuizzesList').innerHTML = recent.map(quiz => `
                   <div class="recent-quiz-card">
                       <div>
                           <strong>${quiz.courseName}</strong><br>
                           <small>Last taken by ${quiz.userName} on ${quiz.date}</small>
                       </div>
                       <button class="btn btn-primary" onclick="quickStartQuiz(${quiz.courseId}, '${quiz.userName}')">
                           Quick Start
                       </button>
                   </div>
               `).join('');
           }
       }

       function quickStartQuiz(courseId, name) {
           userName = name;
           currentCourse = courses.find(c => c.id === courseId);
           currentQuestion = 0;
           userAnswers = new Array(currentCourse.questions.length).fill(null);
           
           document.getElementById('quizCourseName').textContent = currentCourse.title;
           document.getElementById('quizUserName').textContent = userName;
           document.getElementById('userDisplay').textContent = userName;
           
           showPage('quizPage');
           startTimer();
           renderQuestion();
       }

       // Navigation
       function showPage(pageId) {
           document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
           document.getElementById(pageId).classList.add('active');
       }

       function retakeQuiz() {
           currentQuestion = 0;
           userAnswers = new Array(currentCourse.questions.length).fill(null);
           showPage('quizPage');
           startTimer();
           renderQuestion();
       }

       function chooseAnotherCourse() {
           userName = "";
           currentCourse = null;
           document.getElementById('userDisplay').textContent = "";
           loadRecentQuizzes();
           showPage('courseSelectionPage');
       }

       // Admin Functions
       function showAdminSection(section) {
           document.querySelectorAll('.admin-section').forEach(s => s.style.display = 'none');
           
           if (section === 'dashboard') {
               document.getElementById('adminDashboard').style.display = 'block';
               renderAdminStats();
           } else if (section === 'leaderboard') {
               document.getElementById('adminLeaderboard').style.display = 'block';
               populateAdminCourseSelect();
           } else if (section === 'questions') {
               document.getElementById('adminQuestions').style.display = 'block';
               populateEditCourseSelect();
           }
       }

       function renderAdminStats() {
           const statsHTML = courses.map(course => {
               const scores = leaderboard[course.id] || [];
               const avgScore = scores.length > 0 
                   ? Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length)
                   : 0;
               
               return `
                   <div class="course-card">
                       <h3>${course.title}</h3>
                       <p><strong>Total Attempts:</strong> ${scores.length}</p>
                       <p><strong>Average Score:</strong> ${avgScore}%</p>
                       <p><strong>Questions:</strong> ${course.questions.length}</p>
                   </div>
               `;
           }).join('');
           
           document.getElementById('adminStatsGrid').innerHTML = statsHTML;
       }

       function populateAdminCourseSelect() {
           const select = document.getElementById('adminCourseSelect');
           select.innerHTML = courses.map(c => 
               `<option value="${c.id}">${c.title}</option>`
           ).join('');
           loadLeaderboardData();
       }

       function loadLeaderboardData() {
           const courseId = parseInt(document.getElementById('adminCourseSelect').value);
           const data = leaderboard[courseId] || [];
           
           const tableHTML = `
               <table class="leaderboard">
                   <thead>
                       <tr>
                           <th>Rank</th>
                           <th>Name</th>
                           <th>Score</th>
                           <th>Date</th>
                           <th>Actions</th>
                       </tr>
                   </thead>
                   <tbody>
                       ${data.map((entry, idx) => `
                           <tr>
                               <td>${idx + 1}</td>
                               <td>${entry.name}</td>
                               <td>${entry.score}%</td>
                               <td>${entry.date}</td>
                               <td>
                                   <button class="btn btn-danger" style="padding: 0.25rem 0.75rem;" 
                                       onclick="deleteLeaderboardEntry(${courseId}, ${idx})">Delete</button>
                               </td>
                           </tr>
                       `).join('')}
                   </tbody>
               </table>
           `;
           
           document.getElementById('adminLeaderboardTable').innerHTML = tableHTML;
       }

       function deleteLeaderboardEntry(courseId, index) {
           if (confirm('Are you sure you want to delete this entry?')) {
               leaderboard[courseId].splice(index, 1);
               saveLeaderboard();
               loadLeaderboardData();
           }
       }

       function addManualScore() {
           const courseId = parseInt(document.getElementById('adminCourseSelect').value);
           const name = document.getElementById('manualUserName').value.trim();
           const score = parseInt(document.getElementById('manualScore').value);
           
           if (!name || isNaN(score) || score < 0 || score > 100) {
               alert('Please enter a valid name and score (0-100)');
               return;
           }
           
           if (!leaderboard[courseId]) {
               leaderboard[courseId] = [];
           }
           
           leaderboard[courseId].push({
               name: name,
               score: score,
               date: new Date().toLocaleDateString()
           });
           
           leaderboard[courseId].sort((a, b) => b.score - a.score);
           saveLeaderboard();
           
           document.getElementById('manualUserName').value = '';
           document.getElementById('manualScore').value = '';
           loadLeaderboardData();
       }

       function populateEditCourseSelect() {
           const select = document.getElementById('editCourseSelect');
           select.innerHTML = courses.map(c => 
               `<option value="${c.id}">${c.title}</option>`
           ).join('');
           loadCourseQuestions();
       }

       function loadCourseQuestions() {
           const courseId = parseInt(document.getElementById('editCourseSelect').value);
           const course = courses.find(c => c.id === courseId);
           
           const questionsHTML = course.questions.map((q, idx) => `
               <div class="admin-card" style="margin-bottom: 1rem;">
                   <strong>Q${idx + 1}: ${q.question}</strong>
                   <ul style="margin: 0.5rem 0;">
                       ${q.options.map((opt, i) => `
                           <li ${i === q.correct ? 'style="color: var(--success-color); font-weight: bold;"' : ''}>
                               ${opt} ${i === q.correct ? ' (Correct)' : ''}
                           </li>
                       `).join('')}
                   </ul>
                   <button class="btn btn-danger" style="padding: 0.5rem 1rem;" 
                       onclick="deleteQuestion(${courseId}, ${idx})">Delete Question</button>
               </div>
           `).join('');
           
           document.getElementById('questionsList').innerHTML = 
               `<h3>Existing Questions</h3>${questionsHTML}`;
       }

       function deleteQuestion(courseId, questionIdx) {
           if (confirm('Are you sure you want to delete this question?')) {
               const course = courses.find(c => c.id === courseId);
               course.questions.splice(questionIdx, 1);
               loadCourseQuestions();
           }
       }

       function addNewQuestion() {
           const courseId = parseInt(document.getElementById('editCourseSelect').value);
           const course = courses.find(c => c.id === courseId);
           
           const questionText = document.getElementById('newQuestionText').value.trim();
           const opt1 = document.getElementById('newOption1').value.trim();
           const opt2 = document.getElementById('newOption2').value.trim();
           const opt3 = document.getElementById('newOption3').value.trim();
           const opt4 = document.getElementById('newOption4').value.trim();
           const correct = parseInt(document.getElementById('newCorrectAnswer').value);
           
           if (!questionText || !opt1 || !opt2 || !opt3 || !opt4) {
               alert('Please fill in all fields');
               return;
           }
           
           course.questions.push({
               question: questionText,
               options: [opt1, opt2, opt3, opt4],
               correct: correct
           });
           
           document.getElementById('newQuestionText').value = '';
           document.getElementById('newOption1').value = '';
           document.getElementById('newOption2').value = '';
           document.getElementById('newOption3').value = '';
           document.getElementById('newOption4').value = '';
           document.getElementById('newCorrectAnswer').value = '0';
           
           loadCourseQuestions();
           alert('Question added successfully!');
       }

       // Handle Enter key on login page
       document.addEventListener('DOMContentLoaded', function() {
           const loginPassword = document.getElementById('loginPassword');
           if (loginPassword) {
               loginPassword.addEventListener('keypress', function(e) {
                   if (e.key === 'Enter') {
                       adminLogin();
                   }
               });
           }
       });

       // Initialize on load
       window.onload = function() {
           init();
       };