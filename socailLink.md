# Social Links API Demo Data

### 1. Create a Social Link

**Endpoint:** `POST /api/v1/social-links`  
**Headers:** `Authorization: Bearer <token>`

**JSON Payload:**
```json
{
  "platform": "GitHub",
  "url": "https://github.com/salmanhossain",
  "iconUrl": "https://example.com/github-icon.png",
  "isActive": true,
  "heroSectionId": "cm11qabc10001xyz123abc456" 
}
```
*(Replace `heroSectionId` with a valid ID from your database)*

### 2. Create another Social Link

**Endpoint:** `POST /api/v1/social-links`  
**Headers:** `Authorization: Bearer <token>`

**JSON Payload:**
```json
{
  "platform": "LinkedIn",
  "url": "https://linkedin.com/in/salmanhossain",
  "heroSectionId": "cm11qabc10001xyz123abc456" 
}
```

### 3. Update a Social Link

**Endpoint:** `PATCH /api/v1/social-links/<social_link_id>`  
**Headers:** `Authorization: Bearer <token>`

**JSON Payload:**
```json
{
  "platform": "Twitter (X)",
  "url": "https://twitter.com/salmanhossain_new"
}
```
