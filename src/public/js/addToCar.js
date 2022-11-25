const array = localStorage.getItem('array_articles') == null ? [] : JSON.parse(localStorage.getItem('array_articles'));
// OPEN AND CLOSE SHOPPING CAR
document.getElementById('shopping-car').addEventListener('click', () => document.getElementById('show-shoppin').classList.toggle('inactive'));

// SETTING TO ADD AN ITEM
const car = localStorage.getItem('items') == null ? [] : JSON.parse(localStorage.getItem('items'));

document.getElementById('mount').innerText = car.length;

if (document.getElementById('add-to-car')) {
    document.getElementById('add-to-car').addEventListener('click', clickButton);
}

function clickButton(e) {
    const button = e.target;
    const item = button.closest('.getThis');
    const item_id = document.getElementById('artID').textContent;
    const item_name = document.getElementById('artName').textContent;
    const item_price = document.getElementById('artPrice').textContent;
    const item_image = document.getElementById('image_article').src;
    const item_id_seller = document.getElementById('id_seller').textContent;

    add(createItem(item_id, item_name, item_price, item_image, item_id_seller));
    location.reload();
}

function createItem(id, name, price, image, id_sllr) {
    const item = {
        "id": id,
        "name": name,
        "price": price,
        "image": image,
        "id_seller": id_sllr
    }
    return item
}

function add(item) {

    // Checked if the value exist
    if (localStorage.getItem('items') !== null) {
        for (const i of JSON.parse(localStorage.getItem('items'))) {
            if (item.id == i.id) {
                // The value exist
                return null;
            }
        }
    }

    car.push(item);
    localStorage.setItem('items', JSON.stringify(car));
}

if (localStorage.getItem('items') !== null) {
    const des = JSON.parse(localStorage.getItem('items'));
    let acc = 1;
    for (const i of des) {
        const tr = document.createElement('tr');
        const content = `
            <tr>
                <td class="BordTable m_table color_w">${acc}</td>
                <td class="BordTable m_table color_w">${i.name}</td>
                <td class="BordTable m_table color_w">${i.price}</td>
                <td class="BordTable m_table color_w"><Button class="delete_art h_color_r bg_color_delete cursor" id="${i.id}" onclick="del(this.id)">Eliminar</Button></td>
            </tr>
        `;
        tr.innerHTML = content;
        document.getElementById('row').append(tr);
        acc++;
    }
}

// Delete
function del(id) {
    const remove = JSON.parse(localStorage.getItem('items'));
    let index = 0;
    for (const i of remove) {
        if (i.id == id) {
            remove.splice(index, 1);
            localStorage.setItem('items', JSON.stringify(remove));
            location.reload();
        }
        index++;
    }
}
// Delete all
document.getElementById('deleteCar').addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});
document.getElementById('close').addEventListener('click', () => {
    document.getElementById('show-shoppin').classList.toggle('inactive');
});


// Check if the shopping car is empty
const local_empty = JSON.parse(localStorage.getItem('items')) ? JSON.parse(localStorage.getItem('items')) : [];
const bttns_empty = document.getElementById('bttns_empty');
const div_message = document.getElementById('car_empty');

if (local_empty.length !== 0) {
    div_message.classList.add('inactive');
    bttns_empty.classList.remove('inactive');
}