# 🚀 API Quick Reference Guide

## Favorites APIs

### Get User's Favorites
```javascript
GET /api/favorites

// Response:
{
  "message": "Favorites fetched successfully",
  "favorites": [
    {
      "_id": "course_id",
      "title": "Course Title",
      "shortDes": "Description",
      "file": "image_url",
      "price": "4999"
    }
  ]
}
```

### Add to Favorites
```javascript
POST /api/favorites
Content-Type: application/json

{
  "courseId": "course_id_here"
}

// Response:
{
  "message": "Added to favorites",
  "favorites": ["course_id_1", "course_id_2"]
}
```

### Remove from Favorites
```javascript
DELETE /api/favorites?courseId=course_id_here

// Response:
{
  "message": "Removed from favorites",
  "favorites": ["course_id_1"]
}
```

---

## Course Search API

### Search Courses
```javascript
GET /api/courses/search?q=javascript&limit=10

// Response:
{
  "message": "Search results",
  "courses": [
    {
      "_id": "course_id",
      "title": "JavaScript Basics",
      "shortDes": "Learn JavaScript",
      "file": "image_url",
      "price": "4999"
    }
  ],
  "count": 5
}
```

---

## Admin Delete User API

### Delete User (Admin Only)
```javascript
DELETE /api/admin/deleteUser?userId=user_id_here

// Response:
{
  "message": "User John Doe deleted successfully"
}

// Error if trying to delete self:
{
  "message": "You cannot delete your own account"
}
```

---

## Profile Update API

### Update Profile
```javascript
PUT /api/profile/update
Content-Type: multipart/form-data

FormData:
- name: "New Name" (optional)
- contact: "1234567890" (optional)
- file: File (optional)
- currentPassword: "oldpass" (required for password change)
- newPassword: "newpass" (optional)

// Response:
{
  "message": "Profile updated successfully",
  "user": {
    "id": "user_id",
    "name": "New Name",
    "email": "user@example.com",
    "contact": "1234567890",
    "file": "cloudinary_url",
    "role": "user"
  }
}
```

---

## Frontend Usage Examples

### React/Next.js with Axios

#### Add to Favorites
```javascript
const addToFavorites = async (courseId) => {
  try {
    const response = await axios.post('/api/favorites', { courseId });
    toast.success(response.data.message);
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
};
```

#### Remove from Favorites
```javascript
const removeFromFavorites = async (courseId) => {
  try {
    const response = await axios.delete(`/api/favorites?courseId=${courseId}`);
    toast.success(response.data.message);
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
};
```

#### Search Courses
```javascript
const searchCourses = async (query) => {
  try {
    const response = await axios.get(`/api/courses/search?q=${query}&limit=10`);
    setCourses(response.data.courses);
  } catch (error) {
    console.error(error);
  }
};
```

#### Delete User (Admin)
```javascript
const deleteUser = async (userId) => {
  if (!confirm('Are you sure?')) return;
  
  try {
    const response = await axios.delete(`/api/admin/deleteUser?userId=${userId}`);
    toast.success(response.data.message);
    refreshUserList();
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
};
```

#### Update Profile
```javascript
const updateProfile = async (formData) => {
  try {
    const response = await axios.put('/api/profile/update', formData);
    toast.success(response.data.message);
    // Update session or local state
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
};

// Usage:
const formData = new FormData();
formData.append('name', 'John Doe');
formData.append('contact', '1234567890');
if (imageFile) formData.append('file', imageFile);
updateProfile(formData);
```

---

## Error Responses

### 401 Unauthorized
```json
{
  "message": "Unauthorized. Please login."
}
```

### 403 Forbidden
```json
{
  "message": "Access denied. Admin only."
}
```

### 400 Bad Request
```json
{
  "message": "Course ID is required"
}
```

### 404 Not Found
```json
{
  "message": "User not found"
}
```

### 500 Server Error
```json
{
  "message": "Something went wrong: error details"
}
```

---

## Authentication

All APIs (except search) require NextAuth session:

```javascript
// Automatic with NextAuth
// Session is checked server-side using:
const session = await getServerSession(authOptions);

if (!session) {
  return NextResponse.json(
    { message: "Unauthorized. Please login." },
    { status: 401 }
  );
}
```

---

## Rate Limiting Recommendations

For production, consider adding rate limiting:

```javascript
// Favorites: 100 requests/minute per user
// Search: 60 requests/minute per IP
// Delete User: 10 requests/minute per admin
// Profile Update: 10 requests/minute per user
```

---

## Testing with cURL

### Add to Favorites
```bash
curl -X POST http://localhost:3000/api/favorites \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_TOKEN" \
  -d '{"courseId":"course_id_here"}'
```

### Search Courses
```bash
curl -X GET "http://localhost:3000/api/courses/search?q=javascript&limit=5"
```

### Delete User
```bash
curl -X DELETE "http://localhost:3000/api/admin/deleteUser?userId=user_id" \
  -H "Cookie: next-auth.session-token=ADMIN_TOKEN"
```

### Update Profile
```bash
curl -X PUT http://localhost:3000/api/profile/update \
  -H "Cookie: next-auth.session-token=YOUR_TOKEN" \
  -F "name=John Doe" \
  -F "contact=1234567890" \
  -F "file=@/path/to/image.jpg"
```

---

## Database Queries

### Get User with Favorites
```javascript
const user = await User.findById(userId).populate('favorites');
```

### Search Courses
```javascript
const courses = await Course.find({
  $or: [
    { title: { $regex: query, $options: 'i' } },
    { shortDes: { $regex: query, $options: 'i' } }
  ]
}).limit(10);
```

### Add to Favorites
```javascript
user.favorites.push(courseId);
await user.save();
```

### Remove from Favorites
```javascript
user.favorites = user.favorites.filter(id => id.toString() !== courseId);
await user.save();
```

---

## Performance Tips

1. **Use indexes** on frequently searched fields:
```javascript
// In Course model:
courseSchema.index({ title: 'text', shortDes: 'text' });
```

2. **Limit populate** to needed fields:
```javascript
.populate('favorites', 'title shortDes file price')
```

3. **Cache search results** for common queries

4. **Debounce search** on frontend (300ms recommended)

---

## Security Checklist

- ✅ All APIs check authentication
- ✅ Admin APIs check role
- ✅ Password change requires current password
- ✅ Cannot delete own admin account
- ✅ Input validation on all endpoints
- ✅ Sensitive data excluded from responses
- ✅ File uploads validated and sanitized

---

## Common Issues & Solutions

### Issue: "Unauthorized" error
**Solution**: Ensure user is logged in and session is valid

### Issue: Favorites not showing
**Solution**: Check if favorites array is populated in query

### Issue: Search returns no results
**Solution**: Verify search query is not empty and courses exist

### Issue: Cannot delete user
**Solution**: Verify admin role and user exists

### Issue: Profile update fails
**Solution**: Check file size limits and required fields

---

## Status Codes

| Code | Meaning | When Used |
|------|---------|-----------|
| 200 | Success | Request completed successfully |
| 400 | Bad Request | Missing or invalid parameters |
| 401 | Unauthorized | Not logged in |
| 403 | Forbidden | Not authorized (not admin) |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Internal server error |

---

**Quick Tip**: Use browser DevTools Network tab to inspect API requests and responses during development!
