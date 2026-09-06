# Project Category API - Postman Testing Guide

Project Category API-এর মাধ্যমে আপনি আপনার প্রজেক্টগুলোর জন্য বিভিন্ন ক্যাটাগরি (যেমন: Frontend, Backend, Full-Stack) তৈরি করতে পারবেন।

## ১. নতুন ক্যাটাগরি তৈরি করা (Create Category)
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/v1/project-categories`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer <আপনার_অ্যাডমিন_টোকেন>`
- **Body (raw JSON):**
```json
{
  "name": "Full-Stack Web App"
}
```

## ২. সব ক্যাটাগরি দেখা (Get All Categories)
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/v1/project-categories`
- **Headers:** `none`
- **Body:** `none`

## ৩. ক্যাটাগরি আপডেট করা (Update Category)
- **Method:** `PATCH`
- **URL:** `http://localhost:5000/api/v1/project-categories/<category_id>`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer <আপনার_অ্যাডমিন_টোকেন>`
- **Body (raw JSON):**
```json
{
  "name": "Advanced Full-Stack"
}
```

## ৪. ক্যাটাগরি ডিলিট করা (Delete Category)
- **Method:** `DELETE`
- **URL:** `http://localhost:5000/api/v1/project-categories/<category_id>`
- **Headers:** 
  - `Authorization: Bearer <আপনার_অ্যাডমিন_টোকেন>`
- **Body:** `none`
