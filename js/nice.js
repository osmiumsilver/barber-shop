document.addEventListener("DOMContentLoaded", function() {
    var checkbox = document.getElementById('toggleElement');
    var elementToToggle = document.getElementById('elementToToggle');

    checkbox.addEventListener('change', function() {
        if (this.checked) {
            elementToToggle.style.display = 'none';
        } else {
            elementToToggle.style.display = 'block';
        }
    });
});