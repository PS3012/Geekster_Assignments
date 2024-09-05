const commands = [
  "What is meditation?",
  "How do I start meditating?",
  "What are the benefits of meditation?",
  "How long should I meditate?",
  "When is the best time to meditate?",
  "Can I meditate anywhere?",
  "Do I need to use any special equipment for meditation?",
  "What if my mind wanders during meditation?",
  "How can I overcome challenges in meditation?",
  "What are some different types of meditation?",
  "How can meditation help with stress and anxiety?",
  "Can meditation improve my sleep?",
  "How can meditation help me focus and concentrate?",
  "Can meditation help with pain management?",
  "How can meditation improve my relationships?",
  "What is mindfulness meditation?",
  "What is guided meditation?",
  "What is transcendental meditation?",
  "What is loving-kindness meditation?",
  "What is Vipassana meditation?",
  "How can I find a meditation teacher or group?",
  "Are there any meditation apps or resources I can use?",
  "How can I stay motivated to meditate regularly?",
  "What is the difference between meditation and mindfulness?",
  "Can children meditate?",
  "Can pregnant women meditate?",
  "Can people with disabilities meditate?",
  "Is meditation a religious practice?",
  "What is the history of meditation?",
  "Can meditation help me improve my self-esteem?",
];

const commandsListBox = document.querySelector(".commands-list .list");
const chatBox = document.querySelector(".chatbox");

commandsListBox.innerHTML = commands
  .map(
    (cmd) => `
          <div>
              <i class="fa-solid fa-record-vinyl"></i>
              <span>${cmd}</span>
          </div>
            `
  )
  .join(" ");

const addResponseToChatBox = (prompt, response) => {
  let html = `
     <div class="message user-message">
       <div class="icon"><i class="fa-solid fa-user-tie"></i></div>
       <div class="text fw-600">
         ${prompt}
       </div>
     </div>
     <div class="message ai-message">
       <div class="icon"><i class="fa-solid fa-robot"></i></div>
       <div class="text">
       ${response.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>")}
       </div>
     </div>
  `;
  chatBox.innerHTML += html;
  document.querySelector("input[name='prompt']").value = "";
};
