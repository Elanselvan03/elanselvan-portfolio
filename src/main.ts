import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" 
         [class.bg-white]="isScrolled && !isDarkMode"
         [class.dark:bg-gray-900]="isScrolled && isDarkMode"
         [class.shadow-lg]="isScrolled"
         [class.bg-transparent]="!isScrolled">
      <div class="container-custom">
        <div class="flex items-center justify-between py-4">
          <!-- Logo -->
          <div class="text-2xl font-bold text-gradient">
            Elanselvan
          </div>
          
          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center space-x-8">
            <a href="#home" class="nav-link" (click)="scrollToSection('home')">Home</a>
            <a href="#about" class="nav-link" (click)="scrollToSection('about')">About</a>
            <a href="#skills" class="nav-link" (click)="scrollToSection('skills')">Skills</a>
            <a href="#projects" class="nav-link" (click)="scrollToSection('projects')">Projects</a>
            <a href="#contact" class="nav-link" (click)="scrollToSection('contact')">Contact</a>
            
            <!-- Dark Mode Toggle -->
            <button (click)="toggleDarkMode()" 
                    class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              <i class="fas" [class.fa-moon]="!isDarkMode" [class.fa-sun]="isDarkMode"></i>
            </button>
          </div>
          
          <!-- Mobile Menu Button -->
          <div class="md:hidden flex items-center space-x-4">
            <!-- Dark Mode Toggle -->
            <button (click)="toggleDarkMode()" 
                    class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              <i class="fas" [class.fa-moon]="!isDarkMode" [class.fa-sun]="isDarkMode"></i>
            </button>
            
            <button (click)="toggleMobileMenu()" class="text-2xl">
              <i class="fas" [class.fa-bars]="!isMobileMenuOpen" [class.fa-times]="isMobileMenuOpen"></i>
            </button>
          </div>
        </div>
        
        <!-- Mobile Menu -->
        <div class="md:hidden" [class.hidden]="!isMobileMenuOpen">
          <div class="py-4 space-y-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg mt-2">
            <a href="#home" class="block px-4 py-2 nav-link" (click)="scrollToSection('home'); toggleMobileMenu()">Home</a>
            <a href="#about" class="block px-4 py-2 nav-link" (click)="scrollToSection('about'); toggleMobileMenu()">About</a>
            <a href="#skills" class="block px-4 py-2 nav-link" (click)="scrollToSection('skills'); toggleMobileMenu()">Skills</a>
            <a href="#projects" class="block px-4 py-2 nav-link" (click)="scrollToSection('projects'); toggleMobileMenu()">Projects</a>
            <a href="#contact" class="block px-4 py-2 nav-link" (click)="scrollToSection('contact'); toggleMobileMenu()">Contact</a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div class="container-custom text-center">
        <div class="animate-fade-in">
          <!-- Profile Image -->
          <div class="mb-8">
            <div class="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-primary-500 to-purple-500 p-1">
              <div class="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <i class="fas fa-user text-4xl text-gray-600 dark:text-gray-300"></i>
              </div>
            </div>
          </div>
          
          <h1 class="text-5xl md:text-7xl font-bold mb-6">
            Hi, I'm <span class="text-gradient">Elanselvan</span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Full Stack Developer passionate about creating innovative web solutions with modern technologies
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button (click)="scrollToSection('projects')" class="btn-primary">
              View My Work
            </button>
            <button (click)="downloadResume()" class="btn-secondary">
              <i class="fas fa-download mr-2"></i>
              Download Resume
            </button>
          </div>
          
          <!-- Social Links -->
          <div class="flex justify-center space-x-6 mt-8">
            <a href="#" class="text-2xl text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors">
              <i class="fab fa-github"></i>
            </a>
            <a href="#" class="text-2xl text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="#" class="text-2xl text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="mailto:your.email@example.com" class="text-2xl text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors">
              <i class="fas fa-envelope"></i>
            </a>
          </div>
        </div>
        
        <!-- Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <i class="fas fa-chevron-down text-2xl text-gray-400"></i>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="section-padding bg-white dark:bg-gray-900">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <div class="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto"></div>
        </div>
        
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="animate-slide-up">
            <h3 class="text-2xl font-bold mb-6 text-gradient">Full Stack Developer</h3>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              I'm a passionate Full Stack Developer with expertise in modern web technologies. 
              I love creating efficient, scalable, and user-friendly applications that solve real-world problems.
            </p>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              With a strong foundation in both frontend and backend development, I enjoy working with 
              cutting-edge technologies and continuously learning new skills to stay ahead in the 
              ever-evolving tech landscape.
            </p>
            
            <div class="grid grid-cols-2 gap-6 mt-8">
              <div>
                <h4 class="font-semibold text-primary-600 mb-2">Experience</h4>
                <p class="text-gray-600 dark:text-gray-300">3+ Years</p>
              </div>
              <div>
                <h4 class="font-semibold text-primary-600 mb-2">Projects</h4>
                <p class="text-gray-600 dark:text-gray-300">50+ Completed</p>
              </div>
              <div>
                <h4 class="font-semibold text-primary-600 mb-2">Location</h4>
                <p class="text-gray-600 dark:text-gray-300">Remote / Global</p>
              </div>
              <div>
                <h4 class="font-semibold text-primary-600 mb-2">Availability</h4>
                <p class="text-gray-600 dark:text-gray-300">Open to Work</p>
              </div>
            </div>
          </div>
          
          <div class="animate-slide-up">
            <div class="card p-8">
              <h4 class="text-xl font-bold mb-6">What I Do</h4>
              <div class="space-y-6">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                    <i class="fas fa-code text-primary-600"></i>
                  </div>
                  <div>
                    <h5 class="font-semibold mb-2">Frontend Development</h5>
                    <p class="text-gray-600 dark:text-gray-300 text-sm">
                      Creating responsive and interactive user interfaces using React, Angular, and Vue.js
                    </p>
                  </div>
                </div>
                
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                    <i class="fas fa-server text-primary-600"></i>
                  </div>
                  <div>
                    <h5 class="font-semibold mb-2">Backend Development</h5>
                    <p class="text-gray-600 dark:text-gray-300 text-sm">
                      Building robust APIs and server-side applications with Node.js, Python, and databases
                    </p>
                  </div>
                </div>
                
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                    <i class="fas fa-mobile-alt text-primary-600"></i>
                  </div>
                  <div>
                    <h5 class="font-semibold mb-2">Mobile Development</h5>
                    <p class="text-gray-600 dark:text-gray-300 text-sm">
                      Developing cross-platform mobile applications using React Native and Flutter
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="section-padding bg-gray-50 dark:bg-gray-800">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4">Skills & Technologies</h2>
          <div class="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto"></div>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Frontend Skills -->
          <div class="card p-8">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-palette text-2xl text-primary-600"></i>
              </div>
              <h3 class="text-xl font-bold">Frontend</h3>
            </div>
            <div class="space-y-4">
              <div *ngFor="let skill of frontendSkills">
                <div class="flex justify-between mb-2">
                  <span class="font-medium">{{ skill.name }}</span>
                  <span class="text-sm text-gray-600 dark:text-gray-300">{{ skill.level }}%</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div class="bg-gradient-to-r from-primary-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                       [style.width.%]="skill.level"></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Backend Skills -->
          <div class="card p-8">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-server text-2xl text-primary-600"></i>
              </div>
              <h3 class="text-xl font-bold">Backend</h3>
            </div>
            <div class="space-y-4">
              <div *ngFor="let skill of backendSkills">
                <div class="flex justify-between mb-2">
                  <span class="font-medium">{{ skill.name }}</span>
                  <span class="text-sm text-gray-600 dark:text-gray-300">{{ skill.level }}%</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div class="bg-gradient-to-r from-primary-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                       [style.width.%]="skill.level"></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Tools & Others -->
          <div class="card p-8">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-tools text-2xl text-primary-600"></i>
              </div>
              <h3 class="text-xl font-bold">Tools & Others</h3>
            </div>
            <div class="space-y-4">
              <div *ngFor="let skill of toolsSkills">
                <div class="flex justify-between mb-2">
                  <span class="font-medium">{{ skill.name }}</span>
                  <span class="text-sm text-gray-600 dark:text-gray-300">{{ skill.level }}%</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div class="bg-gradient-to-r from-primary-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                       [style.width.%]="skill.level"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="section-padding bg-white dark:bg-gray-900">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <div class="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto"></div>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let project of projects" class="card overflow-hidden">
            <div class="h-48 bg-gradient-to-br from-primary-400 to-purple-500 relative overflow-hidden">
              <img [src]="project.image" [alt]="project.title" 
                   class="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300">
              <div class="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold mb-3">{{ project.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">{{ project.description }}</p>
              
              <div class="flex flex-wrap gap-2 mb-4">
                <span *ngFor="let tech of project.technologies" 
                      class="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 text-sm rounded-full">
                  {{ tech }}
                </span>
              </div>
              
              <div class="flex space-x-4">
                <a *ngIf="project.liveUrl" [href]="project.liveUrl" target="_blank" 
                   class="flex items-center text-primary-600 hover:text-primary-700 transition-colors">
                  <i class="fas fa-external-link-alt mr-2"></i>
                  Live Demo
                </a>
                <a *ngIf="project.githubUrl" [href]="project.githubUrl" target="_blank" 
                   class="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors">
                  <i class="fab fa-github mr-2"></i>
                  Code
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-12">
          <button class="btn-secondary">
            View All Projects
          </button>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="section-padding bg-gray-50 dark:bg-gray-800">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <div class="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto"></div>
          <p class="text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities and interesting projects. 
            Let's connect and create something amazing together!
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-12">
          <!-- Contact Info -->
          <div class="space-y-8">
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                <i class="fas fa-envelope text-primary-600"></i>
              </div>
              <div>
                <h4 class="font-semibold mb-2">Email</h4>
                <p class="text-gray-600 dark:text-gray-300">Elanselvann1997&#64;gmail.com</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                <i class="fas fa-phone text-primary-600"></i>
              </div>
              <div>
                <h4 class="font-semibold mb-2">Phone</h4>
                <p class="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                <i class="fas fa-map-marker-alt text-primary-600"></i>
              </div>
              <div>
                <h4 class="font-semibold mb-2">Location</h4>
                <p class="text-gray-600 dark:text-gray-300">Remote / Global</p>
              </div>
            </div>
            
            <!-- Social Links -->
            <div class="pt-8">
              <h4 class="font-semibold mb-4">Follow Me</h4>
              <div class="flex space-x-4">
                <a href="#" class="w-10 h-10 bg-primary-600 text-white rounded-lg flex items-center justify-center hover:bg-primary-700 transition-colors">
                  <i class="fab fa-github"></i>
                </a>
                <a href="#" class="w-10 h-10 bg-primary-600 text-white rounded-lg flex items-center justify-center hover:bg-primary-700 transition-colors">
                  <i class="fab fa-linkedin"></i>
                </a>
                <a href="#" class="w-10 h-10 bg-primary-600 text-white rounded-lg flex items-center justify-center hover:bg-primary-700 transition-colors">
                  <i class="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
          
          <!-- Contact Form -->
          <div class="card p-8">
            <form (ngSubmit)="onSubmit()" #contactForm="ngForm">
              <div class="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label for="name" class="block text-sm font-medium mb-2">Name</label>
                  <input type="text" id="name" name="name" [(ngModel)]="formData.name" required
                         class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 transition-colors">
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium mb-2">Email</label>
                  <input type="email" id="email" name="email" [(ngModel)]="formData.email" required
                         class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 transition-colors">
                </div>
              </div>
              
              <div class="mb-6">
                <label for="subject" class="block text-sm font-medium mb-2">Subject</label>
                <input type="text" id="subject" name="subject" [(ngModel)]="formData.subject" required
                       class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 transition-colors">
              </div>
              
              <div class="mb-6">
                <label for="message" class="block text-sm font-medium mb-2">Message</label>
                <textarea id="message" name="message" [(ngModel)]="formData.message" required rows="5"
                          class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 transition-colors resize-none"></textarea>
              </div>
              
              <button type="submit" [disabled]="!contactForm.form.valid || isSubmitting" 
                      class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                <span *ngIf="!isSubmitting">Send Message</span>
                <span *ngIf="isSubmitting" class="flex items-center justify-center">
                  <i class="fas fa-spinner fa-spin mr-2"></i>
                  Sending...
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="container-custom">
        <div class="text-center">
          <div class="text-2xl font-bold text-gradient mb-4">Elanselvan</div>
          <p class="text-gray-400 mb-6">Full Stack Developer</p>
          
          <div class="flex justify-center space-x-6 mb-8">
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <i class="fab fa-github text-xl"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <i class="fab fa-linkedin text-xl"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <i class="fab fa-twitter text-xl"></i>
            </a>
            <a href="mailto:your.email@example.com" class="text-gray-400 hover:text-white transition-colors">
              <i class="fas fa-envelope text-xl"></i>
            </a>
          </div>
          
          <div class="border-t border-gray-800 pt-8">
            <p class="text-gray-400">
              © {{ currentYear }} Elanselvan. All rights reserved. Built with Angular & Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .nav-link {
      @apply text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-300 relative;
    }
    
    .nav-link:hover::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(to right, #3b82f6, #8b5cf6);
      border-radius: 1px;
    }
    
    .animate-fade-in {
      animation: fadeIn 1s ease-out;
    }
    
    .animate-slide-up {
      animation: slideUp 0.8s ease-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(50px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class App implements OnInit, OnDestroy {
  @ViewChild('contactForm') contactForm!: ElementRef;
  
  isDarkMode = false;
  isScrolled = false;
  isMobileMenuOpen = false;
  isSubmitting = false;
  currentYear = new Date().getFullYear();
  
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  frontendSkills: Skill[] = [
    { name: 'Angular', level: 90, category: 'frontend' },
    { name: 'React', level: 85, category: 'frontend' },
    { name: 'Vue.js', level: 80, category: 'frontend' },
    { name: 'TypeScript', level: 88, category: 'frontend' },
    { name: 'JavaScript', level: 92, category: 'frontend' },
    { name: 'HTML/CSS', level: 95, category: 'frontend' }
  ];
  
  backendSkills: Skill[] = [
    { name: 'Node.js', level: 85, category: 'backend' },
    { name: 'Python', level: 80, category: 'backend' },
    { name: 'Express.js', level: 88, category: 'backend' },
    { name: 'MongoDB', level: 82, category: 'backend' },
    { name: 'PostgreSQL', level: 85, category: 'backend' },
    { name: 'REST APIs', level: 90, category: 'backend' }
  ];
  
  toolsSkills: Skill[] = [
    { name: 'Git', level: 90, category: 'tools' },
    { name: 'Docker', level: 75, category: 'tools' },
    { name: 'AWS', level: 70, category: 'tools' },
    { name: 'Figma', level: 85, category: 'tools' },
    { name: 'VS Code', level: 95, category: 'tools' },
    { name: 'Postman', level: 88, category: 'tools' }
  ];
  
  projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with modern UI, payment integration, and admin dashboard.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates and team features.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'Express.js', 'Socket.io', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A responsive weather dashboard with location-based forecasts and interactive charts.',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Vue.js', 'Chart.js', 'Weather API', 'Tailwind'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 4,
      title: 'Social Media App',
      description: 'A social networking platform with real-time messaging and content sharing features.',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React Native', 'Firebase', 'Redux', 'Node.js'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 5,
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website built with Angular and Tailwind CSS.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Angular', 'Tailwind CSS', 'TypeScript'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      id: 6,
      title: 'Learning Management System',
      description: 'An educational platform with course management, video streaming, and progress tracking.',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Angular', 'NestJS', 'PostgreSQL', 'AWS S3'],
      liveUrl: '#',
      githubUrl: '#'
    }
  ];
  
  ngOnInit() {
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      this.isDarkMode = JSON.parse(savedDarkMode);
    } else {
      // Check system preference
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.updateDarkMode();
    
    // Add scroll event listener
    window.addEventListener('scroll', this.onScroll.bind(this));
  }
  
  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }
  
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.isScrolled = window.scrollY > 50;
  }
  
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.updateDarkMode();
    localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode));
  }
  
  private updateDarkMode() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }
  
  downloadResume() {
    // Create a link to download the resume
    const link = document.createElement('a');
    link.href = '/assets/Elanselvan.pdf';
    link.download = 'Elanselvan_Resume.pdf';
    link.click();
  }
  
  onSubmit() {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! I\'ll get back to you soon.');
      this.formData = { name: '', email: '', subject: '', message: '' };
      this.isSubmitting = false;
    }, 2000);
  }
}

bootstrapApplication(App);