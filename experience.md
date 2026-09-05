# Experience Module-এর কাজ এবং Postman টেস্টিং গাইড

## Experience Module-এর কাজ কী?

আপনার পোর্টফোলিও ব্যাকএন্ডে **Experience Module**-এর মূল কাজ হলো আপনার পূর্ববর্তী বা বর্তমান কাজের অভিজ্ঞতা (Work Experience) গুলো সংরক্ষণ এবং পরিচালনা করা। এর মাধ্যমে আপনি কোন কোম্পানিতে কোন রোলে কাজ করেছেন, কতদিন কাজ করেছেন এবং কী কী দায়িত্ব পালন করেছেন, সেই তথ্যগুলো ডাটাবেজে রাখতে পারবেন।

এই মডিউলে মূলত চারটি API রুট রয়েছে:

1. **নতুন অভিজ্ঞতা যোগ করা (POST `/`)**: এটি একটি অ্যাডমিন রুট। আপনি লগ-ইন করে এই রুটে রিকোয়েস্ট পাঠিয়ে আপনার নতুন কোনো কাজের অভিজ্ঞতা যুক্ত করতে পারবেন।
2. **সব অভিজ্ঞতা দেখা (GET `/`)**: এটি একটি পাবলিক রুট। পোর্টফোলিওর ভিজিটররা এই রুটে রিকোয়েস্টের মাধ্যমে আপনার সকল কাজের অভিজ্ঞতা দেখতে পারবেন। এর জন্য কোনো লগ-ইন বা অথেন্টিকেশনের প্রয়োজন নেই।
3. **অভিজ্ঞতা আপডেট করা (PATCH `/:id`)**: এটি একটি অ্যাডমিন রুট। পূর্বের কোনো কাজের তথ্যে পরিবর্তন আনতে চাইলে নির্দিষ্ট ID দিয়ে এই রুটে রিকোয়েস্ট পাঠাতে হবে।
4. **অভিজ্ঞতা মুছে ফেলা (DELETE `/:id`)**: এটিও একটি অ্যাডমিন রুট। কোনো অভিজ্ঞতা অপ্রয়োজনীয় মনে হলে নির্দিষ্ট ID দিয়ে সেটি ডিলিট করতে পারবেন।

---

## Postman-এ টেস্ট করার জন্য ডেমো ডেটা

Experience Module-এর API-গুলো Postman-এ টেস্ট করার জন্য নিচের গাইডলাইন ব্যবহার করতে পারেন:

### ১. নতুন অভিজ্ঞতা যোগ করা (Create Experience)
এই রিকোয়েস্টের মাধ্যমে একটি নতুন অভিজ্ঞতা ডাটাবেজে সেভ হবে। এটি একটি অ্যাডমিন রুট।

- **Method:** `POST`
- **URL:** `http://localhost:5000/api/v1/experiences`
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization`: `Bearer <আপনার_অ্যাডমিন_jwt_টোকেন>`
- **Body Type:** `raw` -> `JSON`
- **Demo Data (Body):**
```json
{
  "position": "Frontend Developer",
  "company": "Tech Solutions Ltd.",
  "startDate": "2023-01-01",
  "endDate": "2024-01-01",
  "isCurrent": false,
  "description": "Developed dynamic and responsive web applications using React and Next.js. Improved website performance by 20%."
}
```
*(নোট: আপনি যদি বর্তমান কোনো কোম্পানিতে কাজ করে থাকেন, তবে `isCurrent: true` দিতে পারেন এবং `endDate` বাদ দিতে পারেন।)*

### ২. সব অভিজ্ঞতা দেখা (Get All Experiences)
এই রিকোয়েস্টের মাধ্যমে ডাটাবেজে থাকা আপনার সব কাজের অভিজ্ঞতা দেখা যাবে। এটি একটি পাবলিক রুট।

- **Method:** `GET`
- **URL:** `http://localhost:5000/api/v1/experiences`
- **Headers:** `none`
- **Body:** `none`

### ৩. অভিজ্ঞতা আপডেট করা (Update Experience)
এই রিকোয়েস্টের মাধ্যমে একটি নির্দিষ্ট অভিজ্ঞতার তথ্য আংশিক পরিবর্তন করা যাবে। এটি একটি অ্যাডমিন রুট।

- **Method:** `PATCH`
- **URL:** `http://localhost:5000/api/v1/experiences/<experience_id_here>` (যেমন: `http://localhost:5000/api/v1/experiences/65a3c...`)
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization`: `Bearer <আপনার_অ্যাডমিন_jwt_টোকেন>`
- **Body Type:** `raw` -> `JSON`
- **Demo Data (Body):**
```json
{
  "position": "Senior Frontend Developer",
  "isCurrent": true,
  "endDate": "" 
}
```

### ৪. নির্দিষ্ট অভিজ্ঞতা মুছে ফেলা (Delete Experience)
এই রিকোয়েস্টের মাধ্যমে একটি নির্দিষ্ট অভিজ্ঞতা মুছে ফেলা যাবে। এটি একটি অ্যাডমিন রুট।

- **Method:** `DELETE`
- **URL:** `http://localhost:5000/api/v1/experiences/<experience_id_here>`
- **Headers:** 
  - `Authorization`: `Bearer <আপনার_অ্যাডমিন_jwt_টোকেন>`
- **Body:** `none`
