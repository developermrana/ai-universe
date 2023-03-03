const fetchAllData = (dataLength) => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => allData(data.data.tools, dataLength));
};
fetchAllData();
const allData = (datas, dataLength) => {
  const allDataSection = document.getElementById("all-data");

  datas.forEach((data) => {
    console.log(data);
    const { image, features, name, published_in } = data;

    allDataSection.innerHTML += `
        <div class="col-sm-6 col-md-4">
            <div class="card bg-body-secondary">
                <img style="height:200px;" src="${image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h2 class="card-title">Features</h2>
                    <p class="card-text">${features}</p>
                </div>
                <hr>
                <div class="d-flex justify-content-between align-items-center p-3">
                    <div>
                        <h4>${name}</h4>
                        <p>${published_in}</p>
                    </div>
                    <div>
                        <button class="btn btn-primary">Details</button>
                    </div>
                </div>
            </div>
        </div>
        `;
  });
};


// document.getElementById("more-data").addEventListener("click", function () {
//     if (datas > 6 && dataLength == 6) {
//         datas = datas.slice(0, 6);
//       } else {
//         console.log(646);
//       }
// });
