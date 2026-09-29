# The Crown & Blade

### A polished barbershop website for modern grooming and appointment inquiries.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Built with HTML, CSS, and JavaScript](https://img.shields.io/badge/Built%20with-HTML%20%7C%20CSS%20%7C%20JavaScript-39729b)](index.html)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-222222?logo=github)](https://mustaqeem29.github.io/Barber_fronted_sample_website/)

The Crown & Blade is a responsive, single-page barbershop website. It presents services, barbers, prices, a photo gallery, customer reviews, contact details, and an appointment inquiry flow in a dark-and-gold visual style.

**[Open the live site](https://mustaqeem29.github.io/Barber_fronted_sample_website/)** · **[View the source](https://github.com/Mustaqeem29/Barber_fronted_sample_website)**

> The appointment form currently runs in the browser only; it does not store bookings or send confirmations to a booking system. The displayed business contact details and WhatsApp number are sample values. Replace them with real business information before using the site for customers.

---

## Contents

- [Features](#features)
- [Preview locally](#preview-locally)
- [Project structure](#project-structure)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Technology](#technology)
- [License](#license)

---

## Features

- Responsive layout with desktop navigation and a mobile menu
- Service cards with category filters and quick booking links
- Barber profiles, pricing, customer reviews, and contact information
- Filterable image gallery with an expanded lightbox view
- Live open/closed status based on the sample weekly schedule
- Client-side appointment form validation and a confirmation preview
- WhatsApp links for preparing an appointment inquiry
- Back-to-top control and active navigation as you scroll

## Preview locally

No build tools, package manager, or dependencies are required. Clone the repository and open `index.html` in a browser:

```sh
git clone https://github.com/Mustaqeem29/Barber_fronted_sample_website.git
cd Barber_fronted_sample_website
```

You can also serve the folder with a local static web server if you prefer.

## Project structure

```text
.
├── index.html             # Page content and sections
├── css/
│   └── style.css          # Layout, responsive styles, and visual design
├── js/
│   └── main.js            # Navigation, filters, gallery, and booking interactions
├── images/                # Local site images
├── .gitignore
├── LICENSE
└── README.md
```

## Configuration

Before adapting the template for a real shop, update the sample business information in `index.html` and `js/main.js`, including:

- Shop name, address, opening hours, services, and prices
- Phone and WhatsApp numbers (`+1234567890` is a placeholder)
- Map embed and external social links
- Barber profiles, reviews, and imagery

The booking form validates details and displays a confirmation preview, but does not persist or transmit the booking. Connect a trusted booking service or backend before relying on it to accept appointments. Google Fonts and some gallery photos load from external services and need an internet connection.

## Deployment

This repository is configured to publish from the `main` branch using GitHub Pages. After a push, the published page may take a few minutes to update:

**[Visit the GitHub Pages site](https://mustaqeem29.github.io/Barber_fronted_sample_website/)**

To use a different repository, open its **Settings → Pages**, select **Deploy from a branch**, then choose the branch containing `index.html` and the repository root folder.

## Technology

- HTML5
- CSS3 with responsive layouts
- Vanilla JavaScript
- Google Fonts
- Unsplash-hosted gallery and profile imagery

## License

The project is released under the [MIT License](LICENSE). Third-party images, fonts, and services remain subject to their respective terms and licenses.
