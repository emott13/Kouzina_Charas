document.addEventListener('DOMContentLoaded', () => {
    if(document.body.classList.contains('blog')){
        displayPosts();
    }
    if(document.body.classList.contains('main')){
        setUpBlog();
    }
    if(document.body.classList.contains('manager')){
        getData();
    }
})

let blogData = {
    posts: {
        titles: ['Holiday Delights with Exclusive Discounts!', 'New Year, New Look', 'Under New Management—A Fresh Chapter Begins!', 'Summer Happy Hour Specials Are Here!', "A Taste of Fall with Kouzina Charas’ Seasonal Drink Menu"],
        images: ['https://greektownchicago.org/wp-content/uploads/2021/12/traditions.jpg', 'https://cdn.kimkim.com/files/a/content_articles/featured_photos/edfed880fc5c4159af2e754653de474d2821d116/big-47bdd0b857998b74cac3f73b8d3a5501.jpg', 'new_management.webp', 'https://www.barsclubs.com.au/wp-content/uploads/2021/09/Cocktailsonthebeach.jpg', 'https://images.squarespace-cdn.com/content/v1/57125c2c2b8dde54a34b537f/1617217752902-SB84J9UXMPWQ06UAFP2E/%CE%BA%CE%B1%CF%83%CF%84%CE%BF%CF%81%CE%B9%CE%B1.jpg'],
        dates: ['December 15, 2023', 'February 1, 2024', 'March 15, 2024', 'June 1, 2024', 'September 10, 2024'],
        content: [
            `The holiday season is here, and Kouzina Charas is serving up something special! From December 15th through January 2nd, 
            enjoy 15% off our special holiday entrees, including our signature Lamb Souvlaki and festive Pistachio Baklava Cheesecake. 
            <br><br>
            Gather your loved ones and celebrate with us—we’ve decked the halls, and our chefs are ready to make your holiday 
            dining unforgettable. Reservations are highly recommended, so book your table today. Happy Holidays from all of us at 
            Kouzina Charas!`,
            `Kouzina Charas is kicking off the year with a fresh new look! Over the past month, we’ve given our interiors a stylish 
            update. Think warm Mediterranean tones, cozy seating, and a hint of modern elegance—perfect for an intimate dinner or a 
            celebratory gathering.
            <br><br>
            Come and see our redesigned space and let us know what you think! We’d love to hear your feedback while you enjoy your 
            favorite dishes in a beautiful, refreshed setting.`,
            `Exciting news! Kouzina Charas is now under new management. We’re committed to maintaining the flavors and traditions you 
            love while introducing innovative specials, community events, and enhanced dining experiences.
            <br><br>
            Our team can’t wait to welcome you with the same warmth and hospitality Kouzina Charas has always been known for. Stay 
            tuned for updates and thank you for being part of our journey!`,
            `Sip, snack, and save this summer at Kouzina Charas! From 4 PM to 6 PM, Monday through Friday, enjoy our Happy Hour specials:
            <br><br><ul>
            <li>$5 Small Plates: Spanakopita Bites, Mini Greek Sliders</li>
            <li>$6 Wine Glasses & Cocktails</li>
            <li>$3 Draft Beers</li>
            </ul><br><br>
            Join us on our sunny patio or cozy up in our updated interior and make every summer evening a delicious one. Cheers to great 
            food and even better deals!`,
            `As the leaves turn, so does our menu! Introducing our limited-time autumn dishes, like Pumpkin-Spiced Dolmades and 
            Cinnamon-Infused Lamb Stew. These dishes capture the cozy essence of fall and are available until November 15th.
            <br><br>
            Pair your meal with a glass of spiced wine or one of our house-made seasonal cocktails. It’s the perfect way to celebrate the 
            cooler months. Reserve your table today!`,
        ]
    }
}


function setUpBlog(){
    let storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    let blog = blogData['posts'];

    let existingTitles = new Set(storedPosts.map(post => post.title));

    blog.titles.forEach((title, i) => {
        if (!existingTitles.has(title)) {
            let item = {
                title: title,
                image: blog.images[i] || 'path/to/placeholder-image.jpg',
                date: blog.dates[i],
                content: blog.content[i],
            };
            storedPosts.push(item);
        }
    });

    localStorage.setItem('posts', JSON.stringify(storedPosts));
}



// ---- catch blog data from manager ---- //

// function getData(){
//     let form = document.querySelector('form');

//     form.addEventListener('submit', (event) => {
//     event.preventDefault();         // ----------------------------------------------------------------- prevents default form submit

//     let formData = new FormData(form); // -------------------------------------------------------------- sets up key/value pairs with the data

//     console.log(formData);
//     // Access individual form values
//     // const name = formData.get('name'); 
//     // const email = formData.get('email');

//     // // Do something with the data, e.g., send it to a server
//     // console.log(name, email); 

//     // // Or, convert to a plain object
//     // const formDataObject = Object.fromEntries(formData.entries());
//     // console.log(formDataObject); 
//     });
// }


// ---------------------------- //
// ---- BLOG POSTS DISPLAY ---- //
// ---------------------------- //


function displayPosts(){
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    let container = document.querySelector('.posts-holder');
    let reversedPosts = posts.reverse();
    reversedPosts.forEach(item => {
        let post = document.createElement('div');
        post.classList.add('post');
        post.innerHTML = `
            <img src="${item.image}" alt="">
            <h4>${item.title}</h4>
            <h5><i>${item.date}</i></h5>
            <blockquote>${item.content}</blockquote>
        `;
        container.append(post);
    });
}