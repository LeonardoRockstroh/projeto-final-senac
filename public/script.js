document.addEventListener('DOMContentLoaded', function() {
    const prodNotifCheckbox = document.getElementById('prod_notif');
    const prodNotifDiasInput = document.getElementById('prod_notif_dias');

    console.log('teste');
  
    prodNotifCheckbox.addEventListener('change', function() {
      if (prodNotifCheckbox.checked) {
        prodNotifDiasInput.disabled = false;
      } else {
        prodNotifDiasInput.disabled = true;
      }
    });
});