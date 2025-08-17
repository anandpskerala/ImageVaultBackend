ImageVaultBackend
=================

![Node.js](https://img.shields.io/badge/node.js-000000?style=for-the-badge&logo=Node.js) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose) ![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white) ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary) ![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge) ![Version 1.0.0](https://img.shields.io/badge/Version-1.0.0-blue.svg?style=for-the-badge)

A robust backend API for the ImageVault application, designed to manage image uploads, retrieval, updates, deletions, and ordering, integrated with Cloudinary for image storage and MongoDB for data persistence. Built with Node.js, Express, TypeScript, and Mongoose, this backend provides secure and efficient endpoints for the [ImageVaultFrontend](https://github.com/anandpskerala/ImageVaultFrontend) application.

Features
--------

*   **Image Management**: Handles image uploads, deletions, and updates via Cloudinary.
*   **Database Operations**: Stores image metadata (e.g., title, URL, position) in MongoDB using Mongoose.
*   **Order Management**: Supports reordering images by updating their position in the database.
*   **Authentication**: Integrates with user authentication to secure API endpoints.
*   **RESTful API**: Provides endpoints for CRUD operations and image order management.
*   **Cloudinary Integration**: Manages image storage and delivery through Cloudinary.
*   **Error Handling**: Robust error handling for reliable API responses.

Tech Stack
----------

*   **Runtime**: Node.js
*   **Framework**: Express
*   **Language**: TypeScript
*   **Database**: MongoDB with Mongoose
*   **Cloud Storage**: Cloudinary
*   **Environment Management**: dotenv
*   **API Testing**: Postman (recommended for development)

Prerequisites
-------------

*   Node.js (v16 or higher)
*   Pnpm
*   A MongoDB instance (local or cloud-based, e.g., MongoDB Atlas)
*   A Cloudinary account with API credentials
*   The [ImageVaultFrontend](https://github.com/anandpskerala/ImageVaultFrontend) repository for the complete application

Installation
------------

1.  **Clone the Repository**:
    
        git clone https://github.com/anandpskerala/ImageVaultBackend.git
        cd ImageVaultBackend
    
2.  **Install Dependencies**:
    
        pnpm install
    

    
3.  **Set Up Environment Variables**:
    
    Create a `.env` file in the root directory and add the following:
    
        PORT=5000
        NODE_ENV=development
        MONGO_URI=<your-mongodb-connection-string>
        CLOUD_NAME=<your-cloudinary-cloud-name>
        CLOUD_API_KEY=<your-cloudinary-api-key>
        CLOUD_SECRET=<your-cloudinary-api-secret>
        JWT_TOKEN=<your-jwt-secret>
        FRONTEND_URL=<frontend_url>
        EMAIL_HOST=<smtp.gmail.com>
        EMAIL_USER=<user_mail>
        EMAIL_PASS=<email_pass>

    
    Replace the placeholders with your actual MongoDB connection string, Cloudinary credentials, and JWT secret for authentication.
    
4.  **Run the Development Server**:
    
        pnpm run dev
    
    
    The API will be available at `http://localhost:5000/api` (or the port specified in `.env`).
    

API Endpoints
-------------

Below are the primary endpoints for the ImageVaultBackend API. Ensure authentication tokens are included where required.

*   **GET /api/images**: Retrieve all images for the authenticated user.
*   **POST /api/images**: Upload a new image to Cloudinary and save metadata to MongoDB.
    *   Body: `FormData` with `image` (file) and `title` (string).
*   **PUT /api/images/:id**: Update an image's title or replace the image.
    *   Body: `FormData` with `title` (string) and optional `image` (file).
*   **DELETE /api/images/:id**: Delete an image from Cloudinary and MongoDB.
*   **POST /api/images/order**: Update the order of images.
    *   Body: Array of `{ id: string, position: number }`.
*   **POST /api/auth/login**: Authenticate a user and return a JWT token.
    *   Body: `{ email: string, password: string }`.
*   **POST /api/auth/register**: Register a new user.
    *   Body: `{ firstName: string, email: string, password: string }`.

Project Structure
-----------------

    ImageVaultBackend/
    ├── src/
    │   ├── controllers/
    │   │   ├── imageController.ts
    │   │   ├── authController.ts
    │   ├── models/
    │   │   ├── Image.ts
    │   │   ├── User.ts
    │   ├── routes/
    │   │   ├── imageRoutes.ts
    │   │   ├── authRoutes.ts
    │   ├── middleware/
    │   │   ├── authMiddleware.ts
    │   ├── services/
    │   │   ├── cloudinaryService.ts
    │   ├── config/
    │   │   ├── db.ts
    │   ├── app.ts
    │   ├── server.ts
    ├── .env
    ├── package.json
    ├── tsconfig.json
    ├── README.md
    

Contributing
------------

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature`).
3.  Make your changes and commit (`git commit -m 'Add your feature'`).
4.  Push to the branch (`git push origin feature/your-feature`).
5.  Open a Pull Request.

License
-------

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

Contact
-------

For questions or support, contact [Anand P S](mailto:anandps002@gmail.com) or join the [Telegram Support Chat](https://t.me/Anandpskerala).