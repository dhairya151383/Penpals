PenPals - Online Publishing Platform
PenPals is a feature-rich Angular web application designed to empower authors to create, publish, and manage articles while enabling readers to explore, read, like, and comment. Built with Firebase, Firestore, and modern Angular practices, it promotes community-driven engagement and thoughtful content sharing.

Table of Contents
Project Description

Features

Deliverables

Setup and Installation

Running the Application

Deployed Application

User Credentials

Unit Tests

Bonus Features

UI/UX Enhancements

Evaluation Criteria

1. Project Description
PenPals is a modern publishing platform that facilitates seamless interaction between content creators and readers. It offers intuitive tools for creating rich articles, exploring content by tags or authors, and engaging in discussions through threaded comments. It uses Firebase for authentication and Firestore for data storage, ensuring real-time updates and secure access control.

2. Features
🔐 User Authentication
Email/Password & Google Sign-in via Firebase.

Role-based access (admin, author, user) enforced with AuthGuard and RoleGuard.

📝 Article Management
Rich-text editor (Quill) for formatting content.

Image upload using Cloudinary integration.

Authors can create, edit, and delete articles.

Tags and thumbnails supported.

📚 Article Listing
Home dashboard with:

Search by title, author, tags.

Filter by tags.

Sort by latest, most popular, or title.

Pagination (client-side).

Featured articles carousel.

👨‍💼 Author Directory
Browse all authors with avatars and bios.

View individual author profiles and their published articles.

💬 Comment System
Real-time commenting via Firestore listeners.

Threaded replies with like counts.

Sort comments by newest, oldest, most liked.

Delete/edit support for own comments.

🖼️ Image Upload
UploadImageComponent with previews and file size limits.

CloudinaryService manages upload and returns secure URL.

🔄 Routing & Layout
Lazy loaded routes using provideRouter.

Layout includes responsive navbar with route-based visibility.

Guarded routes for protected actions.

3. Deliverables
GitHub: https://github.com/dhairya151383/penpals

Deployed App: https://penpals-a583f.firebaseapp.com

4. Setup and Installation
bash
Copy
Edit
git clone https://github.com/dhairya151383/penpals.git
cd penpals
npm install
Ensure Angular CLI is up to date:

bash
Copy
Edit
npm install -g @angular/cli@latest
Update Firebase configuration in:
src/environments/environment.ts and environment.production.ts

ts
Copy
Edit
export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "...",
    authDomain: "...",
    ...
  },
  cloudName: '...',
  uploadPreset: '...'
};
5. Running the Application
bash
Copy
Edit
ng serve
Visit: http://localhost:4200

6. Deployed Application
👉 https://penpals-a583f.firebaseapp.com

7. User Credentials
Admin:
Email: admin@nagarro.com

Password: nagarro@@1234

Author:
Email: author@nagarro.com

Password: Password: nagarro@@1234

Regular User:
Email: user@nagarro.com

Password: Password: nagarro@@1234

8. Unit Tests
Jest setup in setup-jest.ts

Sample tests implemented for:

ArticleUpsertComponent

CommentService

AuthGuard

To run tests:

bash
Copy
Edit
npm run test
9. Bonus Features
✅ Tags system:

Add up to 5 tags per article.

Tag suggestions.

Filter/search by tags.

✅ Web Worker (example setup available but can be extended).
✅ CSS modular structure (can integrate SCSS easily).

10. UI/UX Enhancements
Responsive layout with dynamic navbar visibility.

Image carousels (featured & favorites).

Animated interactions with feedback on actions.

Theming consistency (button styles, modals, tooltips).
