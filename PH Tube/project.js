const songs_container = document.getElementById("songs_container")
const empty_container = document.getElementById("empty_container")

let currentData = [];
const load_data = async(id) =>{
    songs_container.innerHTML = '';
    empty_container.innerHTML = '';
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    const data1 = await response.json()
    const catagory_id =  data1.data[id].category_id
    fetch(`https://openapi.programming-hero.com/api/videos/category/${catagory_id}`)
    .then((res) => res.json())
    .then((data) => display_data(data.data))
}


const display_data = (data) =>{
    data.forEach((song) =>{
        let date = song.others.posted_date
        let hours = parseInt(date/3600)
        let minutes = parseInt ( (date - hours*3600) / 60)
        
        const cards = document.createElement("div")
        cards.classList.add("box")
        cards.innerHTML = `
        <div class="up">
        <div class="song_pic">
        <img class="song_img" src="${song.thumbnail}" alt="thumnail">
        ${!(hours == 0 && minutes == 0) ? `<div class="song_time">${hours} hours : ${minutes} minutes ago</div>` : ''}
        </div>
        </div>
        <div class="down d-flex">
        <div class="profile_pic">
        <img class="profile_img" src="${song.authors[0].profile_picture}" alt="">
        </div>
        <div class="texts">
        <h3>${song.title}</h3>
        <p>${song.authors[0].profile_name} ${is_verified(song)}</p>
        <div class="card_views">${song.others.views} views</div>
        </div>
        </div>
        `
        songs_container.appendChild(cards)
    })
    
    if(data.length == 0){
        const emptyMessage = document.createElement("div");
        emptyMessage.classList.add("empty-message");
        
        emptyMessage.innerHTML = `
        <div class="text-center mt-3">
        <div class="img">
        <img src="./Resources/Icon.png" alt="">
        </div>
        <div class="fw-bold drawing-content pt-4">
        <h2> Oops!! Sorry, There is no content here </h2>
        </div>
        </div>
        `
        empty_container.appendChild(emptyMessage);
    }
    
} 


const menuButtons = document.querySelectorAll('.menu');

menuButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove red background from all buttons
        menuButtons.forEach(btn => btn.style.backgroundColor = '');
        menuButtons.forEach(btn => btn.style.color = '');
        // Set red background to the clicked button
        button.style.backgroundColor = 'rgba(255, 31, 61, 1)';
        button.style.color = 'white'
    });
});


is_verified = (data) => {
    if(data.authors[0].verified == true){
        return `<i class="fa fa-check-circle verified" aria-hidden="true"></i>`
    }
    return "";
}

load_data(0)

const blog = ()=>{
    window.location.href = "blog.html";
}


find_views = (card) => {
    const cardViews = document.getElementsByClassName("card_views");
    let views = [];
    for(let i = 0; i < cardViews.length; i++){
        let str = cardViews[i].innerHTML;
        let num = ""
        for(let j = 0; j <= 3; j++){
            num += str[j];
        }
        num = parseFloat(num) * 1000;
        views.push(num);
    }
    return views;
}

sort_view = () => {
    const card = document.getElementById("songs_container").childNodes;    
    let card_list=[],  card_views = find_views(card);
    for(let i=0; i < card.length; i++){
        card_list.push(card[i]);
    }
    card_list.sort((a, b) => card_views[card_list.indexOf(b)] - card_views[card_list.indexOf(a)]);
    const cardContainer = document.getElementById("songs_container");
    while (cardContainer.firstChild){
        cardContainer.removeChild(cardContainer.firstChild);
    }
    for(let i=0; i < card_list.length; i++){
        cardContainer.appendChild(card_list[i]);
    }
    
}