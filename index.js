const d = new Date();
let monthNum = d.getMonth();
var month = [
    { name: "January", days: 31 },
    { name: "February", days: 29 },
    { name: "March", days: 31 },
    { name: "April", days: 30 },
    { name: "May", days: 31 },
    { name: "June", days: 30 },
    { name: "July", days: 31 },
    { name: "August", days: 31 },
    { name: "September", days: 30 },
    { name: "October", days: 31 },
    { name: "November", days: 30 },
    { name: "December", days: 31 }
];

let date = d.getDate();

let select_month = month[monthNum].name;
let fullDate = `${date} ${month[monthNum].name}`;

const show_months = month.map((months, key) => {
    const option = `<option value=${key} name="month" id=${months.name}>${months.name}</option>`;
    document.getElementById("show_months").innerHTML += option;
});
document.getElementById(select_month).selected = true;
document.getElementById("search_date").value = date;

const changeDate = () => {
    let search_date1 = document.getElementById("search_date").value;
    let search_date = parseInt(search_date1);

    const selected_value = document.getElementById("months").value;

    const max_day = month[selected_value].days;
    document.getElementById("search_date").max = max_day;

    if (search_date > max_day || search_date < 1 || search_date1 === "") {
        document.getElementById("search_date").value = date[0];
    } else {
        let selected_month = document.getElementById("months").value;

        fullDate = `${search_date} ${month[selected_month].name}`;
        getApi(fullDate, selected_month, 1);
    }
};
document.getElementById("search_date").onchange = () => { changeDate() };

document.getElementById("months").onchange = () => { changeDate() };

async function getApi(d, m, custom) {
    if (custom == 1) {
        document.getElementById("show_cards").innerHTML = "";
    }

    const jsonData = await fetch(`./events/${month[m].name}.json`);

    const data = await jsonData.json();


    if (data.some(events => events.date === d)) {
        const getEvent = (events) => {
            return events.date === d;
        }

        const todayEvent = data.filter(getEvent);

        const show_event = todayEvent[0].name.map((data, key) => {

            const card = `<div class="card">
    <div class="card-header">
        <h3 class="card-title">${data}</h3>
    </div>
    <div class="card-body">${todayEvent[0].desc[key]}</div>
    <div class="card-footer">${d}</div>
</div>`;
            document.getElementById("show_cards").innerHTML += card;
        });
    } else {
        document.getElementById("show_cards").innerHTML = `<h1>No Event on ${d} </h1>`;
    }

    return date = d;
};

getApi(fullDate, monthNum);
