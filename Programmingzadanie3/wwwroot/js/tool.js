const urii = 'api/Tools';
let tod = [];

function getItems() {
    fetch(urii)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    const addtypeTextbox = document.getElementById('add-type');
    const addbrandTextbox = document.getElementById('add-brand');
    const addmodelTextbox = document.getElementById('add-model');
    const addconditionTextbox = document.getElementById('add-condition');

    const item = {
        type: addtypeTextbox.value,
        brand: addbrandTextbox.value,
        model: addmodelTextbox.value,
        condition: addconditionTextbox.value
    };

    fetch(urii, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addtypeTextbox.value = '';
            addbrandTextbox.value = '';
            addmodelTextbox.value = '';
            addconditionTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    fetch(`${urii}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = tod.find(item => item.id === id);

    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-type').value = item.type;
    document.getElementById('edit-brand').value = item.brand;
    document.getElementById('edit-model').value = item.model;
    document.getElementById('edit-condition').value = item.condition;
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        type: document.getElementById('edit-type').value.trim(),
        brand: document.getElementById('edit-brand').value.trim(),
        model: document.getElementById('edit-model').value.trim(),
        condition: document.getElementById('edit-condition').value.trim()
    };

    fetch(`${urii}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount <= 1) ? 'narzędzie' : 'narzędzia';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('tod');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode1 = document.createTextNode(item.type);
        td1.appendChild(textNode1);

        let td2 = tr.insertCell(1);
        let textNode2 = document.createTextNode(item.brand);
        td2.appendChild(textNode2);

        let td3 = tr.insertCell(2);
        let textNode3 = document.createTextNode(item.model);
        td3.appendChild(textNode3);

        let td4 = tr.insertCell(3);
        let textNode4 = document.createTextNode(item.condition);
        td4.appendChild(textNode4);

        let td5 = tr.insertCell(4);
        td5.appendChild(editButton);

        let td6 = tr.insertCell(5);
        td6.appendChild(deleteButton);
    });

    tod = data;
}