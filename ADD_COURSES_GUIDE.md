# 📚 Add Courses Guide

## Courses to be Added

### 1. HTML, CSS, JavaScript & Tailwind CSS - Rs.6,999
Complete frontend bundle covering:
- HTML5 fundamentals
- CSS3 with Flexbox and Grid
- JavaScript ES6+
- Tailwind CSS framework
- 5+ real-world projects

### 2. MongoDB - Rs.3,999
Database mastery course:
- MongoDB fundamentals
- CRUD operations
- Aggregation pipelines
- MongoDB Atlas
- Integration with Node.js

### 3. Next.js - Rs.7,999
Modern React framework:
- Server-side rendering (SSR)
- Static site generation (SSG)
- API routes
- App Router and Server Components
- Deployment to Vercel

### 4. Node.js & Express.js - Rs.8,999
Backend development:
- Node.js fundamentals
- Express.js framework
- RESTful APIs
- Authentication & authorization
- File uploads with Cloudinary
- Email with Nodemailer
- Payment integration

### 5. Full Stack Web Development - Rs.14,999
Complete MERN stack:
- Frontend: React.js, Next.js, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT, NextAuth
- File uploads: Cloudinary
- Email: Nodemailer
- Payments: Stripe
- 5+ full stack projects

---

## 🚀 How to Add Courses

### Method 1: Using Admin Page (Easiest!)

1. **Login as admin**
2. **Go to**: `http://localhost:3000/admin/seed-courses`
3. **Click "Add Courses to Database"**
4. **Done!** All courses will be added

### Method 2: Using API Directly

```bash
curl -X POST http://localhost:3000/api/admin/seed-courses
```

(Make sure you're logged in as admin in your browser first)

### Method 3: Using Node Script

```bash
# Make sure package.json has "type": "module"
node scripts/seed-courses.js
```

---

## ✅ What Happens

- ✅ Checks if course already exists (by title)
- ✅ Skips existing courses (no duplicates)
- ✅ Adds new courses with all details
- ✅ Shows summary of added/skipped courses
- ✅ Safe to run multiple times

---

## 📊 Course Pricing Summary

| Course | Price |
|--------|-------|
| HTML, CSS, JS, Tailwind | Rs.6,999 |
| MongoDB | Rs.3,999 |
| Next.js | Rs.7,999 |
| Node.js & Express.js | Rs.8,999 |
| Full Stack MERN | Rs.14,999 |

**Total Value**: Rs.41,995

---

## 🎨 Course Images

All courses use placeholder images from Unsplash. You can replace them later with your own images by:

1. Uploading to Cloudinary
2. Updating the course in the database
3. Or using the "Edit Course" feature

---

## 🔍 Verify Courses Added

After adding courses:

1. **Go to home page**: `http://localhost:3000/home`
2. **Check courses page**: `http://localhost:3000/courses`
3. **Verify all 5 courses** appear
4. **Click on each** to see details

---

## 📝 Course Details Included

Each course has:
- ✅ Title
- ✅ Short description
- ✅ Full description
- ✅ Requirements (array)
- ✅ Course content (array)
- ✅ Price
- ✅ Bullet points (array)
- ✅ Image URL
- ✅ Timestamps (createdAt, updatedAt)

---

## 🛠️ Customize Courses

To customize courses before adding:

1. **Edit**: `src/app/api/admin/seed-courses/route.js`
2. **Modify** the `courses` array
3. **Change**: titles, descriptions, prices, images
4. **Save** and run the seeding again

---

## 🎯 Next Steps

After adding courses:

1. ✅ Test favorites feature on each course
2. ✅ Test search functionality
3. ✅ Verify course details pages
4. ✅ Check responsive design
5. ✅ Test "Reserve" button functionality

---

## 🐛 Troubleshooting

### Courses not showing?
- Restart dev server
- Check MongoDB connection
- Verify you're logged in
- Check browser console for errors

### Duplicate courses?
- The script automatically skips duplicates
- Check course titles match exactly

### Images not loading?
- Unsplash images should work automatically
- If not, replace with your own Cloudinary URLs

---

## 📸 Replace Course Images

To use your own images:

1. **Upload to Cloudinary** (or use existing)
2. **Get the URL**
3. **Update course**:
   - Go to "Edit Course" page
   - Or update directly in database
   - Or modify the seed script

---

## 🎉 Success!

Once courses are added:
- ✅ Users can browse all courses
- ✅ Users can search courses
- ✅ Users can add to favorites
- ✅ Users can view course details
- ✅ Users can reserve seats

---

**Quick Start**: Just go to `/admin/seed-courses` and click the button! 🚀
