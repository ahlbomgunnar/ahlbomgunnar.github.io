
let datalist = [ 
    { 
        name:'Astrocy',
        desc:'Astronomy webshop built as part of a graphics and user-interface course.',
        date:'January 2017',
        src :'assets/img/astrocy.png',
        quote:'Exploration cause curiosity - curiosity brings value',
        filler:['Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.', 
                'Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.',
                'Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.'],
        technologies:['Markup - HTML', 'CSS assets(Sass)', 'AngularJS', 'BootStrap'],
        projectImgOne:'assets/img/astrocy-web.png',
        projectImgTwo:'assets/img/astrocy-mobile.png',
        href: 'pages/astrocy'
    },
    { 
        name:'Atoms',
        desc:'A simple JavaScript game made during my off-time from school.',
        date:'Jan 25, 2017',
        src :'assets/img/atoms.png',
        quote:'Explode your way to victory',
        filler:['Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.', 
                'Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.',
                'Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.'],
        technologies:['Markup - HTML', 'CSS assets(Sass)', 'AngularJS', 'BootStrap'],
        projectImgOne:'assets/img/atoms-web.png',
        projectImgTwo:'assets/img/atoms-mobile.png',
        href: 'pages/atoms'    
    },
    { 
        name:'Kaffelicious',
        desc:'A coffee webshop made as part of a HTML & CSS course. Collaborated with Carl Hultkrantz & Zeena.',
        date:'October, 2016',
        src :'assets/img/kaffelicious.png',
        quote:'Coffee made easy',
        filler:['Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.', 
                'Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.',
                'Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.'],
        technologies:['Markup - HTML', 'CSS assets(Sass)', 'AngularJS', 'BootStrap'],
        projectImgOne:'assets/img/kaffelicious-web.png',
        projectImgTwo:'assets/img/kaffelicious-mobile.png',
        href: 'pages/kaffelicious'
    },
    { 
        name:'Authentic', 
        desc:'Weather App',
        date:'Alpha release - December 2016<br/> Beta release - April 2017',
        src :'assets/img/authentic.png',
        quote:'When you want the weather, you just want the weather',
        filler:['When you want the weather, you dont want all the fuss, just the weather. Authentic is a weather app created to solve that problem. When released, it will provide users with the correct weather data in a simple and fun way.', 
                'In the settings the user could let the app know what types of weather the user likes and dislikes. The app would then accomodate the user by, if for say the user chose to let the app know he or she dislikes rain, it would say Its fuckin raining again, go get you umbrella - or something similar.'],
        technologies:['Markup - HTML', 'CSS assets(Sass)', 'AngularJS', 'BootStrap'],
        projectImgOne:'assets/img/authentic-web.png',
        projectImgTwo:'assets/img/authentic-mobile.png',
        href: 'pages/authentic'
    },
    { 
        name:'Subsurge', 
        desc:'JavaScript dungeoncrawler & sci-fi game',
        date:'Not released',
        src :'assets/img/subsurge.png',
        quote:'In development JavaScript game',
        filler:['Currently in development, the JavaScript title Subsurge will be set in the far-distant future, combining future assets with a classic dungeon crawling experience.', 
                'The game will have live updates, but the user should be able to slow down time in order to accomodate the increasingly difficult floors full of alien activity, which will be crucial in order to make it even beyond the first couple of floors.',
                'No release date as of yet.'],
        technologies:['Markup - HTML', 'CSS assets(Sass)', 'AngularJS', 'BootStrap'],
        projectImgOne:'assets/img/subsurge-web.png',
        projectImgTwo:'assets/img/subsurge-mobile.png',
        href: 'pages/astrocy'
    }
    
];

let getID = id => document.getElementById(id);

let cardsContainer = getID('cards-container');
let projectView = getID('project-viewport');








let displayProject = obj => {

    projectView.style.visibility = 'visible';
    projectView.style.opacity = '1';
    projectView.style.zIndex = '1000';
    projectView.style.top = '0';


    getID('project-url').href = obj.href;

    getID('project-header').innerHTML = obj.name.toUpperCase();

    let descHeader = document.createElement('h5');
        descHeader.innerHTML = obj.quote;
    getID('description-span').appendChild(descHeader);

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

    getID('project-release-date').innerHTML = obj.date;

    getID('projectOpacityControl').style.opacity = '1';

    getID('first-project-image').src = obj.projectImgOne;
    getID('second-project-image').src = obj.projectImgTwo;
    getID('description-span').style.opacity = '1';

    scroll = document.body.scrollTop;
    document.body.style.height = '100vh';
    document.body.style.overflowY = 'hidden';

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
        document.body.style.overflowY = 'scroll';
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

