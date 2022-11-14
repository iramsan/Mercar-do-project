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

    add(createItem(item_id, item_name, item_price));
    location.reload();
}

function createItem(id, name, price) {
    const item = {
        "id": id,
        "name": name,
        "price": price
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
                <td class="BordTable m_table">${acc}</td>
                <td class="BordTable m_table">${i.name}</td>
                <td class="BordTable m_table">${i.price}</td>
                <td class="BordTable m_table"><Button class="delete_art cursor" id="${i.id}" onclick="del(this.id)">Eliminar</Button></td>
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
