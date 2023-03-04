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

// more details modal
const fetchMoreDetail = (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showMoreDetail(data.data));
};

const showMoreDetail = (data) => {
  const {
    description,
    pricing,
    features,
    integrations,
    image_link,
    input_output_examples,
    accuracy
  } = data;

 
  document.getElementById("modal-body").innerHTML = `
    <div class="d-md-flex  gap-4 ">
        <div class="order-0 border border-danger mb-4 sm-mb-0 p-3">
            <h4>${description}</h4>
            <div class=" d-flex flex-wrap gap-4 justify-content-center py-4">
                <div class="p-2 bg-primary-subtle text-center">
                     <p>${
                       pricing ? pricing[0].price : "free of cost"
                     }</p>
                     <p>${pricing ? pricing[0].plan : ""}</p>
                </div>                       
                <div class="p-2 bg-danger-subtle text-center">
                     <p>${
                       pricing ? pricing[1].price : "free of cost"
                     }</p>
                     <p>${pricing ? pricing[1].plan : ""}</p>
                </div>                       
                <div class="p-2 bg-info-subtle text-center">
                     <p>${
                       pricing ? pricing[2].price : "free of cost"
                     }</p>
                     <p>${pricing ? pricing[2].plan : ""}</p>
                </div>                       
            </div>
            <div class="d-flex justify-content-between">
                <div>
                    <h5>Features</h5>
                    <p>${features ? '1. '+ features[1].feature_name :  'No feature'}</p>
                    <p>${features ? '2. '+ features[2].feature_name :  ''}</p>
                    <p>${features ? '3. '+ features[3].feature_name :  ''}</p>
                </div>
                <div>
                    <h5>Integrations</h5>
                    <p> ${integrations ? '1. '+ integrations[0] : "no data found"}</p>
                    <p> ${integrations ? '2. '+integrations[1] : ""}</p>
                    <p> ${integrations ? '3. '+integrations[2] : ""}</p>
                </div>
            </div>
          </div>
         
    </div>
   `;
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
