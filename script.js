const familyMembers = [
  {
    name: "Nagyapa",
    role: "nagyszülő",
    relation: "Apa apja",
    description: "A család tapasztalt és kedves alappillére."
  },
  {
    name: "Nagymama",
    role: "nagyszülő",
    relation: "Apa anyja",
    description: "A család szeretetteljes és gondoskodó szíve."
  },
  {
    name: "Apa",
    role: "szülő",
    relation: "Gyermekek édesapja",
    description: "A család támasza és védelmezője."
  },
  {
    name: "Anya",
    role: "szülő",
    relation: "Gyermekek édesanyja",
    description: "A család szervezője és gondoskodója."
  },
  {
    name: "Én",
    role: "gyermek",
    relation: "A család legfiatalabb tagja",
    description: "A legkisebb gyermek, aki a család jövője."
  },
  {
    name: "Testvér",
    role: "testvér",
    relation: "A testvérem",
    description: "A legjobb barát és a család egyik fontos tagja."
  }
];

const roleLabels = {
  all: "Összes",
  nagyszülő: "Nagyszülő",
  szülő: "Szülő",
  gyermek: "Gyermek",
  testvér: "Testvér"
};

const familyTree = document.getElementById("family-tree");
const roleSelect = document.getElementById("family-role");

function renderFamily(filterRole = "all") {
  const filteredMembers = filterRole === "all"
    ? familyMembers
    : familyMembers.filter((member) => member.role === filterRole);

  const grouped = {
    nagyszülő: [],
    szülő: [],
    gyermek: [],
    testvér: []
  };

  filteredMembers.forEach((member) => {
    grouped[member.role].push(member);
  });

  const groups = Object.entries(grouped).filter(([, members]) => members.length > 0);

  if (groups.length === 0) {
    familyTree.innerHTML = '<p class="empty">Nincsenek megjeleníthető családtagok ehhez a szűréshez.</p>';
    return;
  }

  familyTree.innerHTML = groups
    .map(([role, members]) => {
      const cards = members
        .map(
          (member) => `
            <article class="family-card">
              <div class="member-badge">${member.name.charAt(0)}</div>
              <h3>${member.name}</h3>
              <p class="relation">${member.relation}</p>
              <p>${member.description}</p>
            </article>
          `
        )
        .join("");

      return `
        <div class="family-group">
          <h2>${roleLabels[role]}</h2>
          <div class="family-grid">${cards}</div>
        </div>
      `;
    })
    .join("");
}

roleSelect.addEventListener("change", (event) => {
  renderFamily(event.target.value);
});

renderFamily();
