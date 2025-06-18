import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js';

const firebaseConfig = {
  databaseURL:
    'https://leads-tracker-app-f29f6-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, 'leads');

const inputEl = document.getElementById('input-el');
const saveBtn = document.getElementById('input-btn');
const deleteBtn = document.getElementById('delete-btn');
const ulEl = document.getElementById('ul-el');

function render(leads) {
  let listItems = '';

  for (const lead of leads) {
    listItems += `
					<li>
						<a href= "${lead}" target="_blank"> ${lead}
						</a>
					</li>
				`;
  }
  ulEl.innerHTML = listItems;
}

onValue(referenceInDB, function (snapshot) {
  const snapshotDoesExist = snapshot.exists();

  if (snapshotDoesExist) {
    const snapshotValues = snapshot.val();
    const leads = Object.values(snapshotValues);
    render(leads);
  }
});

saveBtn.addEventListener('click', function () {
  push(referenceInDB, inputEl.value);
  inputEl.value = '';
});

deleteBtn.addEventListener('dblclick', function () {
  remove(referenceInDB);
  ulEl.innerHTML = '';
});
