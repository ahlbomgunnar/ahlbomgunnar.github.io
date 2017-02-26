
var imported = document.createElement('script');
imported.src = 'assets/datalist.js';
document.head.appendChild(imported);


let getID = id => document.getElementById(id);
let cardsContainer = getID('cards-container');
let projectView = getID('project-viewport');

let displayProject = obj => {
    projectView.style.visibility = 'visible';
    projectView.style.opacity = '1';
    projectView.style.zIndex = '1000';
    projectView.style.top = '0';
    let descHeader = document.createElement('h5');
        descHeader.innerHTML = obj.quote;
    getID('description-span').appendChild(descHeader);
    getID('project-url').href = obj.href;
    getID('project-header').innerHTML = obj.name.toUpperCase();
    getID('project-release-date').innerHTML = obj.date;
    getID('projectOpacityControl').style.opacity = '1';
    getID('first-project-image').src = obj.projectImgOne;
    getID('second-project-image').src = obj.projectImgTwo;
    getID('description-span').style.opacity = '1';
    scroll = document.body.scrollTop;
    document.body.style.height = '100vh';
    document.body.style.overflowY = 'hidden';
    for(let i=0; i<obj.technologies.length; i++) {
        let li = document.createElement('li');
            li.innerHTML = obj.technologies[i];
        getID('technology-list').appendChild(li);
    }
    for(let i=0; i<obj.filler.length; i++) {
        let p = document.createElement('p');
            p.innerHTML = obj.filler[i];
        getID('description-span').appendChild(p);
    }
    setTimeout(function() {
        getID('first-project-image').style.transition = '0.4s ease';
        getID('first-project-image').style.left = '0';
        getID('first-project-image').style.opacity = '1';
    },400);
    setTimeout(function() {
        getID('second-project-image').style.transition = '0.4s ease';
        getID('second-project-image').style.right = '75px';
        getID('second-project-image').style.opacity = '1';
    },600);
}







let closeProject = () => {
    setTimeout(function() {
        getID('first-project-image').style.transition = '0.15s ease';
        getID('first-project-image').style.left = '70px';
        getID('first-project-image').style.opacity = '0';
    },100);
    setTimeout(function() {
        getID('second-project-image').style.transition = '0.15s ease';
        getID('second-project-image').style.right = '150px';
        getID('second-project-image').style.opacity = '0';
        getID('projectOpacityControl').style.opacity = '0';
    },200);
    setTimeout(function() {
        document.body.style.height = 'auto';
        document.body.style.overflowY = '';
        window.scrollTo(0,scroll);
    },380);
    setTimeout(function() {
        projectView.style.visibility = 'hidden';
        projectView.style.opacity = '0';
        projectView.style.zIndex = '-1000';
        projectView.style.top = '-250px';
    },400);
    setTimeout(function() {
        getID('technology-list').innerHTML = '';
        getID('description-span').innerHTML = '';
    },600);
}







let createCards = () => {
    for(let i in datalist) {
        let obj = datalist[i];

        let card = document.createElement('div');
            card.className = 'card';

            // --- | Title section | --- \\
            let cardImage = document.createElement('div');
                cardImage.className = 'card-image';

                let img = document.createElement('img');
                    img.src = obj.src;
                    img.alt = obj.name;

            cardImage.appendChild(img);
            card.appendChild(cardImage);

            // --- | Content section | --- \\
            let cardContent = document.createElement('div');
                cardContent.className = 'card-content';

                let span = document.createElement('span');
                    span.className = 'card-title';
                    span.innerHTML = obj.name;
                    cardContent.appendChild(span);

                let desc = document.createElement('p');
                    desc.className = 'card-desc';
                    desc.innerHTML = obj.desc;
                    cardContent.appendChild(desc);

            card.appendChild(cardContent);

            // --- | Action section | --- \\
            let cardAction = document.createElement('div');
                cardAction.className = 'card-action';

                let link = document.createElement('a');
                    link.onclick = function() {displayProject(obj);}
                    link.innerHTML = 'View project <i class="fa fa-arrow-right" aria-hidden="true"></i>';
                    cardAction.appendChild(link);

            card.appendChild(cardAction);

        cardsContainer.appendChild(card);
    }
}

