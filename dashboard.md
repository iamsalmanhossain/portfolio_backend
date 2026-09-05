# Dashboard Module-এর কাজ এবং Postman টেস্টিং গাইড

## Dashboard Module-এর কাজ কী?

আপনার পোর্টফোলিও ব্যাকএন্ডে **Dashboard Module**-এর মূল কাজ হলো অ্যাডমিন প্যানেলের জন্য বিভিন্ন পরিসংখ্যান, অ্যাক্টিভিটি এবং চার্টের ডেটা সরবরাহ করা। এর মাধ্যমে আপনি এক নজরে আপনার পোর্টফোলিওর বর্তমান অবস্থা, প্রজেক্ট সংখ্যা, মেসেজ এবং অন্যান্য গুরুত্বপূর্ণ তথ্য দেখতে পারবেন।

এই মডিউলে মূলত তিনটি API রুট রয়েছে এবং এগুলো সবই সম্ভবত অ্যাডমিন-অনলি (অথবা প্রটেক্টেড) রুট হিসেবে কাজ করবে:

1. **Stats দেখা (GET `/stats`)**: এর মাধ্যমে ড্যাশবোর্ডের মূল পরিসংখ্যানগুলো (যেমন- মোট প্রজেক্ট, মোট স্কিল, অপঠিত মেসেজ ইত্যাদি) দেখা যাবে।
2. **Activities দেখা (GET `/activities`)**: এর মাধ্যমে সম্প্রতি ঘটে যাওয়া কাজগুলো (যেমন- নতুন মেসেজ আসা, নতুন প্রজেক্ট অ্যাড হওয়া ইত্যাদি) দেখা যাবে।
3. **Chart Data দেখা (GET `/chart`)**: এর মাধ্যমে গ্রাফ বা চার্ট দেখানোর জন্য প্রয়োজনীয় ডেটা পাওয়া যাবে।

---

## Postman-এ টেস্ট করার জন্য ডেমো ডেটা

Dashboard Module-এর API-গুলো Postman-এ টেস্ট করার জন্য নিচের গাইডলাইন ব্যবহার করতে পারেন:

### ১. Dashboard Stats দেখা
এই রিকোয়েস্টের মাধ্যমে ড্যাশবোর্ডের ওভারল পরিসংখ্যান দেখা যাবে।

- **Method:** `GET`
- **URL:** `http://localhost:5000/api/v1/dashboard/stats` (আপনার রাউটার সেটআপ অনুযায়ী URL টি এমন হবে)
- **Headers:** 
  - `Authorization`: `Bearer <আপনার_অ্যাডমিন_jwt_টোকেন>` (যদি রুটটি প্রটেক্টেড হয়ে থাকে)
- **Body:** `none`

**সম্ভাব্য রেসপন্স (Demo):**
```json
{
  "success": true,
  "message": "Dashboard stats fetched successfully",
  "data": {
    "totalProjects": 15,
    "totalSkills": 20,
    "totalMessages": 45,
    "unreadMessages": 3
  }
}
```

### ২. Recent Activities দেখা
এই রিকোয়েস্টের মাধ্যমে সাম্প্রতিক কাজ বা নোটিফিকেশনগুলো দেখা যাবে।

- **Method:** `GET`
- **URL:** `http://localhost:5000/api/v1/dashboard/activities`
- **Headers:** 
  - `Authorization`: `Bearer <আপনার_অ্যাডমিন_jwt_টোকেন>`
- **Body:** `none`

**সম্ভাব্য রেসপন্স (Demo):**
```json
{
  "success": true,
  "message": "Recent activities fetched successfully",
  "data": [
    {
      "id": "1",
      "action": "New message received",
      "time": "2 mins ago"
    },
    {
      "id": "2",
      "action": "Added new project",
      "time": "1 hour ago"
    }
  ]
}
```

### ৩. Chart Data দেখা
এই রিকোয়েস্টের মাধ্যমে চার্টে দেখানোর জন্য ডেটা পাওয়া যাবে (যেমন- গত ৬ মাসের ভিজিটর বা মেসেজ সংখ্যা)।

- **Method:** `GET`
- **URL:** `http://localhost:5000/api/v1/dashboard/chart`
- **Headers:** 
  - `Authorization`: `Bearer <আপনার_অ্যাডমিন_jwt_টোকেন>`
- **Body:** `none`

**সম্ভাব্য রেসপন্স (Demo):**
```json
{
  "success": true,
  "message": "Chart data fetched successfully",
  "data": {
    "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    "datasets": [
      {
        "label": "Messages",
        "data": [10, 20, 15, 30, 25, 40]
      }
    ]
  }
}
```
