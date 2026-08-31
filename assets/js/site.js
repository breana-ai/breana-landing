(() => {
  "use strict";

  const scenarios = {
    match: {
      eventTime: "2:41 PM",
      eventKicker: "Just listed · MLS",
      eventTitle: "80 Verndale St #80, Brookline · $3,295,000",
      eventDetail: "4 bd · 5 ba · new construction · heated garage",
      notices: [
        "Matching to buyer search criteria and notes.",
        "Sarah wants new construction and asks about a heated garage at every showing."
      ],
      draftTime: "2:42 PM",
      draftKicker: "Text to Sarah · drafted in your voice",
      draft: "Hey Sarah - this just hit the market. New construction, and it has the heated garage. Are you available to see it tonight? [link]",
      briefTime: "2:43 PM",
      briefTitle: "New listing, right for Sarah",
      brief: "80 Verndale St just hit the market. New construction with the heated garage she's been asking for. I drafted a text in your voice.",
      property: true,
      decisions: ["Send to Sarah", "Edit", "Dismiss"],
      outcomeTime: "2:44 PM",
      outcomes: ["Text sent to Sarah", "Sarah's card updated with the property and preferences", "Watching for tonight's reply"]
    },
    listing: {
      eventTime: "2:04 AM",
      eventKicker: "Expired · MLS",
      eventTitle: "89 Winter Hill Rd, Somerville · $1,150,000",
      eventDetail: "94 days on market · no offers · your territory",
      notices: [
        "Expired overnight, four blocks from your last two sales.",
        "Likely pricing and launch issues identified from the listing history."
      ],
      draftTime: "2:37 AM",
      draftKicker: "LinkedIn message to Mark · drafted in your voice",
      draft: "Hi Mark - I noticed 89 Winter Hill recently came off the market. Having sold two similar homes nearby, I believe a different pricing and launch strategy could produce a better result.",
      briefTime: "6:45 AM",
      briefTitle: "New listing opportunity",
      brief: "89 Winter Hill expired overnight. I found the sellers, drafted outreach, and sketched a relist plan. Pursue it?",
      property: false,
      decisions: ["Pursue the listing", "Review draft", "Dismiss"],
      outcomeTime: "7:02 AM",
      outcomes: ["Outreach sent to Mark", "Pre-listing package prepared", "CMA run and reply watch started"]
    },
    openhouse: {
      eventTime: "2:12 PM",
      eventKicker: "Open house ended · 9 Highland Ave",
      eventTitle: "14 sign-ins from today's open house",
      eventDetail: "Sunday · doors just closed · sign-in sheet synced",
      notices: [
        "Two visitors are unrepresented buyers.",
        "Both asked about financing, making a lender introduction the natural next step."
      ],
      draftTime: "2:24 PM",
      draftKicker: "Two follow-ups · drafted in your voice",
      draft: "It was great meeting you at 9 Highland Ave. You asked about financing, and I'd be happy to connect you with an excellent local lender who can prepare accurate payment scenarios.",
      briefTime: "2:31 PM",
      briefTitle: "Sunday follow-up, ready",
      brief: "Two unrepresented buyers asked about financing. Their follow-ups and the seller note are drafted. Send now while it's warm?",
      property: false,
      decisions: ["Review and send", "Edit drafts", "Tomorrow"],
      outcomeTime: "2:33 PM",
      outcomes: ["Buyer follow-ups sent", "Seller feedback delivered", "New buyer cards created and replies monitored"]
    },
    anniversary: {
      eventTime: "9:00 AM",
      eventKicker: "Anniversary · 42 Pearl St",
      eventTitle: "Three years today since the Raymonds closed",
      eventDetail: "Your buyers · first home · relationship moment",
      notices: [
        "Their neighborhood is up 19% since they closed.",
        "Their notes mention wanting a bigger yard someday."
      ],
      draftTime: "9:02 AM",
      draftKicker: "Note to the Raymonds · drafted in your voice",
      draft: "Happy three years at Pearl St! The neighborhood is up about 19% since you closed. If the bigger-yard dream ever gets serious, I'll have a plan ready.",
      briefTime: "9:05 AM",
      briefTitle: "A relationship moment",
      brief: "Three years today on Pearl St. I drafted a warm note with what their place is worth now. Send it?",
      property: false,
      decisions: ["Send the note", "Make it a call", "Skip"],
      outcomeTime: "9:06 AM",
      outcomes: ["Note sent with the value estimate", "Anniversary and current value recorded", "Watching for a reply about that yard"]
    }
  };

  const ids = ["event-time", "event-kicker", "event-title", "event-detail", "draft-time", "draft-kicker", "draft-copy", "brief-time", "brief-card-time", "brief-title", "brief-copy", "property-mini", "decision-row", "outcome-time", "outcome-list", "notice-copy"];
  const elements = Object.fromEntries(ids.map((id) => [id, document.getElementById(id)]));

  function renderScenario(key) {
    const data = scenarios[key];
    if (!data) return;
    elements["event-time"].textContent = data.eventTime;
    elements["event-kicker"].textContent = data.eventKicker;
    elements["event-title"].textContent = data.eventTitle;
    elements["event-detail"].textContent = data.eventDetail;
    elements["notice-copy"].replaceChildren(...data.notices.map((text) => Object.assign(document.createElement("p"), { textContent: text })));
    elements["draft-time"].textContent = data.draftTime;
    elements["draft-kicker"].textContent = data.draftKicker;
    elements["draft-copy"].textContent = data.draft;
    elements["brief-time"].textContent = data.briefTime;
    elements["brief-card-time"].textContent = data.briefTime;
    elements["brief-title"].textContent = data.briefTitle;
    elements["brief-copy"].textContent = data.brief;
    elements["property-mini"].hidden = !data.property;
    elements["decision-row"].replaceChildren(...data.decisions.map((text, index) => {
      const chip = document.createElement("span");
      chip.textContent = text;
      if (index === 0) chip.className = "decision-primary";
      return chip;
    }));
    elements["outcome-time"].textContent = data.outcomeTime;
    elements["outcome-list"].replaceChildren(...data.outcomes.map((text) => Object.assign(document.createElement("li"), { textContent: text })));
  }

  document.querySelectorAll("[data-scenario]").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll("[data-scenario]").forEach((item) => item.setAttribute("aria-selected", String(item === tab)));
      renderScenario(tab.dataset.scenario);
    });
    tab.addEventListener("keydown", (event) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      const tabs = [...document.querySelectorAll("[data-scenario]")];
      const current = tabs.indexOf(tab);
      const next = event.key === 'ArrowRight' ? (current + 1) % tabs.length : (current - 1 + tabs.length) % tabs.length;
      tabs[next].focus();
      tabs[next].click();
      event.preventDefault();
    });
  });

  const otherToggle = document.getElementById("other-task-toggle");
  const otherField = document.getElementById("other-field");
  const otherInput = document.getElementById("other-task");
  otherToggle.addEventListener("change", () => {
    otherField.hidden = !otherToggle.checked;
    if (otherToggle.checked) otherInput.focus();
    else otherInput.value = "";
  });

  const form = document.getElementById("waitlist-form");
  const status = document.getElementById("form-status");
  const submit = form.querySelector("button[type=submit]");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      status.textContent = "Please complete your name and a valid email address.";
      return;
    }

    submit.disabled = true;
    submit.textContent = "Joining…";
    status.textContent = "";
    try {
      const params = new URLSearchParams(new FormData(form));
      await fetch("https://docs.google.com/forms/d/e/1FAIpQLScCS80fxKWE8kc5O88oXpoMyIuJ_wtE6MvghtcVNpuqZKLCtA/formResponse", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString()
      });
      form.reset();
      otherField.hidden = true;
      status.textContent = "You're on the list. We'll be in touch about early access.";
      submit.textContent = "You're on the list";
    } catch (_) {
      status.textContent = "We couldn't submit that just now. Please email hello@breana.ai.";
      submit.disabled = false;
      submit.textContent = "Join the waitlist";
    }
  });
  const mq = matchMedia("(max-width: 680px)");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const panel = document.getElementById("scenario-panel");
  if (panel) {
    const stages = [...panel.querySelectorAll(".workflow-stage")];
    const dots = document.createElement("div");
    dots.className = "stage-dots";
    dots.setAttribute("role", "group");
    dots.setAttribute("aria-label", "Workflow steps");
    stages.forEach((stage, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-controls", "scenario-panel");
      const label = stage.querySelector(".stage-label span")?.textContent || `Step ${i + 1}`;
      dot.setAttribute("aria-label", `Show step ${i + 1}: ${label}`);
      dot.addEventListener("click", () => go(i));
      dots.append(dot);
    });
    panel.after(dots);
    let idx = 0;
    const step = () => panel.clientWidth + 24;
    const setDots = (i) => {
      [...dots.children].forEach((dot, j) => {
        dot.classList.toggle("on", j === i);
        if (j === i) dot.setAttribute("aria-current", "step");
        else dot.removeAttribute("aria-current");
      });
    };
    function go(i) {
      idx = i;
      panel.scrollTo({ left: i * step(), behavior: reduceMotion.matches ? "auto" : "smooth" });
      setDots(i);
    }
    panel.addEventListener("scroll", () => {
      if (!mq.matches) return;
      const i = Math.min(stages.length - 1, Math.max(0, Math.round(panel.scrollLeft / step())));
      if (i !== idx) { idx = i; setDots(i); }
    }, { passive: true });
    const apply = () => {
      if (mq.matches) go(0);
      else panel.scrollTo({ left: 0 });
    };
    mq.addEventListener("change", apply);
    apply();
    document.querySelectorAll("[data-scenario]").forEach((tab) => tab.addEventListener("click", () => { if (mq.matches) go(0); }));
  }

  const ctaBar = document.querySelector(".mobile-cta-bar");
  if (ctaBar && "IntersectionObserver" in window) {
    const hero = document.querySelector(".hero");
    const waitlist = document.getElementById("waitlist");
    let pastHero = false, atWaitlist = false;
    const update = () => ctaBar.classList.toggle("visible", pastHero && !atWaitlist);
    new IntersectionObserver((entries) => { pastHero = !entries[0].isIntersecting; update(); }, { rootMargin: "-72px 0px 0px 0px" }).observe(hero);
    new IntersectionObserver((entries) => { atWaitlist = entries[0].isIntersecting; update(); }, { threshold: 0.12 }).observe(waitlist);
  }
})();
