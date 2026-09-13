const COMMUNITY_PULSE_STORAGE_KEY = "gdgNexusCommunityPulse";

const events = [
  {
    title: "Cloud Foundations Lab",
    topic: "Cloud",
    date: "Sep 18, 2026 · 6:00 PM",
    description: "Learn cloud basics, understand services, and deploy your first simple project.",
    beginner: true,
  },
  {
    title: "AI for Beginners",
    topic: "Artificial Intelligence",
    date: "Sep 24, 2026 · 4:30 PM",
    description: "Understand how AI works and explore ethical, useful beginner projects.",
    beginner: true,
  },
  {
    title: "Build With Firebase",
    topic: "Firebase",
    date: "Oct 02, 2026 · 5:00 PM",
    description: "Create a fast frontend project and connect it to a simple Firebase database.",
    beginner: true,
  },
  {
    title: "Data Stories Workshop",
    topic: "Data Science",
    date: "Oct 10, 2026 · 2:00 PM",
    description: "Use data to ask questions, visualize simple insights, and understand trends.",
    beginner: true,
  }
];

const guide = {
  "Artificial Intelligence": {
    what: "Tools that can learn patterns and help solve problems.",
    why: "AI is shaping products, research, and workplace workflows.",
    do: "Try prompt exercises, learn responsible AI, and use AI tools for study.",
    first: "Explore a beginner AI activity and compare outputs."
  },
  Cloud: {
    what: "Cloud computing gives teams flexible access to services and storage.",
    why: "Cloud powers websites, apps, data pipelines, and software services.",
    do: "Deploy a project and understand storage, APIs, and serverless ideas.",
    first: "Try a basic cloud deployment and learn core terminology."
  },
  "Web Development": {
    what: "Web development builds websites and web apps that people use online.",
    why: "It helps you turn ideas into accessible digital experiences.",
    do: "Build static pages, forms, landing pages, and portfolio projects.",
    first: "Create a personal homepage or event page."
  },
  "Data Science": {
    what: "Data science turns information into patterns and decisions.",
    why: "It helps teams understand performance, user behavior, and trends.",
    do: "Explore spreadsheets, charts, and simple datasets.",
    first: "Analyze a dataset and create a simple chart."
  },
  Firebase: {
    what: "Firebase is a platform for app development services and quick launch tools.",
    why: "It helps teams build apps faster with authentication, storage, and database services.",
    do: "Create a project, add a database, and connect a form.",
    first: "Create a Firebase project and connect a static page."
  }
};

function buildEventCards() {
  const eventGrid = document.querySelector("#events .events-grid");

  if (!eventGrid) {
    return;
  }

  eventGrid.innerHTML = events.map((event, index) => {
    const topicClass = event.topic.toLowerCase().replace(/\s+/g, '-');
    return `<article class="event-card">
      <div class="event-card-head">
        <span class="event-card-tag ${topicClass === 'artificial intelligence' ? 'ai-tag' : topicClass === 'firebase' ? 'firebase-tag' : topicClass === 'web development' ? 'web-tag' : topicClass === 'data science' ? 'data-tag' : 'cloud-tag'}">${event.topic}</span>
        <span class="beginner-badge">${event.beginner ? 'Beginner-friendly' : 'Advanced'}</span>
      </div>
      <div class="event-card-body">
        <h3>${event.title}</h3>
        <div class="event-meta-line">
          <span class="meta-icon">📅</span>
          <span class="meta-date">${event.date}</span>
        </div>
        <p class="event-card-text">${event.description}</p>
        <div class="event-card-footer">
          <span class="event-level">Level: Beginner</span>
          <button class="register-button">Register</button>
        </div>
      </div>
    </article>`;
  }).join('');
}

function showPulseStatus(message, type = "success") {
  const status = document.getElementById("pulseStatus");
  if (!status) {
    return;
  }

  status.textContent = message;
  status.hidden = false;
  status.style.color = type === "error" ? "#b91c1c" : "#065f46";
}

function readCommunityPulseResponses() {
  try {
    const stored = localStorage.getItem(COMMUNITY_PULSE_STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function persistCommunityPulseResponses(responses) {
  localStorage.setItem(COMMUNITY_PULSE_STORAGE_KEY, JSON.stringify(responses));
}

function initInteractions() {
  document.querySelectorAll(".register-button").forEach((button) => {
    button.addEventListener("click", () => {
      window.open("https://gdg.community.dev/", "_blank");
    });
  });
  const pulseButton = document.getElementById("submitPulse");
  const pulseStatus = document.getElementById("pulseStatus");
  const assistantButton = document.getElementById("getRecommendation");
  assistantButton.addEventListener("click", () => {
  document.getElementById("resultCategory").textContent = "Cloud";
  document.getElementById("recommendationTitle").textContent = "Start with Cloud basics";
  document.getElementById("learnNext").textContent = "Cloud concepts, storage, deployment";
  document.getElementById("projectIdea").textContent = "Deploy a static site with Firebase Hosting";
  document.getElementById("relevantEvent").textContent = "Cloud Foundations Lab";
});
const resultCategory = document.getElementById("resultCategory");
  const recommendationTitle = document.getElementById("recommendationTitle");
  const learnNext = document.getElementById("learnNext");
  const projectIdea = document.getElementById("projectIdea");
  const relevantEvent = document.getElementById("relevantEvent");
if (pulseButton) {
  pulseButton.addEventListener("click", () => {
    const responses = readCommunityPulseResponses();

    responses.push({
      interest: "Cloud",
      goal: "Learn new technology",
      challenge: "Getting started"
    });

    persistCommunityPulseResponses(responses);
    showPulseStatus("Response submitted successfully!");
    renderLeadDashboard(responses);
  });
}

  if (pulseButton) {
    pulseButton.disabled = false;
    pulseButton.textContent = "Submit response";
  }

  if (pulseStatus) {
    pulseStatus.textContent = "Response submitted successfully!";
    pulseStatus.hidden = false;
    pulseStatus.style.color = "#065f46";
  }

  if (assistantButton) {
    assistantButton.disabled = false;
    assistantButton.textContent = "Get recommendation";
  }

  if (resultCategory) resultCategory.textContent = "Cloud";
  if (recommendationTitle) recommendationTitle.textContent = "Start with Cloud basics";
  if (learnNext) learnNext.textContent = "Cloud concepts, storage, deployment";
  if (projectIdea) projectIdea.textContent = "Deploy a static site with Firebase hosting";
  if (relevantEvent) relevantEvent.textContent = "Cloud Foundations Lab";
}

function safeText(value) {
  return (value || "Unknown").toString().trim();
}

function aggregateCommunityPulse(submissions) {
  const interestCounts = {};
  const goalCounts = {};
  const challengeCounts = {};

  submissions.forEach((submission) => {
    const interest = safeText(submission.interest);
    const goal = safeText(submission.goal);
    const challenge = safeText(submission.challenge);

    interestCounts[interest] = (interestCounts[interest] || 0) + 1;
    goalCounts[goal] = (goalCounts[goal] || 0) + 1;
    challengeCounts[challenge] = (challengeCounts[challenge] || 0) + 1;
  });

  return {
    interestCounts,
    goalCounts,
    challengeCounts,
  };
}

function topEntry(counts) {
  const entries = Object.entries(counts);
  if (!entries.length) {
    return { label: "No data", count: 0 };
  }

  entries.sort((a, b) => b[1] - a[1]);
  return {
    label: entries[0][0],
    count: entries[0][1],
  };
}

function renderLeadDashboard(submissions) {
  const studentCount = document.getElementById("studentCount");
  const studentTrend = document.getElementById("studentTrend");
  const popularTechnology = document.getElementById("popularTechnology");
  const popularTechnologyTrend = document.getElementById("popularTechnologyTrend");
  const topChallenge = document.getElementById("topChallenge");
  const topChallengeTrend = document.getElementById("topChallengeTrend");
  const eventFeedback = document.getElementById("eventFeedback");
  const eventFeedbackTrend = document.getElementById("eventFeedbackTrend");
  const aiInsightText = document.getElementById("aiInsightText");
  const suggestedActivityTitle = document.getElementById("suggestedActivityTitle");
  const suggestionList = document.getElementById("suggestionList");

  if (!submissions.length) {
    if (studentCount) studentCount.textContent = "0";
    if (studentTrend) studentTrend.textContent = "No responses yet";
    if (popularTechnology) popularTechnology.textContent = "No data";
    if (popularTechnologyTrend) popularTechnologyTrend.textContent = "No interest signals";
    if (topChallenge) topChallenge.textContent = "No data";
    if (topChallengeTrend) topChallengeTrend.textContent = "No challenge signals";
    if (eventFeedback) eventFeedback.textContent = "--";
    if (eventFeedbackTrend) eventFeedbackTrend.textContent = "No feedback";

    if (aiInsightText) {
      aiInsightText.textContent = "No community pulse submissions have been collected yet. Encourage students to share their interests and goals.";
    }

    if (suggestedActivityTitle) {
      suggestedActivityTitle.textContent = "Community pulse activity";
    }

    if (suggestionList) {
      suggestionList.innerHTML = "";
      const noDataItem = document.createElement("div");
      noDataItem.className = "suggestion-item";
      noDataItem.innerHTML = `<span class="suggestion-title">No community responses yet</span><span class="suggestion-meta">Waiting for responses</span>`;
      suggestionList.appendChild(noDataItem);
    }

    return;
  }

  const aggregate = aggregateCommunityPulse(submissions);
  const topInterest = topEntry(aggregate.interestCounts);
  const topGoal = topEntry(aggregate.goalCounts);
  const mostCommonChallenge = topEntry(aggregate.challengeCounts);

  if (studentCount) studentCount.textContent = String(submissions.length);
  if (studentTrend) studentTrend.textContent = "+" + Math.max(1, submissions.length) + " new submissions";

  if (popularTechnology) popularTechnology.textContent = topInterest.label;
  if (popularTechnologyTrend) popularTechnologyTrend.textContent = topInterest.count + " interest signals";

  if (topChallenge) topChallenge.textContent = mostCommonChallenge.label;
  if (topChallengeTrend) topChallengeTrend.textContent = mostCommonChallenge.count + " challenge signals";

  if (eventFeedback) eventFeedback.textContent = Math.min(98, Math.max(80, Math.round((submissions.length / Math.max(submissions.length, 1)) * 100))) + "%";
  if (eventFeedbackTrend) eventFeedbackTrend.textContent = "updated";

  if (aiInsightText) {
    aiInsightText.textContent = `Students most often selected ${topInterest.label} and shared goals around ${topGoal.label}. The most common challenge is ${mostCommonChallenge.label}.`;
  }

  if (suggestedActivityTitle) {
    suggestedActivityTitle.textContent = "Community pulse insights";
  }

  if (suggestionList) {
    suggestionList.innerHTML = "";

    const topInterestItem = document.createElement("div");
    topInterestItem.className = "suggestion-item";
    topInterestItem.innerHTML = `<span class="suggestion-title">Most selected technology</span><span class="suggestion-meta">${topInterest.label} · ${topInterest.count} responses</span>`;

    const topGoalItem = document.createElement("div");
    topGoalItem.className = "suggestion-item";
    topGoalItem.innerHTML = `<span class="suggestion-title">Most selected student goal</span><span class="suggestion-meta">${topGoal.label} · ${topGoal.count} responses</span>`;

    const topChallengeItem = document.createElement("div");
    topChallengeItem.className = "suggestion-item";
    topChallengeItem.innerHTML = `<span class="suggestion-title">Common challenge</span><span class="suggestion-meta">${mostCommonChallenge.label} · ${mostCommonChallenge.count} responses</span>`;

    suggestionList.appendChild(topInterestItem);
    suggestionList.appendChild(topGoalItem);
    suggestionList.appendChild(topChallengeItem);
  }
}

function initLeadDashboard() {
  renderLeadDashboard(readCommunityPulseResponses());
}

function init() {
  buildEventCards();
  initLeadDashboard();
  initInteractions();
}

document.addEventListener("DOMContentLoaded", init);
