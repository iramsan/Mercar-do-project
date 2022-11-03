// Start Variables
const id_run_view_1 = document.getElementById('id_run_view_1');
const id_run_view_2 = document.getElementById('id_run_view_2');

// Push Variables
const id_push_view_1 = document.getElementById('id_push_view_1');
const id_push_view_2 = document.getElementById('id_push_view_2');


id_run_view_1.addEventListener('mouseenter', () => id_push_view_1.classList.toggle('viewActive'));
id_run_view_1.addEventListener('mouseleave', () => id_push_view_1.classList.remove('viewActive'));

id_run_view_2.addEventListener('mouseenter', () => id_push_view_2.classList.toggle('viewActive'));
id_run_view_2.addEventListener('mouseleave', () => id_push_view_2.classList.remove('viewActive'));

id_run_view_3.addEventListener('mouseenter', () => id_push_view_3.classList.toggle('viewActive'));
id_run_view_3.addEventListener('mouseleave', () => id_push_view_3.classList.remove('viewActive'));

id_run_view_4.addEventListener('mouseenter', () => id_push_view_4.classList.toggle('viewActive'));
id_run_view_4.addEventListener('mouseleave', () => id_push_view_4.classList.remove('viewActive'));

// cardCategory.addEventListener('mouseenter', () => cardView.classList.toggle('viewActive'));
// cardCategory.addEventListener('mouseleave', () => cardView.classList.remove('viewActive'));


