# Admin API Documentation

## Overview
These APIs are **admin-only** endpoints that provide user management and statistics functionality.

---

## 🔐 Authentication
All endpoints require:
- Valid NextAuth session
- User role must be `"admin"`

### Error Responses:
- `401 Unauthorized` - Not logged in
- `403 Forbidden` - Not an admin user

---

## 📊 GET /api/admin/stats

Get comprehensive user statistics for the admin dashboard.

### Request
```http
GET /api/admin/stats
```

### Response (200 OK)
```json
{
  "message": "Statistics fetched successfully",
  "stats": {
    "totalUsers": 50,
    "verifiedUsers": 45,
    "unverifiedUsers": 5,
    "adminUsers": 2,
    "regularUsers": 48,
    "recentUsers": 10,
    "usersToday": 3,
    "verificationRate": "90.0"
  },
  "latestUsers": [
    {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "file": "https://...",
      "isVerified": true,
      "role": "user",
      "createdAt": "2026-05-06T10:30:00.000Z"
    }
  ]
}
```

### Fields Explained:
- `totalUsers` - Total registered users
- `verifiedUsers` - Users who verified their email
- `unverifiedUsers` - Users pending email verification
- `adminUsers` - Users with admin role
- `regularUsers` - Users with user role
- `recentUsers` - Users registered in last 7 days
- `usersToday` - Users registered today
- `verificationRate` - Percentage of verified users
- `latestUsers` - Last 5 registered users

---

## 👥 GET /api/getUsers

Get paginated list of users with filtering and search.

### Request
```http
GET /api/getUsers?page=1&limit=10&search=john&role=user&verified=true
```

### Query Parameters:
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 10 | Users per page (10, 20, or 50) |
| `search` | string | "" | Search by name or email |
| `role` | string | "" | Filter by role (admin/user) |
| `verified` | boolean | "" | Filter by verification status |

### Response (200 OK)
```json
{
  "message": "Users fetched successfully",
  "users": [
    {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "contact": "1234567890",
      "file": "https://...",
      "isVerified": true,
      "role": "user",
      "createdAt": "2026-05-06T10:30:00.000Z",
      "updatedAt": "2026-05-06T10:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalUsers": 50,
    "limit": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "stats": {
    "totalUsers": 50,
    "verifiedUsers": 45,
    "unverifiedUsers": 5,
    "adminUsers": 2,
    "regularUsers": 48
  }
}
```

### Security Notes:
- Password fields are excluded from response
- Verification tokens are excluded
- Only admins can access this endpoint

---

## 🎨 Frontend Usage Examples

### Fetch Statistics
```javascript
const fetchStats = async () => {
  try {
    const response = await axios.get('/api/admin/stats');
    console.log(response.data.stats);
  } catch (error) {
    console.error(error.response?.data?.message);
  }
};
```

### Fetch Users with Pagination
```javascript
const fetchUsers = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `/api/getUsers?page=${page}&limit=${limit}`
    );
    console.log(response.data.users);
    console.log(response.data.pagination);
  } catch (error) {
    console.error(error.response?.data?.message);
  }
};
```

### Search Users
```javascript
const searchUsers = async (searchTerm) => {
  try {
    const response = await axios.get(
      `/api/getUsers?search=${searchTerm}&page=1&limit=10`
    );
    console.log(response.data.users);
  } catch (error) {
    console.error(error.response?.data?.message);
  }
};
```

### Filter Verified Users
```javascript
const getVerifiedUsers = async () => {
  try {
    const response = await axios.get(
      '/api/getUsers?verified=true&page=1&limit=20'
    );
    console.log(response.data.users);
  } catch (error) {
    console.error(error.response?.data?.message);
  }
};
```

---

## 🚀 Testing the APIs

### Using cURL:

**Get Statistics:**
```bash
curl -X GET http://localhost:3000/api/admin/stats \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"
```

**Get Users (Page 1, 10 per page):**
```bash
curl -X GET "http://localhost:3000/api/getUsers?page=1&limit=10" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"
```

**Search Users:**
```bash
curl -X GET "http://localhost:3000/api/getUsers?search=john&page=1&limit=10" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"
```

---

## 📝 Notes

1. **Admin Access Only**: Both endpoints require admin role
2. **Pagination**: Default is 10 users per page
3. **Search**: Case-insensitive search on name and email
4. **Security**: Sensitive fields (password, tokens) are excluded
5. **Performance**: Uses MongoDB indexing for fast queries

---

## 🔧 Environment Variables Required

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=your_app_url
```
