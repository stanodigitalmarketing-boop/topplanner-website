function toggleMenu() {
    const nav = document.querySelector('nav');
    nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
}

function sendMessage() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // For static site, use mailto or alert
    const mailtoLink = `mailto:res.toptravelplanneszambia@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailtoLink;

    alert('Thank you for your message! We will get back to you soon.');
}

window.addEventListener("scroll", function(){
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const position = card.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if(position < screenHeight - 100){
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }
    });
});
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", function(e) {
    if (this.href.includes(".html")) {
      console.log("Loading page:", this.href);
    }
  });
});
