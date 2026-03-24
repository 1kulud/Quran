const surahs = [
  "الفاتحة",
  "البقرة",
  "آل عمران",
  "النساء",
  "المائدة",
  "الأنعام",
  "الأعراف",
  "الأنفال",
  "التوبة",
  "يونس",
  "هود",
  "يوسف",
  "الرعد",
  "إبراهيم",
  "الحجر",
  "النحل",
  "الإسراء",
  "الكهف",
  "مريم",
  "طه",
  "الأنبياء",
  "الحج",
  "المؤمنون",
  "النور",
  "الفرقان",
  "الشعراء",
  "النمل",
  "القصص",
  "العنكبوت",
  "الروم",
  "لقمان",
  "السجدة",
  "الأحزاب",
  "سبأ",
  "فاطر",
  "يس",
  "الصافات",
  "ص",
  "الزمر",
  "غافر",
  "فصلت",
  "الشورى",
  "الزخرف",
  "الدخان",
  "الجاثية",
  "الأحقاف",
  "محمد",
  "الفتح",
  "الحجرات",
  "ق",
  "الذاريات",
  "الطور",
  "النجم",
  "القمر",
  "الرحمن",
  "الواقعة",
  "الحديد",
  "المجادلة",
  "الحشر",
  "الممتحنة",
  "الصف",
  "الجمعة",
  "المنافقون",
  "التغابن",
  "الطلاق",
  "التحريم",
  "الملك",
  "القلم",
  "الحاقة",
  "المعارج",
  "نوح",
  "الجن",
  "المزمل",
  "المدثر",
  "القيامة",
  "الإنسان",
  "المرسلات",
  "النبأ",
  "النازعات",
  "عبس",
  "التكوير",
  "الانفطار",
  "المطففين",
  "الانشقاق",
  "البروج",
  "الطارق",
  "الأعلى",
  "الغاشية",
  "الفجر",
  "البلد",
  "الشمس",
  "الليل",
  "الضحى",
  "الشرح",
  "التين",
  "العلق",
  "القدر",
  "البينة",
  "الزلزلة",
  "العاديات",
  "القارعة",
  "التكاثر",
  "العصر",
  "الهمزة",
  "الفيل",
  "قريش",
  "الماعون",
  "الكوثر",
  "الكافرون",
  "النصر",
  "المسد",
  "الإخلاص",
  "الفلق",
  "الناس",
];

const container = document.getElementById("list");
const countText = document.getElementById("count");
const progressBar = document.getElementById("progressBar");

let saved = localStorage.getItem("progress");

if (!saved) {
  saved = "0".repeat(114);
}

let checkedCount = 0;

function Pro() {
  countText.textContent = checkedCount;
  progressBar.value = checkedCount;
}

surahs.forEach((name, index) => {
  const div = document.createElement("div");
  const checkbox = document.createElement("input");
  const label = document.createElement("label");
  const span = document.createElement("span");
  div.className = "surah";
  checkbox.type = "checkbox";
  label.textContent = index + 1 + ". " + name;
  span.className = "done";

  if (saved[index] === "1") {
    checkbox.checked = true;
    span.textContent = " 🤲 تمت القراءة";
    checkedCount++;
  }

  checkbox.addEventListener("change", function () {
    let arr = saved.split("");

    if (this.checked) {
      span.textContent = " 🤲 تمت القراءة";
      arr[index] = "1";
      checkedCount++;
    } else {
      span.textContent = "";
      arr[index] = "0";
      checkedCount--;
    }

    saved = arr.join("");
    localStorage.setItem("progress", saved);
    Prog();
  });

  div.appendChild(checkbox);
  div.appendChild(label);
  div.appendChild(span);
  container.appendChild(div);
});

Prog();
