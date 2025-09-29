// القاموس العربي
const positiveWords = ["جميل","رائع","حب","سعادة","ممتاز","مذهل","جيد","ابتسامة","تفاؤل","نجاح"];
const negativeWords = ["سيئ","حزن","كريه","غضب","فشل","كئيب","قبيح","كره","ضعيف","خسارة"];

let chartInstance = null;

function analyze() {
  let text = document.getElementById("userInput").value.trim();
  if(!text) {
    alert("رجاءً اكتب نص للتحليل");
    return;
  }

  let score = 0, posCount = 0, negCount = 0;
  let words = text.split(/[\s,،.!?]+/);

  words.forEach(word => {
    if(positiveWords.includes(word)) { score++; posCount++; }
    if(negativeWords.includes(word)) { score--; negCount++; }
  });

  let neutralCount = words.length - (posCount + negCount);
  let output = "";

  if(score > 0) output = `<span class="positive">😊 النص إيجابي<br>الدرجة: ${score} | كلمات إيجابية: ${posCount}</span>`;
  else if(score < 0) output = `<span class="negative">😞 النص سلبي<br>الدرجة: ${score} | كلمات سلبية: ${negCount}</span>`;
  else output = `<span class="neutral">😐 النص محايد<br>الدرجة: ${score}</span>`;

  document.getElementById("result").innerHTML = output;

  // رسم الرسم البياني
  let ctx = document.getElementById("sentimentChart").getContext("2d");
  if(chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ["إيجابية", "سلبية", "محايدة"],
      datasets: [{
        data: [posCount, negCount, neutralCount],
        backgroundColor: ["#4caf50", "#f44336", "#9e9e9e"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 14 } } }
      }
    }
  });
}