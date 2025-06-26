# Business Card Manager (Backend)

This is a Node.js + Express backend server for managing digital business cards. It supports user authentication, card creation, editing, and administration with MongoDB.

## 🌐 Live Demo

This project is not deployed online. To test locally:

1. Clone and run the project on your machine.
2. Copy .env.example to .env, then provide your own local MongoDB URI or Atlas connection string

---

## 📖 About the Project

This server supports:

- Secure user authentication (JWT)
- Role-based access (Regular, Business, Admin)
- Card management (CRUD)
- Admin-only user and card control

---

## 🎯 Features

- 🔐 **User Authentication** (register/login)
- 🧾 **CRUD for Cards** (business users)
- 🗃️ **Admin Panel** (view/edit/delete users and cards)
- 📤 **Seed Initial Users & Cards** for testing

---

## 🛠️ Admin Features

- View and edit all users and cards
- Delete any user or card
- Toggle user business status
- Change user roles

---

## 🧪 Seeding Info

The server seeds 3 users on first run **if the DB is empty**:

| Role     | Email                                               | Password   |
| -------- | --------------------------------------------------- | ---------- |
| Regular  | [regular@example.com](mailto:regular@example.com)   | Abc!123Abc |
| Business | [business@example.com](mailto:business@example.com) | Abc!123Abc |
| Admin    | [admin@example.com](mailto:admin@example.com)       | Abc!123Abc |

Admin is seeded with full privileges.

To seed:

- Users: `Initial_data/fn_seedInitialUsers.js`
- Cards (for business): `Initial_data/fn_seedInitialCards.js`

---

## 🧑‍💻 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)

### Installation

```bash
gh repo clone nir-chen-3/A02_server_side
cd A02_server_side
npm install
npm run start
```

Create `.env` file:

```env
PORT=3000
JWT_KEY=your_jwt_secret_here
MONGO_URI=mongodb://localhost:27017/your-db-name
```

For Atlas:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<db-name>?retryWrites=true&w=majority
```

---

## 📠 API Endpoints

### 🔑 User Endpoints

| Method | Endpoint                     | Description             |
| ------ | ---------------------------- | ----------------------- |
| POST   | `/users`                     | Register a new user     |
| POST   | `/users/login`               | Authenticate a user     |
| GET    | `/users`                     | Get all users (admin)   |
| GET    | `/users/:id`                 | Get single user (admin) |
| PUT    | `/users/:id`                 | Update user info        |
| DELETE | `/users/:id`                 | Delete a user           |
| PATCH  | `/users/:id/toggle-business` | Toggle business status  |

### 🗂️ Card Endpoints

| Method | Endpoint            | Description                          |
| ------ | ------------------- | ------------------------------------ |
| GET    | `/cards`            | Get all cards                        |
| GET    | `/cards/:id`        | Get card by ID                       |
| GET    | `/cards/my-cards`   | Get cards of logged-in business user |
| POST   | `/cards`            | Create card (business only)          |
| PUT    | `/cards/:id`        | Update a card                        |
| DELETE | `/cards/:id`        | Delete a card                        |
| PATCH  | `/cards/:id/like`   | Like/unlike a card                   |
| PATCH  | `/cards/:id/biznum` | Regenerate business number (admin)   |

---

## 📁 Project Structure

```
.
├── Initial_data
│   ├── cardData.js
│   ├── createCard.js
│   ├── fn_registerUser.js
│   ├── fn_seedInitialCards.js
│   ├── fn_seedInitialUsers.js
│   ├── loginUser.js
│   └── usersData.js
├── middleware
│   └── auth.js
├── models
│   ├── cardModel.js
│   ├── generateBizNumber.js
│   └── userModel.js
├── routes
│   ├── cards
│   │   ├── cards__routes.js
│   │   └── route
│   │       ├── delete_card.js
│   │       ├── get_all_cards.js
│   │       ├── get_card_by_id.js
│   │       ├── get_my_cards.js
│   │       ├── patch_like_toggle.js
│   │       ├── patch_update_biz_number.js
│   │       ├── post_card.js
│   │       └── put_card.js
│   └── user
│       ├── user__routes.js
│       └── route
│           ├── delete_user.js
│           ├── get_all_users.js
│           ├── get_user_by_id.js
│           ├── patch_toggle_business.js
│           ├── post_login.js
│           ├── post_register.js
│           └── put_update.js
├── validations
│   ├── regexPatterns.js
│   ├── card_validation
│   │   ├── cardJoiSchema.js
│   │   └── cardValidation.js
│   └── user_validation
│       ├── userJoiSchema.js
│       ├── userUpdateValidation.js
│       └── userValidation.js
├── .env
├── .env.example
├── .gitignore
├── app.js
├── example_cards.http
├── example_users.http
├── package.json
└── README.md
```

---

## 📄 Examples (REST Client)

Sample test requests in:

- `example_users.http`
- `example_cards.http`

Use [REST Client extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) in VSCode.

---

## 📬 Contact

Built by Nir Chen. For questions or suggestions, feel free to reach out.
