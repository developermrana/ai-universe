const fetchAllData = (dataLength) => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => allData(data.data.tools, dataLength));
};
fetchAllData(6);

const allData = (datas, dataLength) => {
  const allDataSection = document.getElementById("all-data");
  allDataSection.innerHTML = "";

  //   check datas length
  const showAllContainer = document.getElementById("show-all");
  if (datas.length > 6 && dataLength) {
    datas = datas.slice(0, 6);
    showAllContainer.classList.remove("d-none");
  } else {
    showAllContainer.classList.add("d-none");
  }

  datas.forEach((data) => {
    const { image, features, name, published_in, id } = data;

    allDataSection.innerHTML += `
        <div class="col-sm-6 col-lg-4">
            <div class="card bg-body-secondary">
                <img style="height:200px;" src="${image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h2 class="card-title">Features</h2>
                    <p class="card-text">1. ${features[0]}</p>
                    <p class="card-text">2. ${features[1]}</p>
                    <p class="card-text">3. ${features[2]}</p>
                </div>
                <hr>
                <div class="d-flex justify-content-between align-items-center p-3">
                    <div>
                        <h4>${name}</h4>
                        <p>${published_in}</p>
                    </div>
                    <div>
                        <button class="btn btn-primary" onclick="fetchMoreDetail('${id}')" data-bs-toggle="modal" data-bs-target="#more-data">Details</button>
                    </div>
                </div>
            </div>
        </div>
        `;
  });
  spinner(false);
};



// show more btn event
document.getElementById("show-more-btn").addEventListener("click", function () {
  spinner(true);
  fetchAllData();
});


// show spinner
const spinnerContainer = document.getElementById("spinner");
const spinner = (isLoading) => {
  if (isLoading) {
    spinnerContainer.classList.remove("d-none");
  } else {
    spinnerContainer.classList.add("d-none");
  }
};