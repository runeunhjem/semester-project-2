import { toTopButton } from "./utils/back-to-top-button.mjs";

/**
 * Add a "Back to Top" button to the page.
 */
toTopButton();

/**
 * Add Bootstrap validation styles to forms.
 */
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener(
      "submit",
      event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
