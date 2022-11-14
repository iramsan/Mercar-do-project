const show_srch = document.getElementById('show_srch');
const srch = document.getElementById('srch');

document.addEventListener('keyup', (e) => {
    const id = e.target.matches('#srch');
    const value = e.target.value;
    var list = document.querySelectorAll('.index');
    

    if (value.length != 0) {
        if (list.length == 0) {
            show_srch.classList.add('inactive');
        } else {
            show_srch.classList.remove('inactive');
        }
    }
    if (value.length == 0) show_srch.classList.add('inactive');

    if (id) {
        document.querySelectorAll('.article_srch').forEach(element => {
            if (element.textContent.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
                element.classList.remove('filter');
                element.classList.add('index');
            } else {
                element.classList.add('filter');
                element.classList.remove('index');
            }
        });
    }
});

// srch.addEventListener('blur', () => {
//     show_srch.classList.add('inactive');
// });


