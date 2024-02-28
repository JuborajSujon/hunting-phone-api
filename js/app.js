const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  // 1 Get prarent element - who append the child element
  const phoneContainer = document.getElementById("phone-container");
  //clear phone container cards before adding new cards
  phoneContainer.textContent = "";
  // display all phones button hide or Show
  const showAllContainer = document.getElementById("show-all-container");

  // check if there is 12 phones or not
  if (phones.length > 12) {
    showAllContainer.classList.remove("hidden");
  }

  if (!isShowAll) {
    // display only first 12 phones
    phones = phones.slice(0, 12);
  } else {
    // display all phones
    showAllContainer.classList.add("hidden");
  }

  phones.forEach((phone) => {
    // console.log(phone);
    // 2 create a div - child element
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card w-96 bg-base-100 shadow-xl`;
    // 3 create child body element with dynamic value
    phoneCard.innerHTML = `
    <figure class="p-6">
      <img
        class="rounded-md"
        src="${phone.image}"
        alt="Shoes" />
    </figure>
    <div class="card-body text-center">
      <h2 class="card-title self-center">${phone.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <h4 class="text-xl font-extrabold">$999</h4>
      <div class="card-actions justify-center">
        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
      </div>
    </div>
    `;
    // 4 append child
    phoneContainer.appendChild(phoneCard);
  });
  // stop spinner or loader
  toggleSpinner(false);
};

// handle search button
const handleSearch = (isShowAll) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
};

// loading spinner toggle function
const toggleSpinner = (isLoading) => {
  const loader = document.getElementById("loader");
  if (isLoading) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
};

//
const handleShowAll = () => {
  handleSearch(true);
};

// handle show Details
const handleShowDetails = async (slug) => {
  // console.log("clicked", slug);
  const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
  //load single phone data
  const res = await fetch(url);
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};

// show details modal
const showPhoneDetails = (phone) => {
  // console.log(phone);
  const showDetailsModal = document.getElementById("modal-details");
  showDetailsModal.innerHTML = `
  <div class="w-full flex justify-center">
    <img src="${phone?.image}"	 alt="${phone?.name}" />
  </div>
  <h3 class="text-lg font-bold">${phone?.name}</h3>
  <p>The ${phone?.name} stands as a breathtaking device that</p>
  <p><span class="font-bold">Storage : </span>${phone?.mainFeatures?.storage}</p>
  <p>
    <span class="font-bold">Display Size : </span>${phone?.mainFeatures?.displaySize}
  </p>
  <p><span class="font-bold">Chipset : </span>${phone?.mainFeatures?.chipSet}</p>
  <p><span class="font-bold">Memory : </span>${phone?.mainFeatures?.memory}</p>
  <p><span class="font-bold">Slug : </span>${phone?.slug}</p>
  <p>
    <span class="font-bold">Release data : </span>${phone?.releaseDate}
  </p>
  <p><span class="font-bold">Brand : </span>${phone?.brand}</p>
  <p><span class="font-bold">GPS : </span>${phone?.others?.GPS}</p>
  `;
  // show the modal
  show_details_modal.showModal();
  // const showDetailsModal = document.getElementById("modal-details");
};

// loadPhone();
