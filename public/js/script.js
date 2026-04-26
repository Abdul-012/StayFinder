// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

const imageInput = document.querySelector("#image");
const imagePreview = document.querySelector("#imagePreview");

if (imageInput && imagePreview) {
  imageInput.addEventListener("change", () => {
    const file = imageInput.files && imageInput.files[0];

    if (!file) {
      return;
    }

    imagePreview.src = URL.createObjectURL(file);
  });
}

if (
  document.querySelector("#map") &&
  typeof maplibregl !== "undefined" &&
  Array.isArray(window.coordinates)
) {
  const map = new maplibregl.Map({
    container: "map",
    style: "https://tiles.openfreemap.org/styles/bright",
    center: window.coordinates,
    zoom: 11
  });

  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

  new maplibregl.Marker()
    .setLngLat(window.coordinates)
    .addTo(map);
}
