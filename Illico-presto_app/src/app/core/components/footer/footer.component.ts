import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{
  constructor() {}

  ngOnInit() {
    const h2 = document.querySelector('h2');

    if (h2) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      };

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            h2.classList.add('reveal-h2');
            observer.unobserve(entry.target);
          }
        });
      }, options);

      observer.observe(h2);
    }
  }
}
